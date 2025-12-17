import {
  ChevronDown,
  MoreHorizontal,
  Share2,
  Moon,
  Sun,
  Settings,
  PanelRightOpen,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

import { useAppStore } from '../../store/store';
import { useApps } from '../../hooks/use-apps';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

export function TopBar() {
  const {
    selectedAppId,
    setSelectedAppId,
    setMobilePanelOpen,
    isMobilePanelOpen,
  } = useAppStore();
  const { data: apps } = useApps();
  const isMobile = useIsMobile();
  const [isDark, setIsDark] = useState(true);

  const selectedApp = apps?.find((app) => app.id === selectedAppId);

  return (
    <header className="flex h-12 sm:h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-2 sm:px-4">
      <div className="flex items-center gap-1 sm:gap-3 min-w-0">
        {/* Logo */}
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 sm:h-6 sm:w-6 text-white"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 sm:gap-2 text-zinc-100  px-2 sm:px-3 h-8 sm:h-9 min-w-10 cursor-pointer"
            >
              {selectedApp ? (
                <img
                  src={selectedApp.icon}
                  alt={selectedApp.name}
                  className="h-5 w-5 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-full  text-xs">
                  🔑
                </span>
              )}
              <span className="font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]">
                {selectedApp?.name ?? 'Apps'}
              </span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-400 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56  border-zinc-800 bg-zinc-800 text-white "
          >
            <DropdownMenuLabel
              className="text-zinc-100 cursor-pointer"
              onClick={() => setSelectedAppId(null)}
            >
              Select App
            </DropdownMenuLabel>
            <DropdownMenuGroup className="  ">
              {apps?.map((app) => (
                <DropdownMenuItem
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-zinc-700 duration-700 text-white"
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <span className="text-sm text-white">{app.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 h-8 w-8 sm:h-9 sm:w-9"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile panel toggle button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 h-8 w-8"
            onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
          >
            <PanelRightOpen className="h-4 w-4" />
          </Button>
        )}

        {!isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 h-8 w-8 sm:h-9 sm:w-9"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 h-8 w-8 sm:h-9 sm:w-9"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 h-8 w-8 sm:h-9 sm:w-9"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="ml-1 sm:ml-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
