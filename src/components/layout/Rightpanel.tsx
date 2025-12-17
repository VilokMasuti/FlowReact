'use client';

import { useIsMobile } from '../../hooks/use-mobile';
import { useAppStore } from '../../store/store';
import { AppsList } from '../apps/AppsList';
import { NodeInspector } from '../Inspector/Inspector';

export function RightPanel() {
  const { selectedNodeId } = useAppStore();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full flex-col">
      <div
        className={`border-b border-zinc-800 p-3 sm:p-4 ${isMobile ? 'pt-10' : ''}`}
      >
        <AppsList />
      </div>

      {/* Node Inspector */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {selectedNodeId ? (
          <NodeInspector />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-xs sm:text-sm text-zinc-500 px-4">
            <p>Select a node on the canvas to inspect its properties</p>
          </div>
        )}
      </div>
    </div>
  );
}
