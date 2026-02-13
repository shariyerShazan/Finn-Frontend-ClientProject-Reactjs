"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  CheckCheck,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  text?: string;
  sender: "me" | "owner";
  time: string;
  image?: string;
}

const ChatWithItemOwner = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Let me know if you need more details.",
      sender: "owner",
      time: "03:07 PM",
    },
    {
      id: 2,
      text: "Great. Could you tell me how many miles it has?",
      sender: "me",
      time: "03:07 PM",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedImage]); // Scroll when image preview opens too

  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedImage) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue || undefined,
      image: selectedImage || undefined,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setSelectedImage(null);
  };

  return (
    /* 1. Fixed height container with flex-col */
    <div className="border rounded-3xl overflow-hidden bg-white shadow-xl flex flex-col h-[520px] max-h-[520px]">
      {/* --- Header: shrink-0 ensures it stays at top --- */}
      <div className="p-4 border-b bg-white flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-green-500 p-0.5">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JO</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-sm leading-none">John123</h3>
            <span className="text-[10px] text-green-500 font-medium">
              Online
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-400">
          <MoreVertical size={20} />
        </Button>
      </div>

      {/* --- Messages Area: flex-1 + min-h-0 allows it to scroll properly --- */}
      <div className="flex-1 min-h-0 bg-[#f0f2f5]">
        <ScrollArea className="h-full px-4">
          <div className="py-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl shadow-sm relative animate-in fade-in slide-in-from-bottom-1 ${
                    msg.sender === "me"
                      ? "bg-[#d9fdd3] text-slate-800 rounded-tr-none"
                      : "bg-white text-slate-800 rounded-tl-none"
                  }`}
                >
                  {msg.image && (
                    <div className="mb-1 overflow-hidden rounded-lg">
                      <img
                        src={msg.image}
                        alt="content"
                        className="max-h-60 w-full object-cover"
                      />
                    </div>
                  )}
                  {msg.text && (
                    <p className="text-xs leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  )}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-slate-400 italic">
                      {msg.time}
                    </span>
                    {msg.sender === "me" && (
                      <CheckCheck size={12} className="text-[#53bdeb]" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Anchor for scrolling */}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>

      {/* --- Footer / Input Section: shrink-0 keeps it at the bottom --- */}
      <div className="bg-white border-t shrink-0">
        {/* Image Preview Drawer */}
        {selectedImage && (
          <div className="p-3 bg-slate-50 border-b animate-in slide-in-from-bottom-2 duration-200">
            <div className="relative inline-block">
              <img
                src={selectedImage}
                className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-md"
                alt="preview"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
              >
                <X size={12} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        <div className="p-3 flex items-center gap-2">
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedImage(URL.createObjectURL(file));
            }}
            accept="image/*"
          />

          <div className="flex gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-500 rounded-full hover:bg-slate-100"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={22} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-500 rounded-full hover:bg-slate-100"
            >
              <Paperclip size={20} />
            </Button>
          </div>

          <Input
            placeholder="Type a message..."
            className="flex-1 bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-[#0064AE] rounded-full h-11 text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-[#0064AE] hover:bg-[#004f8b] text-white rounded-full h-11 w-11 shrink-0 shadow-md active:scale-95 transition-all"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithItemOwner;
