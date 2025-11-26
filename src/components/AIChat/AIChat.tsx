import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import parse, { domToReact, type DOMNode, Element } from "html-react-parser";
import { Link } from "react-router-dom";
import { AxiosClient } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

const AIChat = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Xin chào! Tôi là trợ lý ảo Tour Management. Tôi có thể giúp gì cho bạn hôm nay?",
      timestamp: "Vừa xong",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const parserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === "a" &&
        domNode.attribs
      ) {
        const { href, style } = domNode.attribs;

        if (href && href.startsWith("/")) {
          return (
            <Link
              to={href}
              className="text-blue-600 font-bold hover:underline"
              style={
                style
                  ? (style as any)
                  : { color: "#d32f2f", fontWeight: "bold" }
              }
            >
              {domToReact(domNode.children as DOMNode[], parserOptions)}
            </Link>
          );
        }
      }
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaiting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      role: "user",
      content: prompt,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsWaiting(true);

    try {
      const res = await AxiosClient.get("/ai/suggest-tour", {
        params: { question: userMessage.content },
      });

      const aiResponseContent = res.data;

      const aiMessage: Message = {
        role: "ai",
        content: aiResponseContent,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "ai",
        content: "Xin lỗi, tôi đang gặp sự cố kết nối tới máy chủ AI.",
        timestamp: currentTime,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="grid w-full h-full rounded-lg border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800 flex flex-col bg-white shadow-sm">
      <div className="flex flex-1 p-4 flex-col overflow-hidden">
        <div className="space-y-1 mb-4 flex-shrink-0 border-b pb-2">
          <h3 className="text-lg font-bold leading-none text-blue-700">
            Trợ lý du lịch AI
          </h3>
          <p className="text-sm leading-none text-green-600 flex items-center gap-1">
            <span className="block w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            Đang hoạt động
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              } space-y-2`}
            >
              <div
                className={`rounded-2xl p-4 max-w-[85%] shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.role === "ai"
                    ? parse(msg.content, parserOptions)
                    : msg.content}
                </div>
              </div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 px-1">
                {msg.timestamp}
              </div>
            </div>
          ))}

          {isWaiting && (
            <div className="flex flex-col items-start space-y-2">
              <div className="rounded-2xl rounded-bl-none bg-gray-100 dark:bg-gray-800 p-4 border">
                <div className="text-sm flex gap-1 items-center h-5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <p className="text-gray-400 text-sm">
                    Tôi suy nghĩ hơi lâu, đợi xí nhá
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
        <form className="flex space-x-4 items-end" onSubmit={handleSubmit}>
          <div className="flex-1">
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Bạn muốn đi đâu? (VD: Đi Sapa, Đi biển...)"
              className="min-h-[50px] max-h-[120px] overflow-y-auto resize-none text-sm bg-white focus-visible:ring-blue-500"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={isWaiting || !prompt.trim()}
            className="bg-blue-600 hover:bg-blue-700 h-[50px] w-[80px]"
          >
            Gửi
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
