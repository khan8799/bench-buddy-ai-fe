import { useState, useCallback } from 'react';
import { GREETING_MESSAGE } from '../constants/messages';
import { sendChatMessage, ChatServiceError } from '../services/chatService';

function humanizeError(err) {
  if (!(err instanceof ChatServiceError)) {
    return 'An unexpected error occurred. Please try again.';
  }
  const { statusCode, message } = err;
  if (statusCode === 422) return 'I couldn\'t find relevant information for that question. Try rephrasing it.';
  if (statusCode === 400) return 'Invalid request. Please check your message and try again.';
  if (statusCode >= 500) return 'The AI service is temporarily unavailable. Please try again later.';
  return message || 'Something went wrong. Please try again.';
}

function buildMetrics(confidence, matchedQuestion) {
  return {
    confidence,
    matchedQuestion: matchedQuestion || 'Unknown',
    status: 'Answered',
    escalation: 'No',
  };
}

export function useChat() {
  const [messages, setMessages] = useState([GREETING_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeNav, setActiveNav] = useState('history');

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    setError(null);

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
      metrics: null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { answer, confidence, matchedQuestion, additionalInfo } =
        await sendChatMessage(text.trim());

      // Append additionalInfo as a soft footnote when the backend provides it.
      const fullContent =
        additionalInfo
          ? `${answer}\n\n_${additionalInfo}_`
          : answer;

      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: fullContent,
        timestamp: new Date(),
        metrics: buildMetrics(confidence, matchedQuestion),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(humanizeError(err));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  function startNewChat() {
    setMessages([GREETING_MESSAGE]);
    setIsLoading(false);
    setError(null);
  }

  function dismissError() {
    setError(null);
  }

  return {
    messages,
    isLoading,
    error,
    activeNav,
    setActiveNav,
    sendMessage,
    startNewChat,
    dismissError,
  };
}
