
import { GoogleGenAI, Type } from "@google/genai";
import { Scenario, GameStats, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScenario = async (stats: GameStats, lastAction: string | undefined, language: Language = 'he'): Promise<Scenario> => {
  const langMap: Record<Language, string> = {
    he: "Hebrew",
    en: "English",
    ru: "Russian",
    zh: "Chinese",
    hi: "Hindi",
    de: "German",
    es: "Spanish"
  };

  const prompt = `
    You are a geopolitical strategy game engine set in the modern Middle East.
    Current Player State:
    Military: ${stats.military}/100
    Diplomacy: ${stats.diplomacy}/100
    Territory: ${stats.territory}/100
    Economy: ${stats.economy}/100
    Turn Number: ${stats.turn}
    Last Action: ${lastAction || "Game Start"}

    IMPORTANT: Generate all text content in the following language: ${langMap[language]}.
    
    Create a new scenario where the player must make a decision. It can be a border crisis, a peace opportunity, an oil discovery, or military buildup by a neighbor.
    Provide 3 choices.
    For each choice, define numerical impacts and a narrative result text.

    Return the answer in JSON format only.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          choices: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: {
                  type: Type.OBJECT,
                  properties: {
                    military: { type: Type.NUMBER },
                    diplomacy: { type: Type.NUMBER },
                    territory: { type: Type.NUMBER },
                    economy: { type: Type.NUMBER },
                    narrativeResult: { type: Type.STRING }
                  },
                  required: ["military", "diplomacy", "territory", "economy", "narrativeResult"]
                }
              },
              required: ["id", "label", "description", "impact"]
            }
          }
        },
        required: ["title", "description", "choices"]
      }
    }
  });

  return JSON.parse(response.text.trim()) as Scenario;
};
