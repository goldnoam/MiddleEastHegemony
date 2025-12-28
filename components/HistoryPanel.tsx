
import React, { useState, useMemo } from 'react';
import { HistoryEntry, Language } from '../types';
import { Volume2, VolumeX, Download, FileText, ChevronLeft, ChevronRight, Search, Filter, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations';

interface HistoryPanelProps {
  history: HistoryEntry[];
  isOpen: boolean;
  onClose: () => void;
  onRead: (text: string) => void;
  isReading: boolean;
  language: Language;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, isOpen, onClose, onRead, isReading, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [turnFilter, setTurnFilter] = useState<string>('');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'peace' | 'war'>('all');
  const [isExporting, setIsExporting] = useState(false);

  const t = translations[language];
  const isRtl = language === 'he';

  const getOutcomeCategory = (entry: HistoryEntry): 'peace' | 'war' | 'other' => {
    const text = (entry.scenarioTitle + entry.resultText + entry.choiceLabel).toLowerCase();
    const peaceKeywords = ['שלום', 'הסכם', 'דיפלומטי', 'שיתוף', 'peace', 'agreement', 'treaty', 'cooperation', 'חלוצי'];
    const warKeywords = ['מלחמה', 'תקיפה', 'צבאי', 'קרב', 'איום', 'war', 'attack', 'military', 'battle', 'threat', 'נשק', 'חימוש'];

    if (peaceKeywords.some(kw => text.includes(kw))) return 'peace';
    if (warKeywords.some(kw => text.includes(kw))) return 'war';
    return 'other';
  };

  const filteredHistory = useMemo(() => {
    return history.filter(entry => {
      const matchesSearch = 
        entry.scenarioTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.scenarioDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTurn = turnFilter === '' || entry.turn === parseInt(turnFilter);
      
      const outcomeCategory = getOutcomeCategory(entry);
      const matchesOutcome = 
        outcomeFilter === 'all' || 
        (outcomeFilter === 'peace' && outcomeCategory === 'peace') ||
        (outcomeFilter === 'war' && outcomeCategory === 'war');

      return matchesSearch && matchesTurn && matchesOutcome;
    });
  }, [history, searchTerm, turnFilter, outcomeFilter]);

  const exportHistory = async () => {
    if (history.length === 0) return;
    
    setIsExporting(true);
    // Simulate short processing delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));

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
    setIsExporting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div 
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`relative w-full max-w-lg bg-slate-900 border-slate-800 shadow-2xl h-full flex flex-col ${isRtl ? 'border-l' : 'border-r'}`}
          >
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
                  {t.archive}
                  <FileText className="w-5 h-5 text-amber-500" />
                </h2>
              </div>
              
              {history.length > 0 && (
                <button 
                  onClick={exportHistory}
                  disabled={isExporting}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-amber-500/10 min-w-[100px] justify-center"
                >
                  {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download size={14} />}
                  {isExporting ? t.ui.exporting : (isRtl ? 'ייצוא' : 'Export')}
                </button>
              )}
            </div>

            {/* Search & Filter Controls */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/30 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.ui.search}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-10 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <select 
                    value={outcomeFilter}
                    onChange={(e) => setOutcomeFilter(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500/50 appearance-none text-slate-400"
                  >
                    <option value="all">{t.ui.outcomeAll}</option>
                    <option value="peace">{t.ui.outcomePeace}</option>
                    <option value="war">{t.ui.outcomeWar}</option>
                  </select>
                </div>
                <div className="w-24">
                  <input 
                    type="number"
                    value={turnFilter}
                    onChange={(e) => setTurnFilter(e.target.value)}
                    placeholder={t.ui.turn}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500/50 text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {filteredHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50 text-center">
                  <FileText className="w-16 h-16 stroke-1" />
                  <p className="font-bold tracking-wider max-w-[200px]">
                    {history.length === 0 ? (isRtl ? 'טרם התקבלו החלטות' : 'No decisions yet') : (isRtl ? 'לא נמצאו תוצאות לחיפוש' : 'No results match your search')}
                  </p>
                </div>
              ) : (
                filteredHistory.map((entry, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${entry.turn}-${index}`} 
                    className={`relative group ${isRtl ? 'text-right' : 'text-left'}`}
                  >
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
                            >
                              {isReading ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>
                            <span className="text-[10px] font-black text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest">{t.turn} {entry.turn}</span>
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
                      
                      <div className="relative z-10 mt-1.5 flex-shrink-0">
                        <div className="w-9 h-9 bg-slate-950 border-2 border-slate-700 rounded-xl flex items-center justify-center text-xs font-black text-slate-400 group-hover:border-amber-500 group-hover:text-amber-500 transition-all shadow-xl group-hover:rotate-12">
                          {entry.turn}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
              {isRtl ? 'תיעוד היסטורי של הגמוניה אזורית' : 'Historical Record of Regional Hegemony'}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
