import {
  Github,
  Settings,
  Database,
  Leaf,
  Package,
  LayoutGrid,
  GitBranch,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: Github, label: 'GitHub', active: false, color: 'text-zinc-400' },
  {
    icon: Settings,
    label: 'Settings',
    active: true,
    color: 'text-emerald-500',
  },
  { icon: Database, label: 'Database', active: false, color: 'text-red-400' },
  { icon: Leaf, label: 'Environment', active: false, color: 'text-green-400' },
  { icon: Package, label: 'Packages', active: false, color: 'text-amber-400' },
  {
    icon: LayoutGrid,
    label: 'Layout',
    active: false,
    color: 'text-yellow-400',
  },
  { icon: GitBranch, label: 'Branches', active: false, color: 'text-cyan-400' },
];
const Leftbar = () => {
  return (
    <nav className="flex w-14 flex-col items-center gap-2 border-r border-zinc-800 bg-zinc-900 py-4">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg transition-colors cursor-pointer',
            item.active ? 'bg-zinc-700' : 'hover:bg-zinc-800',
            item.color,
          )}
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
        </button>
      ))}
    </nav>
  );
};
export default Leftbar;
