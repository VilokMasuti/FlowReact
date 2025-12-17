import { useIsMobile } from '../../hooks/use-mobile';
import { useAppStore } from '../../store/store';
import Leftbar from './Leftbar';

import { TopBar } from './TopBar';
import { Sheet, SheetContent } from '../ui/sheet';
import GraphCanvas from '../Canvas/GraphCanvas';
import { ReactFlowProvider } from '@xyflow/react';
import { RightPanel } from './Rightpanel';

const AppLayout = () => {
  const isMobile = useIsMobile();
  const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore();
  return (
    <section className=" flex h-screen flex-col bg-zinc-950 dark">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Leftbar />}
        <main className="flex-1 relative min-w-0">
          <ReactFlowProvider>
            <GraphCanvas />
          </ReactFlowProvider>
        </main>
        {/* Desktop: Fixed right panel - only show on larger screens */}
        {!isMobile && (
          <aside className="w-72 lg:w-80 border-l border-zinc-800 bg-zinc-900/50 overflow-y-auto">
            <RightPanel />
          </aside>
        )}
        {/* Mobile: Full screen sheet drawer */}
        {isMobile && (
          <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
            <SheetContent
              side="right"
              className="w-full sm:w-[85vw] max-w-[400px] bg-zinc-900 border-zinc-800 p-0 [&>button]:top-3 [&>button]:right-3"
            >
              <RightPanel />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </section>
  );
};
export default AppLayout;
