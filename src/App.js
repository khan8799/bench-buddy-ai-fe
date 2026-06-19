import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { useChat } from './hooks/useChat';
import { NAV_ITEMS } from './constants/navigation';

function App() {
  const {
    messages,
    isLoading,
    error,
    activeNav,
    setActiveNav,
    sendMessage,
    startNewChat,
    dismissError,
  } = useChat();

  return (
    <div className="h-screen flex flex-col overflow-hidden font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          navItems={NAV_ITEMS}
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onNewChat={startNewChat}
        />
        <main className="flex-1 overflow-hidden">
          <ChatWindow
            messages={messages}
            onSendMessage={sendMessage}
            isLoading={isLoading}
            error={error}
            onDismissError={dismissError}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
