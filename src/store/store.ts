import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';

import type { ServiceNodeData } from '../types/graph';

export type InspectorTab = 'config' | 'runtime';

type NodeDataPatch = Partial<
  Pick<ServiceNodeData, 'name' | 'description' | 'sliderValue'>
>;

interface AppState {
  // Required state
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;

  // Bonus local nodes/edges (typed to avoid `any`)
  localNodes: Node<ServiceNodeData>[];
  localEdges: Edge[];

  // NEW: persisted edits for ANY node (API or local)
  nodeDataOverrides: Record<string, NodeDataPatch>;

  // Actions
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;

  addLocalNode: (node: Node<ServiceNodeData>) => void;
  addLocalEdge: (edge: Edge) => void;
  removeLocalNode: (nodeId: string) => void;
  removeLocalEdges: (nodeId: string) => void;

  // Bonus: update local node (if you need it elsewhere)
  updateLocalNode: (nodeId: string, data: Partial<ServiceNodeData>) => void;

  // Required: update selected node data (name/desc/slider)
  updateNodeData: (nodeId: string, patch: NodeDataPatch) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',

  localNodes: [],
  localEdges: [],

  nodeDataOverrides: {},

  setSelectedAppId: (id) =>
    set({
      selectedAppId: id,
      selectedNodeId: null,
      activeInspectorTab: 'config',
      isMobilePanelOpen: false,
      localNodes: [],
      localEdges: [],
      nodeDataOverrides: {},
    }),

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  addLocalNode: (node) => set((s) => ({ localNodes: [...s.localNodes, node] })),
  addLocalEdge: (edge) => set((s) => ({ localEdges: [...s.localEdges, edge] })),

  removeLocalNode: (nodeId) =>
    set((s) => ({
      localNodes: s.localNodes.filter((n) => n.id !== nodeId),
    })),

  removeLocalEdges: (nodeId) =>
    set((s) => ({
      localEdges: s.localEdges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      ),
    })),

  updateLocalNode: (nodeId, data) =>
    set((s) => ({
      localNodes: s.localNodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    })),

  updateNodeData: (nodeId, patch) =>
    set((s) => ({
      nodeDataOverrides: {
        ...s.nodeDataOverrides,
        [nodeId]: { ...(s.nodeDataOverrides[nodeId] ?? {}), ...patch },
      },
    })),
}));
