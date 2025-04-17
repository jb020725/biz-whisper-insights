
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out the platform",
      features: [
        "5 document analyses per month",
        "Basic insights and summaries",
        "Max 10 pages per document",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline"
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      popular: true,
      description: "For business professionals and consultants",
      features: [
        "50 document analyses per month",
        "Advanced insights and recommendations",
        "Max 50 pages per document",
        "Priority support",
        "Data visualization",
        "Export to PDF/Word/Excel"
      ],
      buttonText: "Start 14-day Trial",
      buttonVariant: "default"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Unlimited document analyses",
        "Custom AI model training",
        "API access",
        "Dedicated support manager",
        "Advanced security features",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your business needs. All plans include core document analysis features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white border rounded-xl shadow-sm overflow-hidden ${
                plan.popular ? "ring-2 ring-bizpurple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-bizpurple-500 text-white py-1 px-4 text-xs font-medium text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-medium mb-1">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                
                <Button 
                  variant={plan.buttonVariant as "default" | "outline"}
                  className={`w-full ${
                    plan.buttonVariant === "default" 
                      ? "bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600" 
                      : ""
                  }`}
                >
                  {plan.buttonText}
                </Button>
                
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-bizpurple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
