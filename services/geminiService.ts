
import { GoogleGenAI, Type } from "@google/genai";
import type { TranslationResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const translationSchema = {
  type: Type.OBJECT,
  properties: {
    arabicTranslation: {
      type: Type.STRING,
      description: "The direct Arabic translation of the Turkish word.",
    },
    usageCases: {
      type: Type.ARRAY,
      description: "An array of strings explaining different usage cases or meanings of the word.",
      items: { type: Type.STRING },
    },
    exampleSentences: {
      type: Type.ARRAY,
      description: "An array of objects, each containing an example sentence in Turkish and its corresponding Arabic translation.",
      items: {
        type: Type.OBJECT,
        properties: {
          turkish: { 
            type: Type.STRING, 
            description: "An example sentence using the word in Turkish." 
          },
          arabic: { 
            type: Type.STRING, 
            description: "The Arabic translation of the example sentence."
          },
        },
        required: ["turkish", "arabic"],
      },
    },
  },
  required: ["arabicTranslation", "usageCases", "exampleSentences"],
};


export async function fetchTranslation(word: string): Promise<TranslationResult> {
  const prompt = `Provide a comprehensive translation and usage guide for the Turkish word "${word}" into Arabic. Include its direct translation, various usage cases, and practical example sentences from daily life with their Arabic translations.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: translationSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation to ensure the parsed data matches the expected structure
    if (
      !parsedData.arabicTranslation ||
      !Array.isArray(parsedData.usageCases) ||
      !Array.isArray(parsedData.exampleSentences)
    ) {
      throw new Error("Invalid data structure received from API.");
    }
    
    return parsedData as TranslationResult;

  } catch (error) {
    console.error("Error fetching translation from Gemini API:", error);
    throw new Error("Failed to fetch translation. The word may be invalid or there was a server issue.");
  }
}
