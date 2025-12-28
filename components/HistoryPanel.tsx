
import React from 'react';
import { HistoryEntry, Language } from '../types';
import { Volume2, VolumeX, Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryEntry[];
  isOpen: boolean;
  onClose: () => void;
  onRead: (text: string) => void;
  isReading: boolean;
  language: Language;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, isOpen, onClose, onRead, isReading, language }) => {
  if (!isOpen) return null;

  const isRtl = language === 'he';

  const exportHistory = () => {
    if (history.length === 0) return;

    let content = `MIDDLE EAST HEGEMONY - GEOPOLITICAL ARCHIVE\n`;
    content += `==========================================\n\n`;

    history.forEach((entry) => {
      content += `TURN ${entry.turn}: ${entry.scenarioTitle}\n`;
      content += `ISSUE: ${entry.scenarioDescription}\n`;
      content += `DECISION: ${entry.choiceLabel}\n`;
      content += `RESULT: ${entry.resultText}\n`;
      content += `------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hegemony_Archive_Turn_${history[0]?.turn || 0}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`relative w-full max-w-lg bg-slate-900 border-slate-800 shadow-2xl h-full flex flex-col animate-in duration-300 ${isRtl ? 'border-l slide-in-from-left' : 'border-r slide-in-from-right'}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
              aria-label="Close"
            >
              {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <h2 className="text-xl font-bold text-amber-100 flex items-center gap-2">
              {isRtl ? 'ארכיון החלטות גיאופוליטי' : 'Geopolitical Archive'}
              <FileText className="w-5 h-5 text-amber-500" />
            </h2>
          </div>
          
          {history.length > 0 && (
            <button 
              onClick={exportHistory}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-amber-500/10"
            >
              <Download size={14} />
              {isRtl ? 'ייצוא קובץ' : 'Export File'}
            </button>
          )}
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
              <FileText className="w-16 h-16 stroke-1" />
              <p className="font-bold tracking-wider">{isRtl ? 'טרם התקבלו החלטות גורליות' : 'No strategic decisions recorded yet'}</p>
            </div>
          ) : (
            history.map((entry, index) => (
              <div key={index} className={`relative group ${isRtl ? 'text-right' : 'text-left'}`}>
                {/* Timeline connector */}
                {index < history.length - 1 && (
                  <div className={`absolute top-8 w-px h-[calc(100%+2.5rem)] bg-slate-800 group-hover:bg-amber-500/30 transition-colors ${isRtl ? 'right-[1.125rem]' : 'left-[1.125rem]'}`} />
                )}
                
                <div className={`flex items-start gap-5 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const speechText = `${entry.scenarioTitle}. ${isRtl ? 'הבעיה' : 'Issue'}: ${entry.scenarioDescription}. ${isRtl ? 'הפתרון שנבחר' : 'Selected Solution'}: ${entry.choiceLabel}. ${isRtl ? 'תוצאה' : 'Result'}: ${entry.resultText}`;
                            onRead(speechText);
                          }}
                          className={`p-2 rounded-lg transition-all ${isReading ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-amber-500'}`}
                          title={isRtl ? "הקרא אירוע ותוצאה" : "Read Event & Result"}
                        >
                          <Volume2 size={14} />
                        </button>
                        <span className="text-[10px] font-black text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest">{isRtl ? 'תור' : 'Turn'} {entry.turn}</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-100 group-hover:text-amber-400 transition-colors">{entry.scenarioTitle}</h3>
                    </div>
                    
                    <div className="bg-slate-800/40 p-5 rounded-3xl border border-slate-800 group-hover:border-slate-700 transition-all shadow-sm space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest">{isRtl ? 'האירוע (הבעיה)' : 'THE ISSUE'}</p>
                        <p className="text-slate-300 text-sm leading-relaxed opacity-90">{entry.scenarioDescription}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-700/50 space-y-1">
                        <p className="text-[10px] font-black text-blue-500/50 uppercase tracking-widest">{isRtl ? 'החלטה ותוצאה (הפתרון)' : 'DECISION & RESULT'}</p>
                        <p className="text-blue-400 text-sm font-bold italic mb-1">
                          {isRtl ? 'החלטת:' : 'You chose:'} {entry.choiceLabel}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed">{entry.resultText}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Point icon */}
                  <div className="relative z-10 mt-1.5 flex-shrink-0">
                    <div className="w-9 h-9 bg-slate-950 border-2 border-slate-700 rounded-xl flex items-center justify-center text-xs font-black text-slate-400 group-hover:border-amber-500 group-hover:text-amber-500 transition-all shadow-xl group-hover:rotate-12">
                      {entry.turn}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
          {isRtl ? 'תיעוד היסטורי של הגמוניה אזורית' : 'Historical Record of Regional Hegemony'}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
