import { Bot } from 'lucide-react';
import MetricsRow from './MetricsRow';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2.5">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-white text-navy-900 rounded-2xl rounded-br-md px-4 py-3 shadow-sm text-sm leading-relaxed">
            {message.content}
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">
            {formatTime(message.timestamp)}
          </p>
        </div>
        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-navy-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          U
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      {/* Bot avatar */}
      <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot className="w-5 h-5 text-white" />
      </div>

      <div className="max-w-xs lg:max-w-md xl:max-w-lg">
        <div className="bg-navy-900 text-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm text-sm leading-relaxed">
          {message.content}
        </div>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          {formatTime(message.timestamp)}
          <span className="text-blue-400">✓✓</span>
        </p>

        {message.metrics && (
          <div className="mt-3">
            <MetricsRow metrics={message.metrics} />
          </div>
        )}
      </div>
    </div>
  );
}
