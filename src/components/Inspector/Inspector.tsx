/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/store';
import { useGraph } from '../../hooks/use-graph';

import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  HardDrive,
  Globe,
  MemoryStick,
} from 'lucide-react';

import { cn } from '../../lib/utils';
import type { GraphNode, ServiceNodeData } from '../../types/graph';

type Status = ServiceNodeData['status'];

const statusConfig = {
  healthy: {
    color: 'bg-emerald-500 text-white',
    icon: CheckCircle2,
    label: 'Success',
  },
  degraded: {
    color: 'bg-amber-500 text-white',
    icon: AlertTriangle,
    label: 'Degraded',
  },
  down: { color: 'bg-red-500 text-white', icon: XCircle, label: 'Error' },
} satisfies Record<Status, { color: string; icon: any; label: string }>;

const clamp01to100 = (n: number) => Math.min(100, Math.max(0, n));

export function NodeInspector() {
  const {
    selectedAppId,
    selectedNodeId,
    activeInspectorTab,
    setActiveInspectorTab,
    localNodes,
    nodeDataOverrides,
    updateNodeData,
  } = useAppStore();

  const { data: graphData } = useGraph(selectedAppId);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;

    const apiNodes = (graphData?.nodes ?? []) as GraphNode[];
    const allNodes = [
      ...apiNodes,
      ...localNodes.map((n) => ({
        id: n.id,
        type: n.type as GraphNode['type'],
        position: n.position,
        data: n.data as ServiceNodeData,
      })),
    ];

    const base = allNodes.find((node) => node.id === selectedNodeId);
    if (!base) return null;

    const patch = nodeDataOverrides[selectedNodeId] ?? {};
    return { ...base, data: { ...base.data, ...patch } };
  }, [graphData, localNodes, nodeDataOverrides, selectedNodeId]);

  if (!selectedNode) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-zinc-500 text-sm text-center">
          Select a node to view details
        </p>
      </div>
    );
  }

  const nodeStatus = (selectedNode.data.status ?? 'healthy') as Status;
  const status = statusConfig[nodeStatus];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-zinc-100 truncate">
          {selectedNode.data.name}
        </h3>
        <Badge className={cn('shrink-0 gap-1', status.color)}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </Badge>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={(v) => setActiveInspectorTab(v as any)}
      >
        <TabsList className="w-full bg-zinc-800/50">
          <TabsTrigger
            value="config"
            className="flex-1 data-[state=active]:bg-zinc-700"
          >
            Config
          </TabsTrigger>
          <TabsTrigger
            value="runtime"
            className="flex-1 data-[state=active]:bg-zinc-700"
          >
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Name</Label>
            <Input
              value={selectedNode.data.name ?? ''}
              onChange={(e) =>
                updateNodeData(selectedNode.id, { name: e.target.value })
              }
              className="bg-zinc-800/50 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Description</Label>
            <Textarea
              value={selectedNode.data.description ?? ''}
              onChange={(e) =>
                updateNodeData(selectedNode.id, { description: e.target.value })
              }
              className="bg-zinc-800/50 border-zinc-700 resize-none text-white"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1 text-white">
              <Label className="text-zinc-400 text-xs">Type</Label>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-md px-3 py-2 text-sm capitalize">
                {selectedNode.type}
              </div>
            </div>
            <div className="space-y-1 text-white">
              <Label className="text-zinc-400 text-xs">Provider</Label>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-md px-3 py-2 text-sm uppercase">
                {selectedNode.data.provider}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Cpu, label: 'CPU', value: selectedNode.data.cpu },
              {
                icon: MemoryStick,
                label: 'Memory',
                value: selectedNode.data.memory,
              },
              { icon: HardDrive, label: 'Disk', value: selectedNode.data.disk },
              { icon: Globe, label: 'Region', value: selectedNode.data.region },
            ].map((metric) => (
              <Card
                key={metric.label}
                className="bg-zinc-800/50 border-zinc-700"
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <metric.icon className="w-3 h-3" />
                    <span className="text-xs">{metric.label}</span>
                  </div>
                  <p className="font-semibold text-zinc-100">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <SyncedSliderInput
            key={selectedNode.id}
            value={selectedNode.data.sliderValue ?? 0}
            onChange={(v) =>
              updateNodeData(selectedNode.id, { sliderValue: v })
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SyncedSliderInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState(() => String(value));

  const handleSlider = (v: number) => {
    const c = clamp01to100(v);
    setDraft(String(c));
    onChange(c);
  };

  const handleInput = (next: string) => {
    setDraft(next);
    if (next.trim() === '') return;
    const n = Number(next);
    if (!Number.isNaN(n)) onChange(clamp01to100(n));
  };

  return (
    <div className="space-y-3">
      <Label className="text-zinc-400 text-xs">Resource Allocation</Label>

      <div className="flex items-center gap-4">
        <Slider
          value={[value]}
          onValueChange={([v]) => handleSlider(v)}
          min={0}
          max={100}
          step={1}
          className="flex-1"
        />
        <Input
          type="number"
          value={draft}
          onChange={(e) => handleInput(e.target.value)}
          onBlur={() => setDraft(String(value))}
          min={0}
          max={100}
          className="w-16  text-center text-white text-2xl bg-amber-500"
        />
      </div>

      <p className="text-[10px] text-zinc-500">Drag slider or type to adjust</p>
    </div>
  );
}
