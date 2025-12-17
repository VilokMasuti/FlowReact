import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  BackgroundVariant,
  useReactFlow,
  type OnSelectionChangeFunc,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useGraph } from '../../hooks/use-graph';
import { useAppStore } from '../../store/store';
import { ServiceNode } from './ServiceNode';
import { Button } from '../ui/button';
import { Maximize, Plus } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

import type { ServiceNodeData, GraphNode } from '../../types/graph';

const GraphCanvas = () => {
  const {
    selectedAppId,
    setSelectedNodeId,
    localNodes,
    localEdges,
    addLocalNode,
    addLocalEdge,
    removeLocalNode,
    removeLocalEdges,
    nodeDataOverrides,
  } = useAppStore();

  const {
    data: graphData,
    isLoading,
    isError,
    refetch,
  } = useGraph(selectedAppId);

  const { fitView, getNodes } = useReactFlow() as {
    fitView: (opts?: { padding?: number; duration?: number }) => void;
    getNodes: () => Node<ServiceNodeData>[];
  };

  const initialFitDone = useRef(false);

  const nodeTypes = useMemo(
    () => ({
      service: ServiceNode,
      database: ServiceNode,
    }),
    [],
  );

  // Base nodes/edges (no overrides here)
  const combinedNodes: Node<ServiceNodeData>[] = useMemo(() => {
    if (!graphData) return localNodes;

    const apiNodes = graphData.nodes.map((node: GraphNode) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    }));

    return [...apiNodes, ...localNodes];
  }, [graphData, localNodes]);

  const combinedEdges: Edge[] = useMemo(() => {
    if (!graphData) return localEdges;

    const apiEdges = graphData.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      style: { stroke: '#525252', strokeWidth: 2 },
      animated: true,
    }));

    return [
      ...apiEdges,
      ...localEdges.map((e) => ({
        ...e,
        style: { stroke: '#525252', strokeWidth: 2 },
        animated: true,
      })),
    ];
  }, [graphData, localEdges]);

  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<ServiceNodeData>>(combinedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(combinedEdges);

  useEffect(() => {
    setNodes(combinedNodes);
    setEdges(combinedEdges);
    initialFitDone.current = false;
  }, [combinedNodes, combinedEdges, setNodes, setEdges]);

  const viewNodes = useMemo(() => {
    return nodes.map((n) => {
      const patch = nodeDataOverrides[n.id];
      if (!patch) return n;
      return { ...n, data: { ...n.data, ...patch } };
    });
  }, [nodes, nodeDataOverrides]);

  const handleFitView = () => {
    fitView({ padding: 0.2, duration: 300 });
  };

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ nodes: selectedNodes }) => {
      if (selectedNodes.length > 0) setSelectedNodeId(selectedNodes[0].id);
      else setSelectedNodeId(null);
    },
    [setSelectedNodeId],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      if (connection.source && connection.target) {
        const newEdge: Edge = {
          id: `edge-${Date.now()}`,
          source: connection.source,
          target: connection.target,
          style: { stroke: '#525252', strokeWidth: 2 },
          animated: true,
        };
        addLocalEdge(newEdge);
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [addLocalEdge, setEdges],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Delete' && event.key !== 'Backspace') return;

      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const selected = getNodes().filter((node) => node.selected);
      if (selected.length > 0) {
        selected.forEach((node) => {
          removeLocalNode(node.id);
          removeLocalEdges(node.id);
        });

        const selectedIds = new Set(selected.map((n) => n.id));
        setNodes((nds) => nds.filter((n) => !selectedIds.has(n.id)));
        setEdges((eds) =>
          eds.filter(
            (e) => !selectedIds.has(e.source) && !selectedIds.has(e.target),
          ),
        );
        setSelectedNodeId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    getNodes,
    setNodes,
    setEdges,
    setSelectedNodeId,
    removeLocalNode,
    removeLocalEdges,
  ]);

  const handleAddNode = () => {
    const newNode: Node<ServiceNodeData> = {
      id: `node-${Date.now()}`,
      type: 'service',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        name: 'New Service',
        description: 'A new service node',
        status: 'healthy',
        cpu: 0.01,
        memory: '0.05 GB',
        disk: '5.00 GB',
        region: 1,
        provider: 'aws',
        sliderValue: 50,
      },
    };
    addLocalNode(newNode);
    setTimeout(() => fitView({ padding: 0.2, duration: 300 }), 100);
  };

  if (isLoading) {
    return (
      <Skeleton className="flex h-full items-center justify-center p-4 bg-zinc-950">
        <div className="space-y-4 text-center">
          <p className="text-zinc-600 text-xm"> Loading graph... </p>
          <Background
            variant={BackgroundVariant.Dots}
            gap={15}
            size={1}
            color="#3f3f46"
          />
        </div>
      </Skeleton>
    );
  }

  if (!selectedAppId) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950 p-4">
        <p className="text-zinc-500 text-center text-sm">
          Select an application to view its graph
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950 p-4">
        <div className="text-center">
          <p className="text-red-400 mb-2 text-sm">Failed to load graph</p>
          <Button
            variant="outline"
            size="sm"
            className="border-red-800 text-red-400 hover:bg-red-950 bg-transparent"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={viewNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        selectNodesOnDrag={false}
        connectionLineStyle={{ stroke: '#525252', strokeWidth: 2 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={15}
          size={2}
          color="#3f3f46"
        />
        <Controls className="bg-zinc-800! border-zinc-700! [&>button]:bg-zinc-800! [&>button]:border-zinc-700! [&>button]:text-zinc-400! [&>button:hover]:bg-zinc-700!" />
      </ReactFlow>

      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 sm:h-9 sm:w-9 bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
          onClick={handleFitView}
          title="Fit View"
        >
          <Maximize className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <Button
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={handleAddNode}
          title="Add Node"
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GraphCanvas;
