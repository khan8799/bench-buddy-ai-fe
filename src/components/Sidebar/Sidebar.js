import { Plus } from 'lucide-react';
import NavItem from './NavItem';

export default function Sidebar({ navItems, activeNav, onNavChange, onNewChat }) {
  return (
    <aside className="w-64 bg-navy-900 flex flex-col flex-shrink-0 h-full">
      {/* New Chat button */}
      <div className="p-4 pt-5">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2.5 bg-brand-blue hover:bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 relative space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeNav === item.id}
            onClick={onNavChange}
          />
        ))}
      </nav>

      {/* Bottom branding */}
      <div className="p-4 border-t border-navy-800">
        <p className="text-xs text-slate-600 text-center">BenchBuddy.AI v1.0</p>
      </div>
    </aside>
  );
}
