
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">BizWhisper Chat</h1>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden h-[calc(100vh-300px)]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
