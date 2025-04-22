
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 h-[calc(100vh-128px)]">
          <ChatInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
