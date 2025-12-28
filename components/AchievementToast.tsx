
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface AchievementToastProps {
  title: string;
  description: string;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ title, description, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/90 backdrop-blur-xl border border-amber-500/50 p-6 rounded-3xl shadow-2xl flex items-center gap-6 min-w-[300px]"
    >
      <div className="bg-amber-500 p-4 rounded-2xl text-slate-900 shadow-lg shadow-amber-500/20">
        <Trophy size={32} />
      </div>
      <div className="flex-grow text-right">
        <h4 className="text-amber-500 font-black text-xs uppercase tracking-widest mb-1">Achievement Unlocked</h4>
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      <button 
        onClick={onClose}
        className="text-slate-500 hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      
      {/* Self-close animation indicator */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        onAnimationComplete={onClose}
        className="absolute bottom-0 left-0 h-1 bg-amber-500 rounded-b-3xl"
      />
    </motion.div>
  );
};

export default AchievementToast;
