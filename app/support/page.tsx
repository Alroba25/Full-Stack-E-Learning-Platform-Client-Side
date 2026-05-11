"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { askAI } from "@/Lib";
import {
  Send,
  User,
  Bot,
  LifeBuoy,
  Search,
  ChevronRight,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSend = async (e: React.FormEvent) => {
    setIsTyping(true);
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {
      const data = await askAI(currentInput);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.log(error);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#4facfe]/30">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[0.7rem] font-bold uppercase tracking-widest text-blue-400 mb-6">
            <LifeBuoy size={12} />
            Support Center
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            How can we help?
          </h1>
          <div className="max-w-2xl mx-auto relative mt-10">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"
              size={20}
            />
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Quick Contact & Info */}
          <div className="lg:col-span-1 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">
              Quick Contact
            </h3>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                <Mail className="text-blue-500 mb-4" />
                <h4 className="font-bold mb-1">Email Us</h4>
                <p className="text-white/40 text-sm mb-4">
                  Response time: &lt; 24h
                </p>
                <a
                  href="mailto:support@darsify.com"
                  className="text-blue-400 font-semibold flex items-center gap-2 group-hover:underline"
                >
                  support@darsify.com
                  <ChevronRight size={14} />
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                <Phone className="text-purple-500 mb-4" />
                <h4 className="font-bold mb-1">Call Support</h4>
                <p className="text-white/40 text-sm mb-4">
                  Mon-Fri, 9am - 6pm EST
                </p>
                <span className="text-purple-400 font-semibold">
                  +1 (555) 123-4567
                </span>
              </div>
            </div>

            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30 pt-8">
              Common Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Payments",
                "Certificates",
                "Account Setup",
                "Mobile App",
                "Instructor Tools",
              ].map((topic) => (
                <button
                  key={topic}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 h-[700px] flex flex-col rounded-[2.5rem] bg-white/2 border border-white/5 overflow-hidden backdrop-blur-xl relative shadow-2xl">
            {/* Chat Header */}
            <div className="px-8 py-6 border-b border-white/5 bg-white/3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Bot className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">AI Assistant</h4>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <HelpCircle className="text-white/40" size={20} />
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                      msg.sender === "bot"
                        ? "bg-blue-600/20 text-blue-500 border border-blue-500/20"
                        : "bg-purple-600/20 text-purple-500 border border-purple-500/20"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Bot size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] p-5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "bot"
                        ? "bg-white/5 text-white/80 rounded-tl-none border border-white/10"
                        : "bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-600/10"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-2 font-bold opacity-30 ${msg.sender === "user" ? "text-right" : ""}`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <div className="size-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg bg-blue-600/20 text-blue-500 border border-blue-500/20 relative">
                    <Bot size={20} className="relative z-10" />
                    <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/60 animate-pulse">
                        Assistant is Typing...
                      </span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md text-white/80 px-6 py-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2 group shadow-xl shadow-blue-500/5">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-duration-[1s] [animation-delay:-0.3s] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-duration-[1s] [animation-delay:-0.15s] shadow-[0_0_8px_rgba(96,165,250,0.5)]"></span>
                        <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce animation-duration-[1s] shadow-[0_0_8px_rgba(147,197,253,0.5)]"></span>
                      </div>
                      <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden relative ml-2">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-8 bg-white/3 border-t border-white/5">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 outline-none focus:border-blue-500/50 transition-all text-[0.95rem]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-12 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={20} />
                </button>
              </form>
              <p className="text-[10px] text-white/20 text-center mt-4 uppercase tracking-[0.2em] font-bold">
                Powered by Darsify Intelligence
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
