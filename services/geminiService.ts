
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Card } from '../types';

// Ensure API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

export const interpretCards = async (cards: Card[]): Promise<string> => {
  if (cards.length === 0) {
    return "Prosim, najprej izberi karte.";
  }

  const cardNames = cards.map(card => card.name).join(', ');
  const cardDetails = cards.map(card => `- ${card.name}: ${card.keywords.join(', ')}`).join('\n');

  const prompt = `
Ti si moder in mističen vedeževalec z globokim razumevanjem simbolike kart. Izvlekel/Izvlekla sem naslednje karte: ${cardNames}.

Njihovi ključni pomeni so:
${cardDetails}

Prosim, podaj združeno, pronicljivo in navdihujočo interpretacijo teh kart za splošno življenjsko branje. Poveži njihove pomene v smiselno pripoved, ki osvetljuje trenutno situacijo, možne izzive in priložnosti.
Ponudi modre nasvete ali razmisleke na podlagi njihove združene energije. Ohrani ton zagoneten, a hkrati spodbuden in pozitiven.
Odgovori v slovenščini. Bodi poetičen in uporabi bogat jezik.
Interpretacija naj bo dolga vsaj 150 besed.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
    });
    
    // Extract text directly from response.text
    const interpretationText = response.text;
    if (!interpretationText) {
        throw new Error("Prejet prazen odgovor od API-ja.");
    }
    return interpretationText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Prišlo je do napake pri interpretaciji kart: ${error.message}`;
    }
    return "Prišlo je do neznane napake pri interpretaciji kart.";
  }
};
    