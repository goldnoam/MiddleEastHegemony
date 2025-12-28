
import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, description }) => {
  // Extract background color from text color class
  const bgColorClass = color.replace('text', 'bg');
  const isLow = value < 25;
  
  // Mapping of stat failure consequences for more context
  const getConsequence = (label: string) => {
    switch (label) {
      case "עוצמה צבאית": return "קריסת קווי ההגנה תוביל לכיבוש המדינה או להפיכה צבאית אלימה.";
      case "דיפלומטיה": return "בידוד בינלאומי מוחלט יגרור סנקציות משתקות ואובדן לגיטימציה.";
      case "טריטוריה": return "אובדן הריבונות יוביל להתפרקות לאומית ואובדן השליטה על משאבי טבע.";
      case "כלכלה": return "אינפלציה דוהרת ורעב המוני יגרמו להתקוממות אזרחית ונפילת המשטר.";
      default: return "אובדן משאב זה יערער את יציבות המדינה.";
    }
  };

  return (
    <div className={`group relative bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border ${isLow ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse-border' : 'border-slate-700/50'} shadow-lg transition-all hover:border-slate-500 cursor-help overflow-visible`}>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-60 p-4 bg-slate-900 text-slate-200 text-xs rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[70] shadow-2xl scale-95 group-hover:scale-100 origin-bottom">
        <div className="space-y-3">
          <p className="leading-relaxed text-right font-medium opacity-80">{description}</p>
          
          <div className="pt-2 border-t border-slate-800">
            <p className="text-red-400 font-bold text-[10px] uppercase mb-1 flex items-center justify-end gap-1">
              סכנת קריסה (0)
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            </p>
            <p className="text-slate-400 text-right leading-relaxed italic">{getConsequence(label)}</p>
          </div>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-bold tracking-tight">{label}</span>
        <div className={`${isLow ? 'text-red-500 animate-bounce' : color} transition-transform group-hover:rotate-12 duration-300`}>
          {isLow ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : icon}
        </div>
      </div>
      
      {/* Progress Bar Track */}
      <div className="relative h-2.5 w-full bg-slate-950/80 rounded-full overflow-hidden border border-slate-800 shadow-inner">
        <div 
          className={`absolute top-0 left-0 h-full transition-[width,background-color] duration-1000 ease-in-out ${isLow ? 'bg-red-600' : bgColorClass} relative`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          <div className="absolute right-0 top-0 h-full w-[2px] bg-white/40 blur-[1px]" />
        </div>
      </div>
      
      <div className="mt-2 text-right flex items-center justify-end gap-2">
        {isLow && <span className="text-[10px] font-black text-red-500 uppercase animate-pulse">קריטי!</span>}
        <span className={`text-2xl font-black tabular-nums tracking-tighter transition-colors duration-500 ${isLow ? 'text-red-500' : 'text-white'}`}>{value}</span>
        <span className="text-slate-600 text-xs font-bold ml-1 italic">/ 100</span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(239, 68, 68, 0.5); }
          50% { border-color: rgba(239, 68, 68, 0.1); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default StatCard;
