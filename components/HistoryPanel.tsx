
import React, { useState, useMemo } from 'react';
import { HistoryEntry, Language, Achievement } from '../types';
import { Volume2, VolumeX, Download, FileText, ChevronLeft, ChevronRight, Search, Trophy, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations';

interface HistoryPanelProps {
  history: HistoryEntry[];
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
  onRead: (text: string) => void;
  isReading: boolean;
  language: Language;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, achievements, isOpen, onClose, onRead, isReading, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'history' | 'achievements'>('history');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'peace' | 'war'>('all');
  const [isExporting, setIsExporting] = useState(false);

  const t = translations[language];
  const isRtl = language === 'he';

  const getOutcomeCategory = (entry: HistoryEntry): 'peace' | 'war' | 'other' => {
    const text = (entry.scenarioTitle + entry.resultText + entry.choiceLabel).toLowerCase();
    const peaceKeywords = isRtl ? ['שלום', 'הסכם', 'דיפלומטי', 'שיתוף'] : ['peace', 'agreement', 'treaty', 'cooperation'];
    const warKeywords = isRtl ? ['מלחמה', 'תקיפה', 'צבאי', 'קרב', 'איום'] : ['war', 'attack', 'military', 'battle', 'threat'];

    if (peaceKeywords.some(kw => text.includes(kw))) return 'peace';
    if (warKeywords.some(kw => text.includes(kw))) return 'war';
    return 'other';
  };

  const filteredHistory = useMemo(() => {
    return history.filter(entry => {
      const matchesSearch = 
        entry.scenarioTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.scenarioDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const outcomeCategory = getOutcomeCategory(entry);
      const matchesOutcome = 
        outcomeFilter === 'all' || 
        (outcomeFilter === 'peace' && outcomeCategory === 'peace') ||
        (outcomeFilter === 'war' && outcomeCategory === 'war');

      return matchesSearch && matchesOutcome;
    });
  }, [history, searchTerm, outcomeFilter]);

  const exportHistory = async () => {
    if (history.length === 0) return;
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    let content = `MIDDLE EAST HEGEMONY - GEOPOLITICAL ARCHIVE\n==========================================\n\n`;
    history.forEach((entry) => {
      content += `TURN ${entry.turn}: ${entry.scenarioTitle}\nISSUE: ${entry.scenarioDescription}\nDECISION: ${entry.choiceLabel}\nRESULT: ${entry.resultText}\n------------------------------------------\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hegemony_Archive.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setIsExporting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            className={`relative w-full max-w-lg bg-slate-900 border-slate-800 shadow-2xl h-full flex flex-col ${isRtl ? 'border-l' : 'border-r'}`}
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                  {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                </button>
                <h2 className="text-xl font-bold text-amber-100 flex items-center gap-2">
                  {t.archive}
                </h2>
              </div>
              <button onClick={exportHistory} disabled={isExporting} className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2">
                {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                {isRtl ? 'ייצוא' : 'Export'}
              </button>
            </div>

            <div className="flex border-b border-slate-800 bg-slate-900/50">
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'history' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {isRtl ? 'היסטוריה' : 'History'}
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'achievements' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {isRtl ? 'הישגים' : 'Achievements'}
              </button>
            </div>

            {activeTab === 'history' ? (
              <>
                <div className="p-4 border-b border-slate-800 bg-slate-900/30 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t.ui.search} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-10 text-sm focus:outline-none" />
                  </div>
                  <select value={outcomeFilter} onChange={(e) => setOutcomeFilter(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs appearance-none text-slate-400">
                    <option value="all">{t.ui.outcomeAll}</option>
                    <option value="peace">{t.ui.outcomePeace}</option>
                    <option value="war">{t.ui.outcomeWar}</option>
                  </select>
                </div>
                <div className="flex-grow overflow-y-auto p-6 space-y-10">
                  {filteredHistory.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                      <FileText size={64} className="mb-4" />
                      <p className="font-bold">{isRtl ? 'אין נתונים' : 'No entries'}</p>
                    </div>
                  ) : (
                    filteredHistory.map((entry, idx) => (
                      <div key={idx} className="relative group text-right">
                        <div className="flex items-center gap-4 mb-2">
                           <span className="bg-slate-800 text-[10px] px-2 py-1 rounded text-slate-500 uppercase tracking-widest">{t.turn} {entry.turn}</span>
                           <h3 className="text-lg font-black text-white">{entry.scenarioTitle}</h3>
                        </div>
                        <div className="bg-slate-800/40 p-5 rounded-3xl border border-slate-800 space-y-4">
                           <p className="text-slate-400 text-sm">{entry.scenarioDescription}</p>
                           <div className="pt-3 border-t border-slate-700/50">
                             <p className="text-blue-400 text-sm font-bold">{isRtl ? 'החלטת:' : 'Chose:'} {entry.choiceLabel}</p>
                             <p className="text-slate-300 text-sm mt-1">{entry.resultText}</p>
                           </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 gap-4">
                {Object.keys(t.achievementList).map(id => {
                  const data = t.achievementList[id];
                  const unlocked = achievements.find(a => a.id === id);
                  return (
                    <div key={id} className={`p-5 rounded-3xl border transition-all ${unlocked ? 'bg-amber-500/10 border-amber-500/50 shadow-lg' : 'bg-slate-800/20 border-slate-800 opacity-40 grayscale'}`}>
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl ${unlocked ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-600'}`}>
                          <Trophy size={24} />
                        </div>
                        <div className="text-right flex-grow">
                          <h4 className={`font-black text-lg ${unlocked ? 'text-white' : 'text-slate-400'}`}>{data.title}</h4>
                          <p className="text-slate-500 text-sm">{data.desc}</p>
                          {unlocked?.unlockedAt && (
                            <p className="text-[10px] text-amber-500 font-bold mt-2 uppercase">Unlocked Turn {unlocked.unlockedAt}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              {isRtl ? 'תיעוד היסטורי של הגמוניה אזורית' : 'Historical Record of Regional Hegemony'}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
