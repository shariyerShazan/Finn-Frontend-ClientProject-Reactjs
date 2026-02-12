/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import {
  Paperclip,
  Image as ImageIcon,
  Send,
  MoreVertical,
  X,
  Trash2,
  ShieldBan,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "me" | "partner";
  time: string;
  image?: string;
}

interface Props {
  activePartner: any;
}

const Chats = ({ activePartner }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! Is this available?",
      sender: "partner",
      time: "03:00 PM",
    },
    { id: 2, text: "Yes, it is!", sender: "me", time: "03:05 PM" },
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: selectedImage || undefined,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setSelectedImage(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activePartner.name}`}
            className="w-10 h-10 rounded-full border"
            alt=""
          />
          <div>
            <h3 className="text-sm font-semibold">{activePartner.name}</h3>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>
        </div>

        <div className="relative">
          <MoreVertical
            className="text-gray-400 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50 py-1">
              <button className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50">
                <ShieldBan size={14} /> Block User
              </button>
              <button className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-xs text-gray-600 hover:bg-gray-50">
                <Trash2 size={14} /> Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "me" ? "items-end" : "items-start"}`}
          >
            <span className="text-[10px] text-gray-400 mb-1">
              {m.sender === "me" ? "You" : activePartner.name} - {m.time}
            </span>
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                m.sender === "me"
                  ? "bg-[#0064AE] text-white rounded-tr-none"
                  : "bg-white border rounded-tl-none shadow-sm"
              }`}
            >
              {m.image && (
                <img
                  src={m.image}
                  alt="upload"
                  className="rounded-lg mb-2 max-h-48 w-full object-cover"
                />
              )}
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        {selectedImage && (
          <div className="relative inline-block mb-2">
            <img
              src={selectedImage}
              className="w-20 h-20 object-cover rounded-lg border shadow-md"
              alt="Preview"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 border rounded-xl px-3 py-1 shadow-sm">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageSelect}
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-blue-500 p-1"
          >
            <ImageIcon size={20} />
          </button>
          <button className="text-gray-400 hover:text-blue-500 p-1">
            <Paperclip size={20} />
          </button>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a message..."
            className="flex-1 py-3 px-2 text-sm outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-[#0064AE] cursor-pointer text-white p-2 px-4 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all"
          >
            <span className="hidden sm:inline text-xs font-medium">Send</span>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
