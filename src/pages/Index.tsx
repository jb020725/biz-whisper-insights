
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, BarChart3, PieChart, LineChart } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-bizpurple-600 to-bizblue-600 bg-clip-text text-transparent">
              AI-Powered Business Insights
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
              <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border overflow-hidden h-[600px]">
                <ChatInterface />
              </div>
            )}
          </div>
          
          {/* Key Features Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Unlock Business Potential with AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-bizpurple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="text-bizpurple-500 h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Review Documents</h3>
                <p className="text-gray-600">
                  Get comprehensive analysis of any business document, from financial reports to market research.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-bizblue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="text-bizblue-500 h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Summarize Content</h3>
                <p className="text-gray-600">
                  Distill lengthy documents into concise, actionable summaries that highlight key points.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-bizpurple-100 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="text-bizpurple-500 h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Extract Insights</h3>
                <p className="text-gray-600">
                  Uncover hidden patterns, opportunities, and key metrics from your business data.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-bizblue-100 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="text-bizblue-500 h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Generate Solutions</h3>
                <p className="text-gray-600">
                  Get AI-powered recommendations and strategies to overcome business challenges.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="py-12 px-6 bg-gradient-to-r from-bizpurple-500/10 to-bizblue-500/10 rounded-2xl text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">AI trained on the greatest business minds</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Get insights from business geniuses through AI analysis that understands context, identifies patterns, and generates actionable recommendations.
            </p>
            <Button 
              className="bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600 px-8 py-6"
              onClick={() => navigate('/signup')}
              size="lg"
            >
              Start Your Free Trial
            </Button>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
