import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { sendMessages } from "@/service/chat";
import { Message, ChatContent } from "./ChatContent";

const userText = "做一个下周一到下周五为期5天的杭州到成都的旅行攻略，要求包含机票酒店价格的对比, 替我选出性价比最高的机票和酒店选择，以及成都行程和旅游景点的规划, 要求第一天必须去武侯祠"

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [testMd, setTestMd] = useState("");
  

  const handleSend = async (message: string) => {
    if (!message) return;
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      await sendMessages(message, setMessages);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    // setLoading(false);
  }

  return (
    <div className={`flex flex-col h-screen p-4 w-full flex-1 ${messages.length > 0 ? "fixed bottom-5 justify-center" : "items-center justify-center"}`}>
      {
        messages.length > 0 && (
          <ChatContent messages={messages} />
        )
      }
      {
        messages.length === 0 && (
          <div className="mb-7 flex justify-center items-center text-center w-[80%]">
            <div className="relative inline-flex justify-center text-center">
              <h1 className="text-3xl font-semibold leading-9">有什么可以帮忙的?</h1>
            </div>
          </div>
        )
      }
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
