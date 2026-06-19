import { Clock, HelpCircle, BarChart2, Settings } from 'lucide-react';

const ICON_MAP = { Clock, HelpCircle, BarChart2, Settings };

export default function NavItem({ item, isActive, onClick }) {
  const Icon = ICON_MAP[item.icon];

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 group ${
        isActive
          ? 'bg-navy-600 text-white'
          : 'text-slate-400 hover:bg-navy-800 hover:text-slate-200'
      }`}
    >
      {/* Active indicator bar */}
      <span
        className={`absolute left-0 w-1 h-8 rounded-r-full bg-brand-blue transition-opacity duration-150 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {Icon && (
        <Icon
          className={`w-5 h-5 flex-shrink-0 ${
            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
          }`}
        />
      )}

      <span className="text-sm font-medium flex-1">{item.label}</span>

      {item.badge != null && (
        <span className="ml-auto text-xs font-bold bg-brand-blue text-white px-2 py-0.5 rounded-full min-w-[1.25rem] text-center">
          {item.badge}
        </span>
      )}
    </button>
  );
}
