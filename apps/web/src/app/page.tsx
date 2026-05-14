'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, GlassContainer } from '@9ja/ui';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Real Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/branding/background.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="w-[120px] h-[120px] md:w-40 md:h-40 mx-auto flex items-center justify-center drop-shadow-2xl mb-6 md:mb-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
             <img src="/branding/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-[900] tracking-tight mb-4 md:mb-6 leading-tight text-[#004d30] drop-shadow-sm">
            Connect with <span className="text-gradient">9ja Messenger</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#004d30]/70 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed font-medium">
            The future of African communication. Experience real-time connectivity, multilingual AI, and world-class security.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <Link href="/auth" className="w-full md:w-auto">
              <Button className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 text-lg md:text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all">Get Started</Button>
            </Link>
            <Link href="/chat" className="w-full md:w-auto">
              <Button variant="secondary" className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 text-lg md:text-xl rounded-2xl border-2 border-[#008751]/20 text-[#008751] hover:bg-[#008751] hover:text-white font-bold shadow-sm">Open Chat</Button>
            </Link>
          </div>

          <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <FeatureCard title="E2E Encrypted" description="Privacy by design." />
            <FeatureCard title="African Modern" description="Culturally inspired UI." />
            <FeatureCard title="Multilingual AI" description="Chat in your dialect." />
          </div>
        </motion.div>
      </div>

      {/* Footer Area - Always at bottom, no overlap */}
      <div className="w-full text-center py-10 z-10">
        <div className="text-[10px] md:text-xs text-[#008751]/60 font-bold tracking-[0.2em] uppercase">
          Designed By <span className="text-[#008751] border-b border-[#008751]/20 pb-1">Thompson Obosa</span>
        </div>
      </div>
    </div>
    </>
  );
}

function FeatureCard({ title, description }: any) {
  return (
    <div className="group cursor-default">
      <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
