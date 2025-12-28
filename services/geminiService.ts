
import { GoogleGenAI, Type } from "@google/genai";
import { Scenario, GameStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScenario = async (stats: GameStats, lastAction?: string): Promise<Scenario> => {
  const prompt = `
    אתה מנוע של משחק אסטרטגיה גיאופוליטי המתרחש במזרח התיכון המודרני.
    המצב הנוכחי של השחקן:
    צבאי: ${stats.military}/100
    דיפלומטיה: ${stats.diplomacy}/100
    טריטוריה: ${stats.territory}/100
    כלכלה: ${stats.economy}/100
    תור מספר: ${stats.turn}
    הפעולה האחרונה שנבחרה: ${lastAction || "תחילת המשחק"}

    צור תרחיש חדש שבו השחקן חייב לקבל החלטה. התרחיש יכול להיות משבר גבול, הזדמנות לשלום, תגלית נפט, או התעצמות צבאית של מדינה שכנה.
    הצע 3 אפשרויות בחירה (או 2 במקרים קיצוניים).
    לכל בחירה, הגדר השפעה מספרית (חיובית או שלילית) על המשאבים וטקסט קצר המתאר את התוצאה.

    החזר את התשובה בפורמט JSON בלבד התואם את הסכימה הבאה.
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
