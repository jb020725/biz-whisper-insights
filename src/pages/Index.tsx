
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ChatInterface from "@/components/ChatInterface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Business Insights Powered by AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Upload business documents, reports, or problem statements and get instant AI-powered analysis and actionable insights
            </p>
            
            {!showChat ? (
              <Button 
                className="bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600 px-8 py-6 text-lg"
                onClick={() => setShowChat(true)}
              >
                Try BizWhisper Now
              </Button>
            ) : (
              <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border overflow-hidden h-[600px]">
                <ChatInterface />
              </div>
            )}
          </div>
          
          <FeaturesSection />
          
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to transform your business insights?</h2>
            <Button 
              className="bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600 px-8 py-6 text-lg"
              onClick={() => navigate('/signup')}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
