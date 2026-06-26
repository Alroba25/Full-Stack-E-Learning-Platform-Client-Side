"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { askAI, clearChatHistory, getChatHistory } from "@/Lib";
import {
  Send,
  User,
  Bot,
  Sparkles,
  HelpCircle,
  Trophy,
  BookOpen,
  Trash2,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    {
      text: "How do I enroll in a course?",
      icon: BookOpen,
      color: "text-blue-400",
    },
    {
      text: "Tell me about certificates",
      icon: Trophy,
      color: "text-yellow-400",
    },
    { text: "What is React state?", icon: Sparkles, color: "text-purple-400" },
  ];

  // Initialize with a welcome message
  useEffect(() => {
    loadHistory();
  }, []);
  const loadHistory = async () => {
    try {
      const data = await getChatHistory();

      if (data.messages.length > 0) {
        const formattedMessages = data.messages.map(
          (msg: any, index: number) => ({
            id: index + 1,
            text: msg.content,
            sender: msg.role === "user" ? "user" : "bot",
            timestamp: new Date(msg.createdAt),
          }),
        );

        setMessages(formattedMessages);
      } else {
        setMessages([
          {
            id: 1,
            text: `Hello! I'm Dafi, your AI Assistant at Darsfiy.
        I can help you understand coding concepts, summarize lessons, navigate the platform, answer your learning questions, and support you throughout your learning journey.
        What would you like to learn today?`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setIsTyping(true);

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const data = await askAI(text);

      const botMessage: Message = {
        id: Date.now() + 1,
        text:
          data.response || "I couldn't process your request. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I ran into an error connecting to the AI service. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const handlePromptClick = (text: string) => {
    sendMessage(text);
  };

  const clearChat = async () => {
    await clearChatHistory();
    setMessages([
      {
        id: Date.now(),
        text: "Chat cleared! How else can I assist you with your learning journey?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#4facfe]/30 relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.05)_0%,rgba(0,0,0,0)_70%)] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(118,75,162,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 relative z-10">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-[0.65rem] font-black uppercase tracking-widest text-[#00f2fe] mb-4">
              <Cpu size={12} className="animate-spin-slow" />
              Llama 3.1 Powered
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-linear-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              AI Learning Partner
            </h1>
            <p className="text-[#888] text-sm mt-2 max-w-xl">
              Ask coding questions, learn complex algorithms, outline study
              roadmaps, or translate code instantly.
            </p>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-xs font-semibold text-white/60 hover:text-red-400 transition-all cursor-pointer"
          >
            <Trash2 size={14} />
            Clear Chat
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Panel - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Layers className="text-[#00f2fe] size-5" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-white/90">
                  Capabilities
                </h3>
              </div>
              <ul className="space-y-4 text-xs text-white/60 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Terminal
                    size={14}
                    className="text-blue-400 shrink-0 mt-0.5"
                  />
                  <span>Explain code snippets & fix errors</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BookOpen
                    size={14}
                    className="text-purple-400 shrink-0 mt-0.5"
                  />
                  <span>Recommend learning methods & plans</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Trophy
                    size={14}
                    className="text-yellow-400 shrink-0 mt-0.5"
                  />
                  <span>Answer questions about platform certificates</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-linear-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-24 h-24 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/30 transition-all"></div>
              <h4 className="font-extrabold text-sm mb-2 text-white/90 flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-400 animate-pulse" />
                Interactive Help
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                You can write code directly into the chat and ask the assistant
                to review it or suggest styling improvements.
              </p>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3 h-[680px] flex flex-col rounded-[2.5rem] bg-white/2 border border-white/5 overflow-hidden backdrop-blur-xl relative shadow-2xl">
            {/* Glow backing */}
            <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Chat Header */}
            <div className="px-8 py-5 border-b border-white/5 bg-white/3 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20 relative">
                  <Bot className="text-white" size={22} />
                  <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-emerald-500 border-2 border-[#08080c] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white/90">
                    Darsify Bot
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      Online & ready
                    </span>
                  </div>
                </div>
              </div>
              <div className="size-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40 hover:text-white/80 transition-colors cursor-pointer">
                <HelpCircle size={18} />
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10 relative z-10 bg-black/20"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`size-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      msg.sender === "bot"
                        ? "bg-blue-600/10 text-[#00f2fe] border border-blue-500/20"
                        : "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Bot size={18} />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div className="flex flex-col max-w-[75%] gap-1">
                    <div
                      className={`p-4.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "bot"
                          ? "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
                          : "bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-tr-none shadow-lg shadow-blue-500/10"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span
                      className={`text-[9px] font-bold text-white/30 px-1 ${
                        msg.sender === "user" ? "text-right" : ""
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="size-9 rounded-xl flex items-center justify-center shrink-0 shadow-md bg-blue-600/10 text-[#00f2fe] border border-blue-500/20 relative">
                    <Bot size={18} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-white/5 text-white/80 px-5 py-3.5 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2.5">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#00f2fe]/60">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input & Suggestions */}
            <div className="p-6 md:p-8 bg-white/3 border-t border-white/5 relative z-10">
              {/* Prompt Suggestions chips */}
              {messages.length === 1 && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2.5">
                    Suggested Prompts:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {suggestedPrompts.map((prompt) => {
                      const PromptIcon = prompt.icon;
                      return (
                        <button
                          key={prompt.text}
                          onClick={() => handlePromptClick(prompt.text)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-xs font-semibold text-white/80 transition-all cursor-pointer active:scale-95 group"
                        >
                          <PromptIcon
                            size={14}
                            className={`${prompt.color} group-hover:scale-110 transition-transform`}
                          />
                          <span>{prompt.text}</span>
                          <ArrowRight
                            size={10}
                            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-white/50"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00f2fe]/30 rounded-2xl py-4.5 pl-6 pr-16 outline-none transition-all text-sm placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-11 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[9px] text-white/15 text-center mt-4 uppercase tracking-[0.2em] font-bold">
                Powered by Darsify Intelligence AI
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
