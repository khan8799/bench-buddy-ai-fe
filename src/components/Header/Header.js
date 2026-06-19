import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-navy-900 rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <span className="text-navy-900 font-bold text-lg tracking-tight">
          BenchBuddy<span className="text-brand-blue">.AI</span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-pulse" />
          <span className="text-sm text-gray-600 font-medium">Online</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-navy-700 flex items-center justify-center text-white text-sm font-semibold cursor-pointer ring-2 ring-offset-1 ring-blue-300">
          U
        </div>
      </div>
    </header>
  );
}
