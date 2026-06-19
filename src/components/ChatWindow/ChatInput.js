import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-4 py-3 bg-white border-t border-gray-200"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder="Type your question here..."
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="w-10 h-10 rounded-xl bg-brand-blue hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors flex-shrink-0 shadow-sm"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
