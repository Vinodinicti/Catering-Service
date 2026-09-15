import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const defaultPhone = "919840012345";

  const presetTopics = [
    "I would like a quote for Royal Wedding Catering 💍",
    "I want to discuss a Corporate South Indian Feast 💼",
    "I have an inquiry for a Sasthiabdhapoorthi / Birthday 🎂",
    "Can you send the complete South Indian food menu PDF? 📜"
  ];

  const handleSendWhatsApp = (customMsg) => {
    const textToSend = customMsg || message || "Hello Royal Table Catering team! I would like to inquire about your catering services.";
    const url = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded WhatsApp Chat Widget */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-palette-laceBorder rounded-3xl shadow-2xl overflow-hidden animate-fadeIn transition-all duration-300">
          
          {/* Header */}
          <div className="bg-palette-eggplant p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-palette-shamrock flex items-center justify-center relative shadow-sm">
                <MessageCircle className="w-6 h-6 text-white fill-white" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-palette-eggplant rounded-full" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Royal Table Concierge</h4>
                <p className="text-[11px] text-palette-lilac flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-palette-shamrock" />
                  <span>Online • South Indian Cuisine Team</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto bg-palette-lace text-sm">
            <div className="bg-white text-palette-eggplant p-3 rounded-2xl rounded-tl-none border border-palette-laceBorder leading-relaxed shadow-sm text-xs">
              <p className="font-extrabold text-palette-eggplant mb-1">Namaste from The Royal Table! 🙏</p>
              How can our executive culinary team assist you today? Select a topic below or type your request:
            </div>

            {/* Quick Topic Chips */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-palette-eggplant/60">Quick Topics:</p>
              {presetTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWhatsApp(topic)}
                  className="w-full text-left text-xs bg-white hover:bg-palette-lilacLight hover:border-palette-shamrock text-palette-eggplant font-semibold p-2.5 rounded-xl border border-palette-laceBorder transition-all flex items-center justify-between group shadow-sm"
                >
                  <span>{topic}</span>
                  <Send className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-palette-shamrock transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input & Send */}
          <div className="p-3 bg-white border-t border-palette-laceBorder flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your catering query..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp()}
              className="flex-1 bg-palette-lace border border-palette-laceBorder rounded-xl px-3 py-2 text-xs text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
            />
            <button
              onClick={() => handleSendWhatsApp()}
              className="p-2.5 rounded-xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Small Circular Toggle Button in Corner */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Royal Table Concierge"
        aria-label="WhatsApp Concierge Chat"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-palette-shamrock hover:bg-palette-shamrockDark text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/60"
      >
        {/* Subtle Online Pulse Badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white text-white group-hover:scale-105 transition-transform" />
      </button>

    </div>
  );
}
