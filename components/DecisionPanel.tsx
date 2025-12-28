
import React from 'react';
import { Choice, ChoiceImpact } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DecisionPanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  isLoading: boolean;
  statsLabels: Record<string, string>;
}

const ImpactTooltip = ({ impact, labels }: { impact: ChoiceImpact; labels: Record<string, string> }) => {
  const statEntries = [
    { key: 'military', value: impact.military },
    { key: 'diplomacy', value: impact.diplomacy },
    { key: 'territory', value: impact.territory },
    { key: 'economy', value: impact.economy },
  ].filter(s => s.value !== 0);

  if (statEntries.length === 0) return null;

  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-44 p-3 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 z-[70] backdrop-blur-xl border-t-amber-500/50">
      <div className="space-y-2">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center mb-2 border-b border-slate-800 pb-1">Expected Impact</p>
        {statEntries.map(s => (
          <div key={s.key} className="flex justify-between items-center gap-2">
            <span className="text-[9px] font-bold text-slate-400">{labels[s.key]}</span>
            <span className={`text-[11px] font-black tabular-nums ${s.value > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {s.value > 0 ? `+${s.value}` : s.value}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900/95"></div>
    </div>
  );
};

const DecisionPanel: React.FC<DecisionPanelProps> = ({ choices, onSelect, isLoading, statsLabels }) => {
  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
    hover: {
      scale: 1.03,
      borderColor: "rgba(245, 158, 11, 0.6)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.97 }
  };

  const glowVariants = {
    hover: {
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-44 bg-slate-800/20 rounded-3xl overflow-hidden border border-slate-700/30 flex flex-col items-center justify-center relative p-6"
            >
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
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
              onClick={() => onSelect(choice)}
              className="group relative bg-slate-800/40 backdrop-blur-md p-6 rounded-3xl border border-slate-700/50 transition-colors duration-300 text-right flex flex-col items-end disabled:opacity-50 disabled:cursor-not-allowed shadow-lg min-h-[160px] overflow-visible"
            >
              {/* Tooltip showing stat impacts */}
              <ImpactTooltip impact={choice.impact} labels={statsLabels} />

              {/* Clipped background elements */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div 
                  variants={glowVariants}
                  className="absolute inset-0 bg-amber-500 opacity-0 blur-2xl rounded-full"
                  style={{ margin: '-20%' }}
                />
                <motion.div 
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/60 transition-all duration-700" 
                />
              </div>

              {/* Content */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-10">
                <div className="bg-amber-500/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-amber-100 group-hover:text-amber-400 transition-colors relative z-10">
                {choice.label}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors relative z-10">
                {choice.description}
              </p>
            </motion.button>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default DecisionPanel;
