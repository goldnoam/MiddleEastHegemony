
export type Language = 'he' | 'en' | 'ru' | 'zh' | 'hi' | 'de' | 'es';
export type Theme = 'dark' | 'light';

export interface GameStats {
  military: number;
  diplomacy: number;
  territory: number;
  economy: number;
  turn: number;
}

export interface ChoiceImpact {
  military: number;
  diplomacy: number;
  territory: number;
  economy: number;
  narrativeResult: string;
}

export interface Choice {
  id: string;
  label: string;
  description: string;
  impact: ChoiceImpact;
}

export interface Scenario {
  title: string;
  description: string;
  choices: Choice[];
}

export interface HistoryEntry {
  turn: number;
  scenarioTitle: string;
  scenarioDescription: string;
  choiceLabel: string;
  resultText: string;
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}
