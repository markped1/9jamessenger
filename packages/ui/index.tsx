import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, className = '', variant = 'primary' }: any) => {
  const variants: any = {
    primary: 'premium-gradient text-white',
    secondary: 'glass text-primary',
    ghost: 'bg-transparent border-none text-text hover:bg-gray-100',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-semibold transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const GlassContainer = ({ children, className = '' }: any) => (
  <div className={`glass rounded-3xl p-6 ${className}`}>
    {children}
  </div>
);

export const Avatar = ({ src, name, size = 'md' }: any) => {
  const sizes: any = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 border-primary-light shadow-sm bg-gray-200`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-primary font-bold">
          {name?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};
