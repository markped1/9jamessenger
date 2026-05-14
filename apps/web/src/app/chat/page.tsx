'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, GlassContainer, Avatar } from '@9ja/ui';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Plus, 
  Image as ImageIcon, 
  Mic, 
  Phone, 
  Video,
  Smile
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // 1. Fetch existing messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };

    fetchMessages();

    // 2. Subscribe to real-time changes
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      chat_id: activeChat || 'general',
      sender_id: 'web_user_1',
      content: inputText,
      type: 'text',
    };

    const { error } = await supabase.from('messages').insert([newMessage]);
    if (error) console.error('Error sending message:', error);
    
    setInputText('');
  };

  const mockChats = [
    { id: '1', name: 'Thompson Obosa', lastMessage: 'The design looks great!', time: '10:30 AM', unread: 2 },
    { id: '2', name: 'Lagos Tech Hub', lastMessage: 'Meeting at 2 PM today.', time: '9:15 AM', unread: 0 },
    { id: '3', name: 'Amaka (Business)', lastMessage: 'Order confirmed.', time: 'Yesterday', unread: 0 },
  ];

  return (
    <div className="h-screen flex bg-[#f0f4f1] p-4 gap-4 overflow-hidden">
      {/* Sidebar */}
      <GlassContainer className="w-80 flex flex-col p-0 overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">Chats</h2>
          <div className="flex gap-2">
            <Button variant="ghost" className="p-2 h-auto rounded-full">
              <Plus size={20} className="text-gray-500" />
            </Button>
            <Button variant="ghost" className="p-2 h-auto rounded-full">
              <MoreVertical size={20} className="text-gray-500" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-gray-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {mockChats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: 'rgba(0, 135, 81, 0.05)' }}
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 flex gap-3 cursor-pointer transition-colors ${
                activeChat === chat.id ? 'bg-primary/5' : ''
              }`}
            >
              <Avatar name={chat.name} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                  <span className="text-[10px] text-gray-400 uppercase">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </GlassContainer>

      {/* Main Chat Window */}
      <GlassContainer className="flex-1 flex flex-col p-0 overflow-hidden relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-3">
                <Avatar name="Thompson Obosa" />
                <div>
                  <h3 className="font-semibold text-sm">Thompson Obosa</h3>
                  <span className="text-[10px] text-primary flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-red-500'}`} />
                    {isConnected ? 'Online' : 'Reconnecting...'}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" className="p-2 h-auto rounded-full">
                  <Phone size={20} className="text-primary" />
                </Button>
                <Button variant="ghost" className="p-2 h-auto rounded-full">
                  <Video size={20} className="text-primary" />
                </Button>
                <Button variant="ghost" className="p-2 h-auto rounded-full">
                  <MoreVertical size={20} className="text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar pattern-bg">
              {messages.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm italic">
                  No messages yet. Say hello!
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_id === 'web_user_1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${
                      msg.sender_id === 'web_user_1'
                        ? 'premium-gradient text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span
                      className={`text-[10px] mt-2 block ${
                        msg.sender_id === 'web_user_1' ? 'text-white/70 text-right' : 'text-gray-400'
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="p-2 h-auto rounded-full">
                  <Plus size={22} className="text-gray-400" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full bg-gray-100 border-none rounded-2xl py-3 px-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <Smile className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} />
                </div>
                <Button variant="ghost" className="p-2 h-auto rounded-full">
                  <Mic size={22} className="text-gray-400" />
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-3 h-auto rounded-xl"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-4">
              <img src="/branding/logo.png" alt="Logo" className="w-16 h-16 opacity-20" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome to 9ja Messenger</h2>
            <p className="text-gray-500 max-w-sm mt-2">
              Select a chat to start messaging or create a new community to connect with others.
            </p>
          </div>
        )}
      </GlassContainer>
    </div>
  );
}
