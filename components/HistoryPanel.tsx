
import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryPanelProps {
  history: HistoryEntry[];
  isOpen: boolean;
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col animate-in slide-in-from-left duration-300">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-amber-100 flex items-center gap-2">
            ארכיון החלטות
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>טרם התקבלו החלטות גורליות</p>
            </div>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="relative text-right group">
                {/* Timeline connector */}
                {index < history.length - 1 && (
                  <div className="absolute top-8 right-[1.125rem] w-px h-[calc(100%+2rem)] bg-slate-800 group-hover:bg-amber-500/30 transition-colors" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-tighter">תור {entry.turn}</span>
                      <h3 className="text-lg font-bold text-slate-200 group-hover:text-amber-100 transition-colors">{entry.scenarioTitle}</h3>
                    </div>
                    
                    <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 group-hover:border-slate-700 transition-all shadow-sm">
                      <p className="text-amber-500 text-sm font-bold mb-2">בחירה: {entry.choiceLabel}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{entry.resultText}</p>
                    </div>
                  </div>
                  
                  {/* Point icon */}
                  <div className="relative z-10 mt-1.5">
                    <div className="w-9 h-9 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center text-slate-400 group-hover:border-amber-500 group-hover:text-amber-500 transition-all shadow-lg">
                      {entry.turn}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-600">
          היסטוריה זו מתעדת את הדרך שלך לעוצמה אזורית
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
