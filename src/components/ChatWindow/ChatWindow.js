import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import ErrorMessage from './ErrorMessage';

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="bg-navy-900 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
      <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center shadow-lg">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <div>
        <h3 className="text-navy-900 font-semibold text-lg">How can I help you?</h3>
        <p className="text-gray-400 text-sm mt-1">
          Ask me anything about your bench status, skill profile, or career guidance.
        </p>
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, onSendMessage, isLoading, error, onDismissError }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-surface-bg">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Error banner — sits between message list and input */}
      {error && <ErrorMessage message={error} onDismiss={onDismissError} />}

      {/* Input */}
      <ChatInput onSend={onSendMessage} isLoading={isLoading} />
    </div>
  );
}
