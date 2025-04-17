
import { useEffect, useRef } from "react";

export type MessageType = {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  isLastMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLastMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLastMessage]);

  // Format timestamp
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (message.type === "user") {
    return (
      <div ref={messageRef} className="flex justify-end mb-4">
        <div className="max-w-[85%] md:max-w-[70%] relative">
          <div className="bg-bizpurple-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-xs text-muted-foreground block mt-1 text-right">
            {formattedTime}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div ref={messageRef} className="flex justify-start mb-4">
      <div className="max-w-[85%] md:max-w-[70%] relative">
        <div className="bg-bizblue-50 text-foreground p-3 rounded-2xl rounded-tl-none shadow-sm border border-border/50">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground block mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
