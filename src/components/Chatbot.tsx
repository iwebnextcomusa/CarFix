import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, RefreshCw, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hello! I'm your CarFix Virtual Specialist. How can I help you explore our high-spec inventory, check financing loan terms, or set up a VIP test drive today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessageBadge, setHasNewMessageBadge] = useState(true);
  const [apiError, setApiError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep chatbot scrolled to bottom on any new chat event
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Open chat and dismiss notification badge
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessageBadge(false);
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const query = (customText || inputMessage).trim();
    if (!query) return;

    setApiError("");
    if (!customText) {
      setInputMessage("");
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Secure server-side call prevents exposing actual keys in browser bundles
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Local server API request failed or was offline.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I'm sorry, I encountered a temporary processing gap. Could you try your search guidelines once more?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setApiError("Unable to reach the CarFix Virtual Specialist engine right now. Please try again.");
      
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Oops! We encountered an issue communicating with our AI advisor. Here's a quick alternative: feel free to use our Contact Page form, or call us at (800) 555-FIX-CAR for immediate answers!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "init",
        role: "assistant",
        content: "Hello! I'm your CarFix Virtual Specialist. How can I help you explore our high-spec inventory, check financing loan terms, or set up a VIP test drive today?",
        timestamp: new Date()
      }
    ]);
    setApiError("");
  };

  const quickPrompts = [
    "What SUVs do you have?",
    "Tell me about Porsche 911",
    "How does trade-in work?",
    "How can I apply for a loan?"
  ];

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative group bg-accent hover:bg-accent-hover text-slate-900 border border-amber-400 p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          title="Open AI CarFix Assistant"
          aria-label="Toggle AI Chat bot"
        >
          {hasNewMessageBadge && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 text-[9px] text-white font-bold items-center justify-center">1</span>
            </span>
          )}
          <MessageSquare className="w-6 h-6 stroke-[2.5]" />
          
          {/* Elegant Hover Hint */}
          <span className="absolute right-16 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 font-medium tracking-wide whitespace-nowrap leading-none transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 hidden md:block">
            Ask CarFix AI Advisor
          </span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="bg-slate-950/95 border border-slate-800 rounded-2xl w-[90vw] sm:w-[400px] h-[480px] max-h-[calc(100vh-120px)] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Window Header */}
          <div className="bg-gradient-to-r from-primary to-slate-900 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-accent/20 p-1.5 rounded-lg border border-accent/30">
                <Bot className="w-5 h-5 text-accent animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-sm tracking-wide leading-none">CarFix Virtual Hub</h3>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                  AI CONSULTANT ACTIVE
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <button 
                onClick={clearChat} 
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                title="Clear Chat History"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={toggleChat} 
                className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                title="Minimize Hub"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Informational Notice */}
          <div className="bg-slate-900/40 px-3 py-1.5 text-[9px] text-slate-400 font-mono border-b border-slate-900 flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 text-accent shrink-0" />
            <span>Securely powered by Gemini AI. Client keys are hidden safely on server.</span>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                    m.role === "user"
                      ? "bg-slate-800 border-slate-700 text-slate-300"
                      : "bg-primary/50 border-blue-900 text-accent animate-float"
                  }`}
                >
                  {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`text-xs leading-relaxed p-3 rounded-xl shadow-lg whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-accent text-slate-900 font-medium rounded-tr-none border border-amber-500/10"
                      : "bg-slate-900 text-slate-100 border border-slate-800/80 rounded-tl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center border bg-primary/40 border-blue-900 text-accent">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-900 border border-slate-800/80 text-slate-400 text-xs py-2.5 px-3 rounded-xl rounded-tl-none flex items-center gap-1.5 font-medium shadow-md">
                  <span>AI Agent is typing</span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce delay-0"></span>
                    <span className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}

            {apiError && (
              <div className="p-2.5 bg-red-950/40 text-red-400 flex items-center gap-2 border border-red-900/30 rounded-xl text-2xs font-sans">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggest prompts */}
          <div className="px-3 py-2 border-t border-slate-900 flex gap-1.5 overflow-x-auto bg-slate-950 no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(undefined, p)}
                className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Window Footer Input Form */}
          <form onSubmit={(e) => handleSendMessage(e)} className="p-3 border-t border-slate-900 bg-slate-950/90 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about inventory, trade value, loans..."
              className="flex-1 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-accent text-ellipsis"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-hover text-slate-900 px-3 py-2 rounded-xl flex items-center justify-center border border-amber-500/10 hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer"
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send query"
            >
              <Send className="w-4 h-4 fill-current stroke-[1.5]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
