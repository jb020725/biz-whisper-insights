
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TestimonialSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "BizWhisper has transformed how we analyze quarterly reports. What used to take days now takes minutes, with better insights than our team could produce manually.",
      author: "Sarah Johnson",
      role: "CFO",
      company: "TechGrowth Inc."
    },
    {
      id: 2,
      quote: "As a business consultant, I need to quickly understand complex client situations. This tool helps me extract the most important information and provide value faster than ever.",
      author: "Michael Chen",
      role: "Senior Consultant",
      company: "Strategic Partners LLC"
    },
    {
      id: 3,
      quote: "The insights generated from our market research documents were exceptional. BizWhisper identified opportunities we had completely overlooked in our manual analysis.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Innovate Solutions"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-bizblue-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Business leaders and consultants trust BizWhisper for their document analysis and insights needs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -left-8 top-1/2 -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 bg-white shadow-sm" 
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute -right-8 top-1/2 -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 bg-white shadow-sm" 
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border">
            <div className="flex justify-center mb-6">
              <div className="bg-bizpurple-100 h-12 w-12 rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-bizpurple-500" />
              </div>
            </div>
            
            <blockquote className="text-center mb-8">
              <p className="text-xl italic mb-6">"{testimonials[currentIndex].quote}"</p>
              <footer>
                <div className="font-medium text-lg">{testimonials[currentIndex].author}</div>
                <div className="text-muted-foreground">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </div>
              </footer>
            </blockquote>
            
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 rounded-full ${
                    index === currentIndex ? "w-8 bg-bizpurple-500" : "w-2.5 bg-bizpurple-200"
                  } transition-all duration-300`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
