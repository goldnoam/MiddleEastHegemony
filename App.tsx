
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameStats, Scenario, Choice, GameState, HistoryEntry, Language, Theme, Achievement } from './types';
import { translations } from './translations';
import StatCard from './components/StatCard';
import DecisionPanel from './components/DecisionPanel';
import HistoryPanel from './components/HistoryPanel';
import AchievementToast from './components/AchievementToast';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Shield, Globe, Users, TrendingUp } from 'lucide-react';

const INITIAL_STATS: GameStats = {
  military: 50,
  diplomacy: 50,
  territory: 30,
  economy: 50,
  turn: 1
};

const VICTORY_TURN = 20;
const VICTORY_THRESHOLD = 60;
const SAVE_KEY = 'me_hegemony_save_v2';
const ACHIEVEMENT_KEY = 'me_hegemony_achievements_v1';

const langMap: Record<Language, string> = {
  he: 'he-IL',
  en: 'en-US',
  ru: 'ru-RU',
  zh: 'zh-CN',
  hi: 'hi-IN',
  de: 'de-DE',
  es: 'es-ES'
};

const DynamicBackground: React.FC<{ stats: GameStats; theme: Theme }> = ({ stats, theme }) => {
  const dominantStat = useMemo(() => {
    const { military, diplomacy, economy, territory } = stats;
    const max = Math.max(military, diplomacy, economy, territory);
    if (military === max) return 'military';
    if (diplomacy === max) return 'diplomacy';
    if (economy === max) return 'economy';
    return 'territory';
  }, [stats]);

  const bgConfig = {
    military: {
      color: theme === 'dark' ? 'rgba(153, 27, 27, 0.15)' : 'rgba(254, 226, 226, 0.5)',
      accent: 'rgba(239, 68, 68, 0.2)',
      pattern: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(239,68,68,0.03) 20px, rgba(239,68,68,0.03) 40px)'
    },
    diplomacy: {
      color: theme === 'dark' ? 'rgba(30, 58, 138, 0.15)' : 'rgba(219, 234, 254, 0.5)',
      accent: 'rgba(59, 130, 246, 0.2)',
      pattern: 'radial-gradient(circle at center, rgba(59,130,246,0.05) 0%, transparent 70%)'
    },
    economy: {
      color: theme === 'dark' ? 'rgba(120, 53, 15, 0.15)' : 'rgba(254, 243, 199, 0.5)',
      accent: 'rgba(245, 158, 11, 0.2)',
      pattern: 'linear-gradient(90deg, transparent 49%, rgba(245,158,11,0.02) 50%, transparent 51%)'
    },
    territory: {
      color: theme === 'dark' ? 'rgba(6, 78, 59, 0.15)' : 'rgba(209, 250, 229, 0.5)',
      accent: 'rgba(16, 185, 129, 0.2)',
      pattern: 'conic-gradient(from 180deg at 50% 50%, rgba(16,185,129,0.02) 0deg, transparent 90deg, rgba(16,185,129,0.02) 180deg)'
    }
  };

  const current = bgConfig[dominantStat];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-1000" style={{ backgroundColor: theme === 'dark' ? '#020617' : '#f8fafc' }}>
      <motion.div
        animate={{
          backgroundColor: current.color,
          backgroundImage: current.pattern
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 opacity-40"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-full h-full rounded-full blur-[120px]"
        style={{ backgroundColor: current.accent }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full rounded-full blur-[150px]"
        style={{ backgroundColor: current.accent }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [shownScenarioTitles, setShownScenarioTitles] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);
  
  const [language, setLanguage] = useState<Language>('he');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isGlitching, setIsGlitching] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Achievement state
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [activeToast, setActiveToast] = useState<{title: string, desc: string} | null>(null);

  const t = translations[language];
  const isRtl = language === 'he';

  const loadingMessages = useMemo(() => [
    t.ui.loading,
    isRtl ? "מנתח נתונים גיאופוליטיים..." : "Analyzing geopolitical data...",
    isRtl ? "מעבד דוחות מודיעין..." : "Processing intelligence reports...",
    isRtl ? "מסנכרן כוחות בשטח..." : "Synchronizing field assets...",
    isRtl ? "מחשב השלכות אסטרטגיות..." : "Calculating strategic impacts..."
  ], [t.ui.loading, isRtl]);

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSavedGame(true);
    
    const savedAchievements = localStorage.getItem(ACHIEVEMENT_KEY);
    if (savedAchievements) {
      try {
        setUnlockedAchievements(JSON.parse(savedAchievements));
      } catch (e) {
        console.error("Failed to load achievements", e);
      }
    }

    const savedTheme = localStorage.getItem('app_theme') as Theme;
    if (savedTheme) setTheme(savedTheme);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const readText = (text: string) => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language] || 'en-US';
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language));
    if (voice) utterance.voice = voice;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  const saveGame = () => {
    const gameData = { stats, gameState, currentScenario, shownScenarioTitles, lastResult, history, language };
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
    localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(unlockedAchievements));
    setHasSavedGame(true);
    setSaveStatus(t.ui.saving);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const loadGame = () => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setStats(data.stats);
        setGameState(data.gameState);
        setCurrentScenario(data.currentScenario);
        setShownScenarioTitles(data.shownScenarioTitles || []);
        setLastResult(data.lastResult);
        setHistory(data.history || []);
        if (data.language) setLanguage(data.language);
        setSaveStatus(t.ui.saving);
        setTimeout(() => setSaveStatus(null), 3000);
      } catch (e) {
        setError(t.ui.error);
      }
    }
  };

  const unlockAchievement = useCallback((id: string) => {
    if (unlockedAchievements.some(a => a.id === id)) return;
    const info = t.achievementList[id];
    if (!info) return;
    
    const newAchievement: Achievement = { id, ...info, unlockedAt: stats.turn };
    const newList = [...unlockedAchievements, newAchievement];
    setUnlockedAchievements(newList);
    localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(newList));
    setActiveToast({ title: info.title, desc: info.desc });
  }, [unlockedAchievements, t.achievementList, stats.turn]);

  const checkAchievements = useCallback((currentStats: GameStats) => {
    if (currentStats.military >= 80) unlockAchievement('mil_master');
    if (currentStats.diplomacy >= 80) unlockAchievement('dip_master');
    if (currentStats.economy >= 80) unlockAchievement('eco_master');
    if (currentStats.turn >= 10) unlockAchievement('survivor');
  }, [unlockAchievement]);

  const pickScenario = useCallback(() => {
    setLoading(true);
    setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    window.speechSynthesis.cancel();
    setIsReading(false);
    
    setTimeout(() => {
      const available = t.scenarios || [];
      if (available.length > 0) {
        let unshown = available.filter((s: Scenario) => !shownScenarioTitles.includes(s.title));
        
        // If all scenarios have been exhausted, reset the tracking for this session
        if (unshown.length === 0) {
          unshown = available;
          const randomIndex = Math.floor(Math.random() * unshown.length);
          const picked = unshown[randomIndex];
          setCurrentScenario(picked);
          setShownScenarioTitles([picked.title]);
        } else {
          const randomIndex = Math.floor(Math.random() * unshown.length);
          const picked = unshown[randomIndex];
          setCurrentScenario(picked);
          setShownScenarioTitles(prev => [...prev, picked.title]);
        }
        setGameState(GameState.PLAYING);
      } else {
        setError(t.ui.error);
      }
      setLoading(false);
    }, 1200);
  }, [shownScenarioTitles, t.scenarios, t.ui.error, loadingMessages]);

  const startGame = () => {
    setStats(INITIAL_STATS);
    setLastResult('');
    setHistory([]);
    setShownScenarioTitles([]);
    pickScenario();
  };

  const handleChoice = async (choice: Choice) => {
    if (!currentScenario) return;

    setIsGlitching(true);
    window.speechSynthesis.cancel();
    setIsReading(false);

    setTimeout(() => {
      setIsGlitching(false);
      const newStats: GameStats = {
        military: Math.min(100, Math.max(0, stats.military + choice.impact.military)),
        diplomacy: Math.min(100, Math.max(0, stats.diplomacy + choice.impact.diplomacy)),
        territory: Math.min(100, Math.max(0, stats.territory + choice.impact.territory)),
        economy: Math.min(100, Math.max(0, stats.economy + choice.impact.economy)),
        turn: stats.turn + 1
      };

      setHistory(prev => [{
        turn: stats.turn,
        scenarioTitle: currentScenario.title,
        scenarioDescription: currentScenario.description,
        choiceLabel: choice.label,
        resultText: choice.impact.narrativeResult
      }, ...prev]);

      setStats(newStats);
      setLastResult(choice.impact.narrativeResult);
      checkAchievements(newStats);
      
      if (newStats.military <= 0 || newStats.diplomacy <= 0 || newStats.economy <= 0) {
        setGameState(GameState.GAME_OVER);
      } else if (newStats.turn >= VICTORY_TURN && newStats.military >= VICTORY_THRESHOLD && newStats.diplomacy >= VICTORY_THRESHOLD && newStats.economy >= VICTORY_THRESHOLD) {
        setGameState(GameState.VICTORY);
        unlockAchievement('hegemon');
      } else {
        setGameState(GameState.RESULT);
      }
    }, 400);
  };

  const nextTurn = () => {
    pickScenario();
  };

  const handleShare = async () => {
    const achievementCount = unlockedAchievements.length;
    const text = `${t.title} - Turn ${stats.turn}/${VICTORY_TURN}\nMil: ${stats.military}, Dipl: ${stats.diplomacy}, Econ: ${stats.economy}\nAchievements: ${achievementCount}`;
    if (navigator.share) {
      await navigator.share({ title: t.title, text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(text);
      setSaveStatus(t.ui.saving);
      setTimeout(() => setSaveStatus(null), 2000);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <DynamicBackground stats={stats} theme={theme} />
      {isGlitching && <div className="glitch-overlay" />}
      
      <header className={`border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center ${theme === 'dark' ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-white/50'} backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg">ME</div>
          <h1 className="text-xl font-bold hidden md:block">{t.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center rounded-xl p-1 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200/50'}`}>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              {theme === 'dark' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" strokeWidth="2"/></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeWidth="2"/></svg>}
            </button>
            <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="bg-transparent text-xs font-bold px-2 focus:outline-none cursor-pointer border-l border-slate-700/30">
              {['he', 'en', 'ru', 'zh', 'hi', 'de', 'es'].map(lang => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
            </select>
          </div>
          {gameState !== GameState.START && (
            <div className="flex gap-2">
              <button onClick={() => setIsHistoryOpen(true)} className="text-xs font-semibold bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-lg border border-amber-500/20">{t.archive}</button>
              {gameState !== GameState.GAME_OVER && gameState !== GameState.VICTORY && (
                <button onClick={saveGame} className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">{t.save}</button>
              )}
            </div>
          )}
          <div className="hidden sm:block px-3 py-1 rounded-full text-xs font-semibold text-slate-500 border border-slate-700/30">{t.turn} {stats.turn}/{VICTORY_TURN}</div>
        </div>
      </header>

      <main className="flex-grow container mx-auto max-w-5xl p-6 flex flex-col">
        <AnimatePresence mode="wait">
          {gameState === GameState.START ? (
            <motion.div 
              key="start"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex-grow flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12"
            >
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{t.startTitle}</h2>
              <p className="opacity-70 text-lg mb-10 leading-relaxed">{t.startDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={startGame} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 px-12 rounded-full text-xl transition-all shadow-xl shadow-amber-500/20">{t.newGame}</button>
                {hasSavedGame && <button onClick={loadGame} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all border border-slate-700">{t.loadGame}</button>}
                <button 
                  onClick={() => readText(`${t.startTitle}. ${t.startDesc}`)}
                  className={`flex items-center justify-center gap-2 font-bold py-4 px-12 rounded-full text-xl transition-all border border-slate-700/50 backdrop-blur-md ${isReading ? 'bg-amber-500 text-slate-950' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/60'}`}
                >
                  {isReading ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  {t.ui.readStart}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="playing"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label={t.stats.military} value={stats.military} color="text-red-400" icon={<Shield className="w-5 h-5" />} description="" />
                <StatCard label={t.stats.diplomacy} value={stats.diplomacy} color="text-blue-400" icon={<Globe className="w-5 h-5" />} description="" />
                <StatCard label={t.stats.territory} value={stats.territory} color="text-emerald-400" icon={<Users className="w-5 h-5" />} description="" />
                <StatCard label={t.stats.economy} value={stats.economy} color="text-amber-400" icon={<TrendingUp className="w-5 h-5" />} description="" />
              </div>

              <div className={`rounded-3xl border shadow-2xl overflow-hidden relative min-h-[450px] transition-all duration-500 backdrop-blur-xl ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white/40 border-slate-200'}`}>
                <AnimatePresence>
                  {loading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-slate-950/80 backdrop-blur-xl z-30"
                    >
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-amber-500/20 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-amber-500 font-black tracking-[0.2em] uppercase text-xs animate-pulse">
                          {loadingText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  {gameState === GameState.PLAYING && currentScenario && (
                    <motion.div 
                      key="playing-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-8 md:p-10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-block">{t.ui.intelReport}</span>
                        <button 
                          onClick={() => {
                            const choicesText = currentScenario.choices.map((c, i) => `${isRtl ? 'אופציה' : 'Option'} ${i+1}: ${c.label}`).join('. ');
                            readText(`${currentScenario.title}. ${currentScenario.description}. ${choicesText}`);
                          }}
                          className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${isReading ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'bg-slate-800/40 text-slate-400 hover:text-amber-500 backdrop-blur-sm border border-slate-700/50'}`}
                        >
                          {isReading ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{currentScenario.title}</h2>
                      <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-4xl opacity-80">{currentScenario.description}</p>
                      <DecisionPanel choices={currentScenario.choices} onSelect={handleChoice} isLoading={loading} statsLabels={t.stats} />
                    </motion.div>
                  )}

                  {gameState === GameState.RESULT && (
                    <motion.div 
                      key="result-content"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="p-8 md:p-10 flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-block">{t.ui.results}</span>
                        <button onClick={() => readText(lastResult)} className={`p-2.5 rounded-xl transition-all flex items-center gap-2 ${isReading ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800/40 text-slate-400'}`}>
                          {isReading ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                      </div>
                      <p className={`text-xl leading-relaxed mb-10 p-8 rounded-3xl border ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-100/40 border-slate-200'} flex-grow shadow-inner`}>{lastResult}</p>
                      <button onClick={nextTurn} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl text-lg uppercase tracking-widest">{t.ui.nextTurn}</button>
                    </motion.div>
                  )}

                  {gameState === GameState.GAME_OVER && (
                    <motion.div 
                      key="gameover-content"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-12 text-center"
                    >
                      <h2 className="text-5xl font-black mb-6 text-red-500">{t.gameOver}</h2>
                      <button onClick={startGame} className="bg-white text-slate-950 hover:bg-slate-200 font-black py-4 px-14 rounded-full text-xl transition-all shadow-2xl">{t.restart}</button>
                    </motion.div>
                  )}

                  {gameState === GameState.VICTORY && (
                    <motion.div 
                      key="victory-content"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-12 text-center"
                    >
                      <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">{t.victory}</h2>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={startGame} className="bg-amber-500 text-slate-950 font-black py-5 px-16 rounded-full text-2xl w-full sm:w-auto shadow-xl shadow-amber-500/20">{t.newGame}</button>
                        <button onClick={handleShare} className="bg-slate-800 text-white font-black py-5 px-16 rounded-full text-2xl border border-slate-700 w-full sm:w-auto flex items-center gap-3 justify-center hover:bg-slate-700 transition-colors">{t.share}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <HistoryPanel 
        history={history} 
        achievements={unlockedAchievements}
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        onRead={readText}
        isReading={isReading}
        language={language}
      />

      <AnimatePresence>
        {activeToast && (
          <AchievementToast 
            title={activeToast.title}
            description={activeToast.desc}
            onClose={() => setActiveToast(null)}
          />
        )}
      </AnimatePresence>

      <footer className={`p-8 text-center text-[10px] border-t transition-colors ${theme === 'dark' ? 'border-slate-800 bg-slate-950/30' : 'border-slate-200 bg-slate-100/30'} backdrop-blur-md`}>
        <p className="opacity-50 font-bold mb-2 uppercase tracking-widest">(C) Noam Gold AI 2025</p>
        <p className="opacity-70">{t.feedback}: <a href="mailto:goldnoamai@gmail.com" className="text-amber-500 hover:underline">goldnoamai@gmail.com</a></p>
      </footer>
    </div>
  );
};

export default App;
