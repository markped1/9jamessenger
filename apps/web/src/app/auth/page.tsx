'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@9ja/ui';
import { COUNTRIES } from '../../data/countries';

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  const handleNext = () => {
    if (phoneNumber.length < 7) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Verifying ${country.code} ${phoneNumber}... \nAn OTP has been sent!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-end relative overflow-hidden bg-white font-sans">
      {/* Real Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/branding/background.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
      </div>

      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-4">
        <div className="w-[120px] h-[120px] mb-6 drop-shadow-2xl">
           <img src="/branding/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-4xl font-black text-[#00a86b] drop-shadow-sm tracking-tight">9ja Messenger</h1>
        <p className="text-[#00a86b] mt-2 font-bold tracking-wide drop-shadow-sm">Connect. Chat. Belong.</p>
      </div>

      {/* Main Container Card */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-lg mx-auto bg-white rounded-t-[32px] md:rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 md:p-10 z-20"
      >
        <div className="space-y-6 md:space-y-8">
          <p className="text-xs md:text-sm text-[#004d30] font-medium leading-relaxed">
            Verify your phone number to get a verification code. <span className="font-bold text-[#008751]">Carrier charges may apply.</span>
          </p>

          <div className="space-y-4 md:space-y-6">
            {/* Country Selector */}
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-bold text-[#004d30] uppercase tracking-widest ml-1">Country</label>
              <button 
                type="button"
                onClick={() => setShowCountryModal(true)}
                className="w-full flex items-center gap-3 md:gap-4 bg-[#f0f9f4] border border-[#008751]/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 cursor-pointer hover:bg-[#e0f2e9] hover:border-primary/30 transition-all outline-none"
              >
                <div className="w-8 h-5 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                  <img 
                    src={`https://flagcdn.com/w40/${country.iso}.png`} 
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="flex-1 font-semibold text-gray-700 text-sm md:text-base text-left">{country.name}</span>
                <span className="text-primary font-bold text-sm md:text-base">{country.code}</span>
                <ChevronDown size={18} className="text-primary" />
              </button>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-bold text-[#004d30] uppercase tracking-widest ml-1">Phone Number</label>
              <div className="flex items-center gap-3 md:gap-4 bg-[#f0f9f4] border border-[#008751]/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus-within:border-primary/40 transition-all">
                <span className="text-primary font-bold text-base md:text-lg">{country.code}</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="800 000 0000"
                  className="flex-1 bg-transparent border-none text-base md:text-lg font-bold text-primary placeholder-primary/20 focus:outline-none w-full"
                />
                {phoneNumber && (
                  <button 
                    type="button"
                    onClick={() => setPhoneNumber('')}
                    className="p-1 hover:bg-primary/5 rounded-full transition-colors"
                  >
                    <X size={18} className="text-primary" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleNext}
            disabled={phoneNumber.length < 7 || loading}
            className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-bold flex items-center justify-center gap-2 group shadow-xl transition-all ${
              loading ? 'opacity-70 cursor-not-allowed' : 'bg-[#00663d] hover:bg-[#004d30]'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner /> Sending...
              </span>
            ) : (
              <>
                Next <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-[11px] md:text-[13px] text-gray-400 max-w-[240px] md:max-w-[280px] mx-auto leading-relaxed">
              By continuing, you agree to our <span className="text-primary cursor-pointer font-bold">Terms of Service</span> and <span className="text-primary cursor-pointer font-bold">Privacy Policy.</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Country Selection Modal */}
      <AnimatePresence>
        {showCountryModal && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-t-[32px] md:rounded-[32px] p-6 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-[#004d30]">Select Country</h2>
                <button type="button" onClick={() => setShowCountryModal(false)}>
                  <X size={24} className="text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Search Box */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Search country or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f0f9f4] border border-[#008751]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40 font-semibold"
                />
              </div>

              <div className="overflow-y-auto flex-1 space-y-2 pr-2 custom-scrollbar">
                {filteredCountries.map((c) => (
                  <button
                    key={`${c.name}-${c.code}`}
                    onClick={() => {
                      setCountry(c);
                      setShowCountryModal(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#f0f9f4] transition-colors text-left border border-transparent hover:border-[#008751]/10 group"
                  >
                    <div className="w-10 h-6 flex-shrink-0 overflow-hidden rounded-md shadow-sm group-hover:scale-110 transition-transform">
                      <img 
                        src={`https://flagcdn.com/w80/${c.iso}.png`} 
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="flex-1 font-bold text-gray-700">{c.name}</span>
                    <span className="text-primary font-bold">{c.code}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Professional Footer */}
      <div className="w-full text-center py-8 z-20">
        <div className="text-[10px] font-bold text-[#008751]/60 tracking-[0.2em] uppercase">
          Designed by <span className="text-[#008751]">Thompson Obosa</span>
        </div>
      </div>
    </div>
  );
}

// Icons and Helpers
const ChevronDown = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const X = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18M6 6l12 12"/></svg>
);
const ArrowRight = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
