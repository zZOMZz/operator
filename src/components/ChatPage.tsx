import React, { useState } from "react";
import ChatInput from "./ChatInput";
import { sendMessages } from "@/service/chat";
import { Message, ChatContent } from "./ChatContent";
import { SearchCode } from 'lucide-react'

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (message: string) => {
    if (!message) return;
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      await sendMessages(message, setMessages);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }

  return (
    <div className={`flex flex-col h-screen p-4 w-full flex-1 ${messages.length > 0 ? "fixed bottom-5 justify-center items-center" : "items-center justify-center -translate-y-[50px]"}`}>
      {messages.length > 0 ? (
        <ChatContent messages={messages} />
      ) : (
        <div className="mb-7 flex justify-center items-center text-center w-[80%]">
          <div className="relative flex flex-col justify-center text-center gap-3">
            <div className="flex flex-row items-center justify-center gap-2 text-xl">
              <div className="flex items-center justify-center">
                <SearchCode size={24} />
              </div>
              <div className="font-semibold leading-9 font-sans">DeepResearch Plus</div>
            </div>
            <div className="text-4xl font-medium tracking-wide">自主执行、实时浏览、深度思考</div>
          </div>
        </div>
      )}
      <div className="w-[90%] flex items-center">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
