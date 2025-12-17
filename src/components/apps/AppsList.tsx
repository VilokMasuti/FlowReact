'use client';

import { ChevronRight, Plus, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { useApps } from '../../hooks/use-apps';
import { useAppStore } from '../../store/store';

export function AppsList() {
  const { data: apps, isLoading, isError } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-select first app on load
  useEffect(() => {
    if (apps && apps.length > 0 && !selectedAppId) {
      setSelectedAppId(apps[0].id);
    }
  }, [apps, selectedAppId, setSelectedAppId]);

  const filteredApps = apps?.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-semibold text-zinc-100">
            Application
          </h2>
        </div>
        <Skeleton className="h-8 sm:h-9 w-full bg-zinc-800" />
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 sm:h-10 w-full bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-3 sm:p-4 text-center">
        <p className="text-xs sm:text-sm text-red-400">
          Failed to load applications
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 border-red-800 text-red-400 hover:bg-red-950 bg-transparent text-xs"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-semibold text-zinc-100">
          Application
        </h2>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 sm:left-2.5 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 sm:h-9 bg-zinc-800/50 border-zinc-700 pl-7 sm:pl-8 text-zinc-100 placeholder:text-zinc-500 text-xs sm:text-sm"
          />
        </div>
        <Button
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 bg-emerald-600 hover:bg-emerald-700 shrink-0"
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="space-y-1 max-h-[200px] sm:max-h-[250px] overflow-y-auto">
        {filteredApps?.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 text-left transition-colors',
              selectedAppId === app.id
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200',
            )}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src={app.icon}
                alt={app.name}
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="text-sm text-white">{app.name}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-600 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
