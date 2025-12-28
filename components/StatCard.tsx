
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
  
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 shadow-lg transition-all hover:border-slate-500 cursor-help overflow-visible">
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 p-3 bg-slate-900 text-slate-200 text-xs rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-2xl scale-95 group-hover:scale-100 origin-bottom">
        <p className="leading-relaxed text-right">{description}</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-bold tracking-tight">{label}</span>
        <div className={`${color} transition-transform group-hover:rotate-12 duration-300`}>{icon}</div>
      </div>
      
      {/* Progress Bar Track */}
      <div className="relative h-2.5 w-full bg-slate-950/80 rounded-full overflow-hidden border border-slate-800 shadow-inner">
        {/* The Filling Bar with 1-second Transition */}
        <div 
          className={`absolute top-0 left-0 h-full transition-[width] duration-1000 ease-in-out ${bgColorClass} relative`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        >
          {/* Subtle Shine/Shimmer overlay animation */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          
          {/* Glow effect at the tip of the bar for visibility */}
          <div className="absolute right-0 top-0 h-full w-[2px] bg-white/40 blur-[1px]" />
        </div>
      </div>
      
      <div className="mt-2 text-right">
        <span className="text-2xl font-black tabular-nums tracking-tighter transition-colors duration-500">{value}</span>
        <span className="text-slate-600 text-xs font-bold ml-1 italic">/ 100</span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default StatCard;
