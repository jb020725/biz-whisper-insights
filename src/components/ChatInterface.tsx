
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Settings, Loader2 } from "lucide-react";
import ChatMessage, { MessageType } from "./ChatMessage";
import FileUpload from "./FileUpload";
import { v4 as uuidv4 } from "uuid";
import { processMessage } from "@/services/huggingfaceService";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ApiSettings from "./ApiSettings";
import { toast } from "sonner";

interface ChatInterfaceProps {
  onSendMessage?: (message: string, files?: File[]) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome-message",
      type: "assistant",
      content: "Hello! I'm your business insights assistant. You can upload business documents, reports, or problem statements, and I'll help you analyze them. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [apiConfigured, setApiConfigured] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "Summarize this financial report",
    "Analyze the key trends in this data",
    "Identify business opportunities from this market analysis",
    "Explain the main challenges described in this document"
  ];

  const handleSend = async () => {
    if (input.trim() === "" && files.length === 0) return;
    
    // Create user message
    let userContent = input.trim();
    
    if (files.length > 0) {
      const fileNames = files.map(file => file.name).join(", ");
      userContent += userContent ? `\n\nFiles: ${fileNames}` : `Files: ${fileNames}`;
    }
    
    const newMessage: MessageType = {
      id: uuidv4(),
      type: "user",
      content: userContent,
      timestamp: new Date()
    };
    
    setMessages(current => [...current, newMessage]);
    setInput("");
    
    // Call parent callback if provided
    if (onSendMessage) {
      onSendMessage(input, files);
    }
    
    // Process message with HuggingFace API
    setIsLoading(true);
    try {
      const response = await processMessage(input, files);
      
      setMessages(current => [
        ...current,
        {
          id: uuidv4(),
          type: "assistant",
          content: response,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Failed to process your message. Please try again.");
      
      // Add error message
      setMessages(current => [
        ...current,
        {
          id: uuidv4(),
          type: "assistant",
          content: "I'm sorry, I wasn't able to process your request. Please check your API settings and try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
      setFiles([]);
      setShowUpload(false);
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

  const handleApiSettingsSaved = () => {
    setApiConfigured(true);
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <div className="flex items-center">
          <div>
            <h3 className="font-medium text-sm">BizWhisper Assistant</h3>
            <p className="text-xs text-muted-foreground">Business insights AI</p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              API Settings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ApiSettings onClose={handleApiSettingsSaved} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
          </div>
        )}
        
        <div ref={messageEndRef} />
      </div>
      
      {/* Suggested queries */}
      {messages.length === 1 && (
        <div className="p-4 border-t">
          <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((query, i) => (
              <button
                key={i}
                className="bg-bizpurple-50 hover:bg-bizpurple-100 text-bizpurple-700 text-sm py-1 px-3 rounded-full border border-bizpurple-200"
                onClick={() => setInput(query)}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* File upload area */}
      {showUpload && (
        <div className="p-4 border-t bg-muted/30">
          <FileUpload onFilesSelected={handleFileSelected} />
        </div>
      )}
      
      {/* Chat input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-end space-x-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => setShowUpload(!showUpload)}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="relative flex-1">
            <textarea
              className="w-full border rounded-lg pl-4 pr-12 py-3 resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
              rows={1}
              placeholder="Ask a question or upload a document..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{ 
                height: input.split('\n').length > 3 ? 'auto' : '44px',
                maxHeight: '150px',
                minHeight: '44px'
              }}
            />
            <Button
              className="absolute right-1 bottom-1 h-8 w-8 p-0"
              type="button"
              size="icon"
              onClick={handleSend}
              disabled={isLoading || (input.trim() === "" && files.length === 0)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Display selected files */}
        {files.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">Selected files:</p>
            <div className="flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div key={idx} className="text-xs bg-muted px-2 py-1 rounded-md">
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
