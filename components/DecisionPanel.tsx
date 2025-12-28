
import React from 'react';
import { Choice } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DecisionPanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  isLoading: boolean;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({ choices, onSelect, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          // Strategic Skeleton loading state
          [1, 2, 3].map((i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-44 bg-slate-800/20 rounded-3xl overflow-hidden border border-slate-700/30 flex flex-col items-center justify-center relative p-6"
            >
              {/* Scanline Effect */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-amber-500/20 blur-sm z-10"
              />
              
              <div className="w-3/4 h-4 bg-slate-700/40 rounded-full mb-4 animate-pulse" />
              <div className="w-full h-2 bg-slate-700/20 rounded-full mb-2 animate-pulse" />
              <div className="w-5/6 h-2 bg-slate-700/20 rounded-full mb-2 animate-pulse" />
              <div className="w-4/6 h-2 bg-slate-700/20 rounded-full animate-pulse" />
              
              <div className="absolute bottom-4 right-6 text-[8px] font-mono text-amber-500/30 tracking-widest uppercase">
                Analyzing Option 0{i}
              </div>
            </motion.div>
          ))
        ) : (
          choices.map((choice) => (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              disabled={isLoading}
              onClick={() => onSelect(choice)}
              className="group relative bg-slate-800/40 backdrop-blur-md hover:bg-slate-700/60 p-6 rounded-3xl border border-slate-700/50 hover:border-amber-500/40 transition-all duration-300 text-right flex flex-col items-end disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 active:scale-95 min-h-[160px]"
            >
              {/* Action indicator icon */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                <div className="bg-amber-500/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-amber-100 group-hover:text-amber-400 transition-colors">
                {choice.label}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                {choice.description}
              </p>
              
              {/* Subtle bottom highlight on hover */}
              <div className="absolute bottom-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/30 transition-all duration-500" />
            </motion.button>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default DecisionPanel;
