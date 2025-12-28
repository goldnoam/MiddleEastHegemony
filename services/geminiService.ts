
// This service is currently deactivated as the game uses pre-defined scenarios
// from translations.ts to satisfy production/non-AI requirements.

import { Scenario, GameStats, Language } from "../types";

export const generateScenario = async (stats: GameStats, lastAction: string | undefined, language: Language = 'he'): Promise<Scenario> => {
  throw new Error("Gemini Service is deactivated. Use static scenarios.");
};
