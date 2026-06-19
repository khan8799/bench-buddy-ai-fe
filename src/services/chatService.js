import { API_CONFIG } from '../config/api';

// Typed error so callers can distinguish API failures from bugs.
export class ChatServiceError extends Error {
  constructor(message, statusCode = null) {
    super(message);
    this.name = 'ChatServiceError';
    this.statusCode = statusCode;
  }
}

/**
 * Sends the user's message to the Bench Buddy AI backend and returns the
 * structured response from the RAG pipeline.
 *
 * @param {string} message - The user's plain-text question.
 * @returns {Promise<{ answer: string, confidence: number, matchedQuestion: string, additionalInfo: string }>}
 * @throws {ChatServiceError}
 */
export async function sendChatMessage(message) {
  let response;
  try {
    response = await fetch(`${API_CONFIG.url}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new ChatServiceError(
      'Network error. Is the backend running on ' + API_CONFIG.url + '?'
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ChatServiceError(
      data?.error || `Request failed (${response.status})`,
      response.status
    );
  }

  const result = data?.data;
  if (!result?.originalAnswer) {
    throw new ChatServiceError('Received an unexpected response format from the backend.');
  }

  return {
    answer: result.originalAnswer,
    confidence: result?.confidence ?? 50,
    matchedQuestion: result.matchedQuestion ?? '',
    additionalInfo: '',
  };
}
