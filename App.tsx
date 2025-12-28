
import React, { useState, useEffect, useCallback } from 'react';
import { GameStats, Scenario, Choice, GameState, HistoryEntry, Language, Theme } from './types';
import { translations } from './translations';
import StatCard from './components/StatCard';
import DecisionPanel from './components/DecisionPanel';
import HistoryPanel from './components/HistoryPanel';

const INITIAL_STATS: GameStats = {
  military: 50,
  diplomacy: 50,
  territory: 30,
  economy: 50,
  turn: 1
};

const VICTORY_TURN = 20;
const VICTORY_THRESHOLD = 60;
const SAVE_KEY = 'me_hegemony_save_v1';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [lastResult, setLastResult] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);
  
  const [language, setLanguage] = useState<Language>('he');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isGlitching, setIsGlitching] = useState(false);

  const t = translations[language];
  const isRtl = language === 'he';

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSavedGame(true);
    
    const savedTheme = localStorage.getItem('app_theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
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

  const saveGame = () => {
    const gameData = { stats, gameState, currentScenario, lastResult, history, language };
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
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

  const pickScenario = useCallback(() => {
    setLoading(true);
    // Introduce a small artificial delay to maintain the 'loading' feel
    setTimeout(() => {
      const available = t.scenarios || [];
      if (available.length > 0) {
        // Find a scenario that isn't the current one if possible
        let filtered = available.filter((s: Scenario) => s.title !== currentScenario?.title);
        if (filtered.length === 0) filtered = available;
        
        const randomIndex = Math.floor(Math.random() * filtered.length);
        setCurrentScenario(filtered[randomIndex]);
        setGameState(GameState.PLAYING);
      } else {
        setError(t.ui.error);
      }
      setLoading(false);
    }, 600);
  }, [currentScenario, t.scenarios, t.ui.error]);

  const startGame = () => {
    setStats(INITIAL_STATS);
    setLastResult('');
    setHistory([]);
    pickScenario();
  };

  const handleChoice = async (choice: Choice) => {
    if (!currentScenario) return;

    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      const newStats = {
        military: Math.min(100, Math.max(0, stats.military + choice.impact.military)),
        diplomacy: Math.min(100, Math.max(0, stats.diplomacy + choice.impact.diplomacy)),
        territory: Math.min(100, Math.max(0, stats.territory + choice.impact.territory)),
        economy: Math.min(100, Math.max(0, stats.economy + choice.impact.economy)),
        turn: stats.turn + 1
      };

      setHistory(prev => [{
        turn: stats.turn,
        scenarioTitle: currentScenario.title,
        choiceLabel: choice.label,
        resultText: choice.impact.narrativeResult
      }, ...prev]);

      setStats(newStats);
      setLastResult(choice.impact.narrativeResult);
      
      if (newStats.military <= 0 || newStats.diplomacy <= 0 || newStats.economy <= 0) {
        setGameState(GameState.GAME_OVER);
      } else if (newStats.turn >= VICTORY_TURN && newStats.military >= VICTORY_THRESHOLD && newStats.diplomacy >= VICTORY_THRESHOLD && newStats.economy >= VICTORY_THRESHOLD) {
        setGameState(GameState.VICTORY);
      } else {
        setGameState(GameState.RESULT);
      }
    }, 400);
  };

  const nextTurn = () => {
    pickScenario();
  };

  const handleShare = async () => {
    const text = `${t.title} - Turn ${stats.turn}/${VICTORY_TURN}\nMil: ${stats.military}, Dipl: ${stats.diplomacy}, Econ: ${stats.economy}`;
    if (navigator.share) {
      await navigator.share({ title: t.title, text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(text);
      setSaveStatus(t.ui.saving);
      setTimeout(() => setSaveStatus(null), 2000);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {isGlitching && <div className="glitch-overlay" />}
      
      <header className={`border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/80'} backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg">ME</div>
          <h1 className="text-xl font-bold hidden md:block">{t.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center rounded-xl p-1 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
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
        {gameState === GameState.START ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12 animate-fade-up-strat">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{t.startTitle}</h2>
            <p className="opacity-70 text-lg mb-10 leading-relaxed">{t.startDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={startGame} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 px-12 rounded-full text-xl transition-all shadow-xl shadow-amber-500/20">{t.newGame}</button>
              {hasSavedGame && <button onClick={loadGame} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all border border-slate-700">{t.loadGame}</button>}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-up-strat">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label={t.stats.military} value={stats.military} color="text-red-400" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 17v-6l8 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} description="" />
              <StatCard label={t.stats.diplomacy} value={stats.diplomacy} color="text-blue-400" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} description="" />
              <StatCard label={t.stats.territory} value={stats.territory} color="text-emerald-400" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} description="" />
              <StatCard label={t.stats.economy} value={stats.economy} color="text-amber-400" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} description="" />
            </div>

            <div className={`rounded-3xl border shadow-2xl overflow-hidden relative min-h-[450px] transition-all duration-500 backdrop-blur-sm ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              {loading && <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-black/40 backdrop-blur-md z-20 animate-in fade-in"><div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div><p className="text-amber-500 font-bold tracking-widest uppercase text-xs">{t.ui.loading}</p></div>}
              {gameState === GameState.PLAYING && currentScenario && (
                <div className="p-8 md:p-10 animate-sweep">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">{t.ui.intelReport}</span>
                  <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{currentScenario.title}</h2>
                  <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-4xl opacity-80">{currentScenario.description}</p>
                  <DecisionPanel choices={currentScenario.choices} onSelect={handleChoice} isLoading={loading} />
                </div>
              )}
              {gameState === GameState.RESULT && (
                <div className="p-8 md:p-10 animate-sweep flex flex-col h-full">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">{t.ui.results}</span>
                  <p className={`text-xl leading-relaxed mb-10 p-8 rounded-3xl border ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-100 border-slate-200'} flex-grow`}>{lastResult}</p>
                  <button onClick={nextTurn} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl text-lg uppercase">{t.ui.nextTurn}</button>
                </div>
              )}
              {gameState === GameState.GAME_OVER && (
                <div className="p-12 text-center animate-sweep">
                  <h2 className="text-5xl font-black mb-6 text-red-500">{t.gameOver}</h2>
                  <button onClick={startGame} className="bg-white text-slate-950 hover:bg-slate-200 font-black py-4 px-14 rounded-full text-xl transition-all shadow-2xl">{t.restart}</button>
                </div>
              )}
              {gameState === GameState.VICTORY && (
                <div className="p-12 text-center animate-victory-zoom">
                   <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">{t.victory}</h2>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button onClick={startGame} className="bg-amber-500 text-slate-950 font-black py-5 px-16 rounded-full text-2xl w-full sm:w-auto">{t.newGame}</button>
                    <button onClick={handleShare} className="bg-slate-800 text-white font-black py-5 px-16 rounded-full text-2xl border border-slate-700 w-full sm:w-auto flex items-center gap-3 justify-center">{t.share}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <HistoryPanel history={history} isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

      <footer className={`p-8 text-center text-[10px] border-t transition-colors ${theme === 'dark' ? 'border-slate-900 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
        <p className="opacity-50 font-bold mb-2 uppercase tracking-widest">(C) Noam Gold AI 2025</p>
        <p className="opacity-70">{t.feedback}: <a href="mailto:goldnoamai@gmail.com" className="text-amber-500 hover:underline">goldnoamai@gmail.com</a></p>
      </footer>
    </div>
  );
};

export default App;
