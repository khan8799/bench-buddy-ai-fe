// isSystem: true marks messages that are UI-only and must not be sent
// to the LLM as conversation history (see chatService.toApiMessages).
export const GREETING_MESSAGE = {
  id: 'greeting',
  role: 'bot',
  content:
    "Hi! I'm BenchBuddy.AI 👋 How can I help you today? Feel free to ask about your bench status, skill profile, project opportunities, or HR policies.",
  timestamp: new Date(),
  metrics: null,
  isSystem: true,
};
