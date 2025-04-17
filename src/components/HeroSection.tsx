
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, BarChart2, FileSearch } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4C3988" />
              <stop offset={1} stopColor="#1A365D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Transform Business Documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-bizpurple-500 to-bizblue-500">Into Actionable Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Upload business reports, PDFs, and problem statements. Get instant summaries, analysis, and strategic recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link to="/chat">
                <Button className="bg-gradient-to-r from-bizpurple-500 to-bizblue-500 hover:from-bizpurple-600 hover:to-bizblue-600 text-white rounded-lg py-6 px-6">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="py-6">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-bizblue-100 flex items-center justify-center text-xs font-medium text-bizblue-600">JD</div>
                <div className="h-8 w-8 rounded-full bg-bizpurple-100 flex items-center justify-center text-xs font-medium text-bizpurple-600">AS</div>
                <div className="h-8 w-8 rounded-full bg-bizblue-100 flex items-center justify-center text-xs font-medium text-bizblue-600">RK</div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">500+</span> business analysts already use BizWhisper
              </p>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-full max-w-md h-[480px] bg-white rounded-xl shadow-lg border overflow-hidden transform rotate-1">
              <div className="h-12 bg-bizpurple-50 border-b flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-4 h-[calc(480px-48px)] overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  <div className="self-start max-w-[80%] bg-bizblue-50 p-3 rounded-xl rounded-tl-none">
                    <p className="text-sm">I need help analyzing this quarterly report. What are the key insights?</p>
                  </div>
                  <div className="self-end max-w-[80%] bg-bizpurple-500 text-white p-3 rounded-xl rounded-tr-none">
                    <p className="text-sm">Based on my analysis, here are the key insights:</p>
                    <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                      <li>Revenue increased by 15% compared to last quarter</li>
                      <li>Customer acquisition costs decreased by 8%</li>
                      <li>New market expansion shows promising results</li>
                    </ul>
                  </div>
                  <div className="self-start max-w-[80%] bg-bizblue-50 p-3 rounded-xl rounded-tl-none">
                    <p className="text-sm">Can you provide recommendations based on these trends?</p>
                  </div>
                  <div className="self-end max-w-[80%] bg-bizpurple-500 text-white p-3 rounded-xl rounded-tr-none">
                    <p className="text-sm">Here are my strategic recommendations:</p>
                    <ol className="text-sm list-decimal pl-5 mt-2 space-y-1">
                      <li>Increase investment in the European market by 10%</li>
                      <li>Optimize your digital marketing funnel</li>
                      <li>Consider strategic partnerships with complementary businesses</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-bizpurple-100 rounded-lg flex items-center justify-center rotate-6 shadow-sm">
              <FileText className="h-8 w-8 text-bizpurple-500" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-bizblue-100 rounded-lg flex items-center justify-center -rotate-6 shadow-sm">
              <BarChart2 className="h-10 w-10 text-bizblue-500" />
            </div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/4 w-12 h-12 bg-gradient-to-br from-bizpurple-200 to-bizblue-200 rounded-lg flex items-center justify-center rotate-12 shadow-sm">
              <FileSearch className="h-6 w-6 text-bizblue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
