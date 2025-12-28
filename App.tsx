
import React, { useState, useEffect, useCallback } from 'react';
import { GameStats, Scenario, Choice, GameState, HistoryEntry } from './types';
import { generateScenario } from './services/geminiService';
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

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSavedGame(true);
  }, []);

  const saveGame = () => {
    const gameData = {
      stats,
      gameState,
      currentScenario,
      lastResult,
      history
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
    setHasSavedGame(true);
    setSaveStatus('המשחק נשמר!');
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
        setSaveStatus('המשחק נטען בהצלחה');
        setTimeout(() => setSaveStatus(null), 3000);
      } catch (e) {
        setError("שגיאה בטעינת הקובץ השמור");
      }
    }
  };

  const fetchNextScenario = useCallback(async (currentStats: GameStats, lastChoiceLabel?: string) => {
    setLoading(true);
    setError(null);
    try {
      const scenario = await generateScenario(currentStats, lastChoiceLabel);
      setCurrentScenario(scenario);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError("אירעה שגיאה בטעינת המצב הגיאופוליטי. נסה שוב.");
    } finally {
      setLoading(false);
    }
  }, []);

  const startGame = () => {
    setStats(INITIAL_STATS);
    setLastResult('');
    setHistory([]);
    fetchNextScenario(INITIAL_STATS);
  };

  const handleChoice = async (choice: Choice) => {
    if (!currentScenario) return;

    const newStats = {
      military: Math.min(100, Math.max(0, stats.military + choice.impact.military)),
      diplomacy: Math.min(100, Math.max(0, stats.diplomacy + choice.impact.diplomacy)),
      territory: Math.min(100, Math.max(0, stats.territory + choice.impact.territory)),
      economy: Math.min(100, Math.max(0, stats.economy + choice.impact.economy)),
      turn: stats.turn + 1
    };

    const historyEntry: HistoryEntry = {
      turn: stats.turn,
      scenarioTitle: currentScenario.title,
      choiceLabel: choice.label,
      resultText: choice.impact.narrativeResult
    };

    setHistory(prev => [historyEntry, ...prev]);
    setStats(newStats);
    setLastResult(choice.impact.narrativeResult);
    
    // Check Game Over
    if (newStats.military <= 0 || newStats.diplomacy <= 0 || newStats.economy <= 0) {
      setGameState(GameState.GAME_OVER);
      return;
    }

    // Check Victory Condition
    if (newStats.turn >= VICTORY_TURN && 
        newStats.military >= VICTORY_THRESHOLD && 
        newStats.diplomacy >= VICTORY_THRESHOLD && 
        newStats.economy >= VICTORY_THRESHOLD) {
      setGameState(GameState.VICTORY);
      return;
    }

    setGameState(GameState.RESULT);
  };

  const nextTurn = () => {
    fetchNextScenario(stats, lastResult);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'הגמוניה במזרח התיכון',
      text: `הגעתי להגמוניה במזרח התיכון! 🌍✨\nעוצמה צבאית: ${stats.military}\nדיפלומטיה: ${stats.diplomacy}\nכלכלה: ${stats.economy}\nשרדתי ${stats.turn} תורות והבטחתי את עתיד האומה. מה לגביך?`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        setSaveStatus('התוצאות הועתקו ללוח!');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg shadow-amber-500/20">
            ME
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden md:block">הגמוניה במזרח התיכון</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {saveStatus && <span className="text-xs text-amber-400 animate-pulse">{saveStatus}</span>}
          
          {gameState !== GameState.START && (
            <>
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 border border-slate-700 active:scale-95 shadow-sm"
              >
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                ארכיון
              </button>
              
              {gameState !== GameState.GAME_OVER && gameState !== GameState.VICTORY && (
                <button 
                  onClick={saveGame}
                  className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 border border-slate-700 active:scale-95 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                  </svg>
                  שמור
                </button>
              )}
            </>
          )}

          <div className="bg-slate-900 px-3 py-1 rounded-full text-xs font-semibold text-slate-400 border border-slate-800 shadow-inner">
            תור {stats.turn} / {VICTORY_TURN}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto max-w-5xl p-6 flex flex-col relative overflow-hidden">
        
        {gameState === GameState.START && (
          <div className="flex-grow flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12 animate-fade-up-strat">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              גורל האומה בידיך
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg">
              הובל את מדינתך במזרח התיכון המודרני. עליך לנווט בין מלחמות, הסכמי שלום, פיתוח צבאי ומשברים כלכליים. הגע לתור {VICTORY_TURN} עם מדדים גבוהים כדי להבטיח את עתיד האומה.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={startGame}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 px-12 rounded-full text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-amber-500/20"
              >
                התחל משחק חדש
              </button>
              {hasSavedGame && (
                <button 
                  onClick={loadGame}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all hover:scale-105 active:scale-95 border border-slate-700"
                >
                  טען משחק שמור
                </button>
              )}
            </div>
          </div>
        )}

        {(gameState !== GameState.START) && (
          <div className="space-y-8 animate-fade-up-strat">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard 
                label="עוצמה צבאית" 
                value={stats.military} 
                description="הכוח להגן על הגבולות ולהרתיע אויבים. אם ערך זה יגיע ל-0, המדינה תיכבש או שתחווה הפיכה צבאית."
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 17v-6l8 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                color="text-red-400"
              />
              <StatCard 
                label="דיפלומטיה" 
                value={stats.diplomacy} 
                description="מעמד המדינה בקהילה הבינלאומית. דיפלומטיה נמוכה תוביל לסנקציות קשות ולבידוד פוליטי."
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                color="text-blue-400"
              />
              <StatCard 
                label="טריטוריה" 
                value={stats.territory} 
                description="מרחב המחיה והשליטה על המשאבים הקרקעיים. אובדן טריטוריה יחליש את המורל הלאומי ואת הפוטנציאל הכלכלי."
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                color="text-emerald-400"
              />
              <StatCard 
                label="כלכלה" 
                value={stats.economy} 
                description="היכולת למממן פרויקטים, צבא ורווחה. קריסה כלכלית תוביל לרעב ולנפילת השלטון."
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                color="text-amber-400"
              />
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-900/80 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative min-h-[450px] transition-all duration-500 backdrop-blur-sm">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-slate-900/90 backdrop-blur-md z-20 animate-in fade-in duration-300">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-amber-500/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-amber-500 font-bold tracking-widest uppercase text-xs">מעבד נתונים</p>
                    <p className="text-slate-400 text-sm font-medium">מנתח תנועות גיאופוליטיות באזור...</p>
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="p-12 text-center space-y-6 animate-sweep">
                  <div className="text-red-400 text-6xl">⚠️</div>
                  <p className="text-slate-300 text-lg">{error}</p>
                  <button onClick={startGame} className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl transition-all border border-slate-700">נסה שוב</button>
                </div>
              ) : gameState === GameState.PLAYING && currentScenario ? (
                <div className="p-8 md:p-10 animate-sweep">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">דו"ח מודיעין</span>
                     <div className="h-px flex-grow bg-gradient-to-l from-amber-500/20 to-transparent"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-6 text-white text-right leading-tight">{currentScenario.title}</h2>
                  <p className="text-slate-300 text-lg md:text-xl leading-relaxed text-right mb-10 max-w-4xl ml-auto border-r-4 border-amber-500/30 pr-6">
                    {currentScenario.description}
                  </p>
                  <DecisionPanel 
                    choices={currentScenario.choices} 
                    onSelect={handleChoice} 
                    isLoading={loading}
                  />
                </div>
              ) : gameState === GameState.RESULT ? (
                <div className="p-8 md:p-10 animate-sweep text-right h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6 flex-row-reverse">
                     <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">תוצאות המבצע</span>
                     <div className="h-px flex-grow bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                  </div>
                  <h2 className="text-3xl font-black mb-6 text-white">החלטה יצאה לפועל</h2>
                  <div className="flex-grow">
                    <p className="text-slate-200 text-xl leading-relaxed mb-10 bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 shadow-inner">
                      {lastResult}
                    </p>
                  </div>
                  <button 
                    onClick={nextTurn}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] text-lg uppercase tracking-wider"
                  >
                    המשך לתור הבא
                  </button>
                </div>
              ) : gameState === GameState.GAME_OVER ? (
                <div className="p-12 text-center animate-sweep">
                  <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  </div>
                  <h2 className="text-5xl font-black mb-6 text-red-500">המשחק נגמר</h2>
                  <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl mb-10 text-right max-w-2xl mx-auto">
                    <p className="text-slate-200 text-2xl mb-3 font-bold">המדינה קרסה תחת הנהגתך</p>
                    <p className="text-slate-400 text-lg leading-relaxed">הגעת לתור {stats.turn}. המשאבים שלך אזלו, חוסר היציבות הכריע את המערכת והשלטון נפל. ההיסטוריה תזכור את תקופתך כעידן של משבר.</p>
                  </div>
                  <button 
                    onClick={startGame}
                    className="bg-white text-slate-950 hover:bg-slate-200 font-black py-4 px-14 rounded-full text-xl transition-all shadow-2xl active:scale-95"
                  >
                    נסה שוב מההתחלה
                  </button>
                </div>
              ) : gameState === GameState.VICTORY ? (
                <div className="p-12 text-center animate-victory-zoom">
                  <div className="mb-8 flex justify-center">
                    <div className="w-28 h-28 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40 relative">
                      <div className="absolute inset-0 rounded-full animate-ping bg-amber-400/20"></div>
                      <svg className="w-14 h-14 text-slate-900 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v-2h-4v-3.1 c1.63-0.33,2.98-1.46,3.61-2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M19,8 c0,1.3-0.84,2.4-2,2.82V7h2V8z"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">ניצחון היסטורי!</h2>
                  <div className="bg-amber-500/5 border border-amber-500/20 p-10 rounded-3xl mb-12 text-right relative overflow-hidden max-w-3xl mx-auto shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-200"></div>
                    <p className="text-slate-100 text-3xl mb-6 font-black leading-tight">עידן חדש של יציבות ושגשוג</p>
                    <p className="text-slate-300 text-xl leading-relaxed">
                      הצלחת לנווט את הספינה בבטחה דרך הסערות הגיאופוליטיות של המזרח התיכון. תחת הנהגתך, המדינה הפכה למעצמה אזורית יציבה, משגשגת ומרתיעה. שמך יירשם בדפי ההיסטוריה כאדריכל השלום והעוצמה.
                    </p>
                    <div className="mt-10 flex justify-end gap-8 border-t border-amber-500/10 pt-8">
                      <div className="text-center group">
                        <div className="text-red-400 font-black text-3xl group-hover:scale-110 transition-transform">{stats.military}</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-tighter">עוצמה</div>
                      </div>
                      <div className="text-center group">
                        <div className="text-blue-400 font-black text-3xl group-hover:scale-110 transition-transform">{stats.diplomacy}</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-tighter">קשרים</div>
                      </div>
                      <div className="text-center group">
                        <div className="text-emerald-400 font-black text-3xl group-hover:scale-110 transition-transform">{stats.economy}</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-tighter">שגשוג</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                      onClick={startGame}
                      className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-black py-5 px-16 rounded-full text-2xl transition-all shadow-2xl shadow-amber-500/30 active:scale-95 w-full sm:w-auto"
                    >
                      שחק שוב
                    </button>
                    <button 
                      onClick={handleShare}
                      className="bg-slate-800 text-white hover:bg-slate-700 font-black py-5 px-16 rounded-full text-2xl transition-all shadow-2xl border border-slate-700 active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      שתף הישגים
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>

      {/* History Side Panel */}
      <HistoryPanel 
        history={history} 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />

      {/* Footer */}
      <footer className="p-8 text-center text-slate-700 text-xs border-t border-slate-900 bg-slate-950 z-10">
        <p className="opacity-50">סימולטור גיאופוליטי מבוסס בינה מלאכותית &copy; 2024</p>
        <p className="mt-1 text-slate-800 font-medium">ערוך ומוכן לכל תרחיש באזור הסוער בעולם</p>
      </footer>
    </div>
  );
};

export default App;
