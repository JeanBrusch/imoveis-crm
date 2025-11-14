import { useState } from "react";
import { Send, X, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Message {
  id: string;
  text: string;
  sender: "client" | "realtor";
  timestamp: Date;
}

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  realtorName: string;
  realtorAvatar: string;
  realtorOnline?: boolean;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

export function ChatWindow({
  isOpen,
  onClose,
  realtorName,
  realtorAvatar,
  realtorOnline = true,
  messages = [],
  onSendMessage,
}: ChatWindowProps) {
  const [inputMessage, setInputMessage] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage?.(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed inset-0 md:inset-auto md:right-6 md:bottom-6 md:top-auto md:w-96 z-50">
      <Card className="h-full md:h-[600px] flex flex-col shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={realtorAvatar} alt={realtorName} />
                <AvatarFallback>{realtorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <Circle
                className={`h-3 w-3 absolute bottom-0 right-0 ${
                  realtorOnline ? "fill-status-online text-status-online" : "fill-status-offline text-status-offline"
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold" data-testid="text-realtor-name">{realtorName}</h3>
              <p className="text-xs text-muted-foreground">
                {realtorOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-chat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "client" ? "justify-end" : "justify-start"
                }`}
                data-testid={`message-${message.id}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "client"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              data-testid="input-message"
            />
            <Button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
