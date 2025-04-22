import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, FileUp, Loader2, X, FileText } from "lucide-react";
import ChatMessage, { MessageType } from "./ChatMessage";
import FileUpload from "./FileUpload";
import { v4 as uuidv4 } from "uuid";
import { processMessage } from "@/services/huggingfaceService";
import { toast } from "sonner";

interface ChatInterfaceProps {
  onSendMessage?: (message: string, files?: File[]) => void;
}

type AnalysisTask = 'review' | 'summarize' | 'insights' | 'solutions';

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome-message",
      type: "assistant",
      content: "Hello! I'm your business AI assistant. You can upload business documents, reports, or problem statements, and I'll help you analyze them. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [currentTask, setCurrentTask] = useState<AnalysisTask | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "Get your business problem solved",
    "Summarize this report",
    "Generate a solution from this document",
    "Extract insights from this business plan"
  ];

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsLoading(false);
      toast.info("Processing stopped");
    }
  };

  const handleSend = async (customMessage?: string, taskType?: AnalysisTask) => {
    const messageToSend = customMessage || input.trim();
    
    if (messageToSend === "" && files.length === 0) return;

    // Create user message
    let userContent = messageToSend;
    
    if (files.length > 0) {
      const fileNames = files.map(file => file.name).join(", ");
      userContent += userContent ? `\n\nFiles: ${fileNames}` : `Files: ${fileNames}`;
    }
    
    if (taskType) {
      userContent = `[${taskType.toUpperCase()}] ${userContent}`;
    }
    
    const newMessage: MessageType = {
      id: uuidv4(),
      type: "user",
      content: userContent,
      timestamp: new Date()
    };
    
    setMessages(current => [...current, newMessage]);
    setInput("");
    
    if (onSendMessage) {
      onSendMessage(messageToSend, files);
    }
    
    setIsLoading(true);
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const task = taskType || currentTask;
      const response = await processMessage(messageToSend, files, task);
      
      setMessages(current => [
        ...current,
        {
          id: uuidv4(),
          type: "assistant",
          content: response,
          timestamp: new Date()
        }
      ]);
      
      setCurrentTask(null);
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }
      console.error("Error processing message:", error);
      toast.error("Failed to process your message. Please try again.");
      
      setMessages(current => [
        ...current,
        {
          id: uuidv4(),
          type: "assistant",
          content: "I'm sorry, I wasn't able to process your request. Please try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
      setAbortController(null);
      setFiles([]);
      setShowUpload(false);
    }
  };

  const handleTaskClick = (task: AnalysisTask) => {
    setCurrentTask(task);
    
    let promptText = "";
    switch (task) {
      case 'review':
        promptText = files.length > 0 
          ? `Please review the attached document${files.length > 1 ? 's' : ''}.` 
          : "Please upload a document for me to review.";
        break;
      case 'summarize':
        promptText = files.length > 0 
          ? `Please summarize the attached document${files.length > 1 ? 's' : ''}.` 
          : "Please upload a document for me to summarize.";
        break;
      case 'insights':
        promptText = files.length > 0 
          ? `Please provide key insights from the attached document${files.length > 1 ? 's' : ''}.` 
          : "Please upload a document to extract insights from.";
        break;
      case 'solutions':
        promptText = files.length > 0 
          ? `Please generate a solution based on the attached document${files.length > 1 ? 's' : ''}.` 
          : "Please upload a document for me to generate solutions for.";
        break;
    }
    
    if (files.length > 0) {
      handleSend(promptText, task);
    } else {
      setShowUpload(true);
      setInput(promptText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Inspirational quote */}
      <div className="bg-gradient-to-r from-bizpurple-50 to-bizblue-50 py-2 px-4 text-center text-sm text-gray-600 border-b">
        AI trained on the greatest business minds. Get insights from business geniuses.
      </div>
      
      {/* Chat container */}
      <div className="flex flex-col h-full">
        {/* Feature buttons */}
        <div className="bg-white border-b py-3 px-4 flex items-center justify-center space-x-2 md:space-x-4">
          <Button 
            onClick={() => handleTaskClick('review')}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs md:text-sm"
          >
            📄 Review
          </Button>
          <Button 
            onClick={() => handleTaskClick('summarize')}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs md:text-sm"
          >
            ✂️ Summarize
          </Button>
          <Button 
            onClick={() => handleTaskClick('insights')}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs md:text-sm"
          >
            📊 Extract Insights
          </Button>
          <Button 
            onClick={() => handleTaskClick('solutions')}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs md:text-sm"
          >
            🧠 Generate Solutions
          </Button>
        </div>
        
        {/* Chat messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ height: 'calc(100% - 180px)' }}
        >
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLastMessage={index === messages.length - 1}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 p-3 max-w-[70%]">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Analyzing...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleStop}
                className="ml-2"
              >
                <X className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          )}
          
          <div ref={messageEndRef} />
        </div>
        
        <div className="border-t bg-white p-4 sticky bottom-0 left-0 right-0">
          {files.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div key={idx} className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs">
                  <FileText className="h-3 w-3" />
                  {file.name}
                  <button 
                    onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2 max-w-4xl mx-auto">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className={`flex-shrink-0 ${showUpload ? 'bg-muted' : ''}`}
              onClick={() => setShowUpload(!showUpload)}
            >
              <FileUp className="h-5 w-5" />
            </Button>
            
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                className="w-full border rounded-lg pl-4 pr-12 py-3 resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                placeholder={currentTask 
                  ? `${currentTask.charAt(0).toUpperCase() + currentTask.slice(1)} this document...` 
                  : "Ask a question or upload a document for analysis..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                style={{ 
                  height: 'auto',
                  minHeight: '52px',
                  maxHeight: '150px'
                }}
              />
              <Button
                className="absolute right-2 bottom-2 h-9 w-9 p-0"
                type="button"
                size="icon"
                onClick={() => handleSend()}
                disabled={isLoading || (input.trim() === "" && files.length === 0)}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {showUpload && (
            <div className="mt-4">
              <FileUpload onFilesSelected={handleFileSelected} />
            </div>
          )}

          {currentTask && (
            <div className="mt-2">
              <div className="text-xs flex items-center gap-1 text-bizpurple-700 bg-bizpurple-50 px-2 py-1 rounded-full inline-block">
                <span>
                  {currentTask === 'review' && '📄 Review mode'}
                  {currentTask === 'summarize' && '✂️ Summarize mode'}
                  {currentTask === 'insights' && '📊 Insights mode'}
                  {currentTask === 'solutions' && '🧠 Solutions mode'}
                </span>
                <button onClick={() => setCurrentTask(null)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
