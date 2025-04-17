
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "./ChatInterface";

export const DemoSection = () => {
  const [activeTab, setActiveTab] = useState("financial");

  const demoScenarios = {
    financial: {
      title: "Financial Report Analysis",
      description: "Upload quarterly financial reports and get instant insights on performance metrics, trends, and opportunities."
    },
    market: {
      title: "Market Research Interpretation",
      description: "Process market research documents to understand competitive landscape, customer preferences, and growth opportunities."
    },
    strategy: {
      title: "Strategic Planning Assistant",
      description: "Transform business strategy documents into actionable roadmaps with clear prioritization."
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See BizWhisper in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience how our AI translates complex business documents into clear, actionable insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-bizpurple-50 p-6 rounded-xl border border-bizpurple-100">
              <h3 className="text-xl font-medium mb-4">Try These Scenarios</h3>
              
              <Tabs 
                defaultValue="financial" 
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="flex flex-col h-auto space-y-2 rounded-md bg-transparent mb-6">
                  <TabsTrigger 
                    value="financial"
                    className="justify-start text-left bg-white/50 data-[state=active]:bg-white data-[state=active]:border-l-4 data-[state=active]:border-bizpurple-500 rounded-md"
                  >
                    Financial Report Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="market"
                    className="justify-start text-left bg-white/50 data-[state=active]:bg-white data-[state=active]:border-l-4 data-[state=active]:border-bizpurple-500 rounded-md"
                  >
                    Market Research Interpretation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="strategy"
                    className="justify-start text-left bg-white/50 data-[state=active]:bg-white data-[state=active]:border-l-4 data-[state=active]:border-bizpurple-500 rounded-md"
                  >
                    Strategic Planning Assistant
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="financial">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">{demoScenarios.financial.title}</h4>
                    <p className="text-muted-foreground">{demoScenarios.financial.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="market">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">{demoScenarios.market.title}</h4>
                    <p className="text-muted-foreground">{demoScenarios.market.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="strategy">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">{demoScenarios.strategy.title}</h4>
                    <p className="text-muted-foreground">{demoScenarios.strategy.description}</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button className="w-full bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600">
                Start Free Trial
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="border rounded-xl shadow-sm overflow-hidden h-[600px]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
