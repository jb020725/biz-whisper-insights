
import { FeatureCard } from "./FeatureCard";
import { FileType, LineChart, PieChart, Brain, Lightbulb, Clock } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: FileType,
      title: "Document Analysis",
      description: "Upload reports, PDFs, and text documents for in-depth analysis and key insight extraction."
    },
    {
      icon: LineChart,
      title: "Trend Identification",
      description: "Identify critical business trends and patterns from your historical data and reports."
    },
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Get strategic recommendations and actionable suggestions based on your business data."
    },
    {
      icon: PieChart,
      title: "Visual Summaries",
      description: "Receive visual representations of key metrics and findings for easier comprehension."
    },
    {
      icon: Lightbulb,
      title: "Opportunity Discovery",
      description: "Uncover hidden business opportunities and potential areas for growth and optimization."
    },
    {
      icon: Clock,
      title: "Time-Saving Analysis",
      description: "Save hours of manual analysis with instant, AI-powered document processing."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-bizpurple-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Business Intelligence Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform transforms complex business documents into clear, actionable insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
