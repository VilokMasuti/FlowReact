'use client';

import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { Badge } from '../ui/badge';
import {
  Settings,
  Database,
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ServiceNodeData extends Record<string, unknown> {
  name: string;
  description: string;
  status: 'healthy' | 'degraded' | 'down';
  cpu: number;
  memory: string;
  disk: string;
  region: number;
  provider: 'aws' | 'gcp' | 'azure';
  sliderValue: number;
}

const statusConfig: Record<
  ServiceNodeData['status'],
  {
    color: string;
    icon: typeof CheckCircle2;
    label: string;
  }
> = {
  healthy: {
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle2,
    label: 'Success',
  },
  degraded: {
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: AlertTriangle,
    label: 'Degraded',
  },
  down: {
    color: 'bg-red-500/10 text-red-400 border-red-500/30',
    icon: XCircle,
    label: 'Error',
  },
};

type ServiceNodeProps = NodeProps<Node<ServiceNodeData>>;

export const ServiceNode = memo(function ServiceNode({
  data,
  selected,
  type,
}: ServiceNodeProps) {
  const status = statusConfig[data.status];
  const StatusIcon = status.icon;
  const isDatabase = type === 'database';

  return (
    <div
      className={cn(
        'rounded-xl bg-zinc-900/95 backdrop-blur border-2 min-w-[260px] max-w-[300px] shadow-2xl transition-all',
        selected
          ? 'border-emerald-500 shadow-emerald-500/20'
          : 'border-zinc-700/60 hover:border-zinc-600',
      )}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                isDatabase ? 'bg-blue-500/20' : 'bg-emerald-500/20',
              )}
            >
              {isDatabase ? (
                <Database className="w-4 h-4 text-blue-400" />
              ) : (
                <Server className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <span className="font-medium text-zinc-100 truncate text-sm">
              {data.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]"
            >
              $0.03/HR
            </Badge>
            <button className="p-1 rounded hover:bg-zinc-800 text-zinc-500">
              <Settings className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 grid grid-cols-4 gap-1 text-[10px]">
        {[
          { label: 'CPU', value: data.cpu },
          { label: 'Memory', value: data.memory },
          { label: 'Disk', value: data.disk },
          { label: 'Region', value: data.region },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-zinc-800/50 rounded px-2 py-1.5 text-center"
          >
            <div className="text-zinc-500">{m.label}</div>
            <div className="text-zinc-300 font-medium truncate">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full',
                data.sliderValue <= 33
                  ? 'bg-emerald-500'
                  : data.sliderValue <= 66
                    ? 'bg-amber-500'
                    : 'bg-red-500',
              )}
              style={{ width: `${data.sliderValue}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500">{data.sliderValue}%</span>
        </div>
      </div>

      <div className="px-4 pb-3 flex items-center justify-between">
        <Badge
          variant="outline"
          className={cn('text-[10px] gap-1', status.color)}
        >
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </Badge>
        <span className="text-[10px] text-zinc-500 uppercase">
          {data.provider}
        </span>
      </div>
    </div>
  );
});
