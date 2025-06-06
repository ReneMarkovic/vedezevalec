
import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './types';
import { TAROT_CARDS_DATA, NUMBER_OF_CARDS_TO_DRAW } from './constants';
import CardDisplay from './components/CardDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import { interpretCards } from './services/geminiService';

// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  useEffect(() => {
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
      setError("API ključ za Gemini manjka. Prosim, nastavite process.env.API_KEY.");
    }
  }, []);

  const handleGenerateCards = useCallback(() => {
    if (apiKeyMissing) return;
    const shuffledCards = shuffleArray(TAROT_CARDS_DATA);
    setSelectedCards(shuffledCards.slice(0, NUMBER_OF_CARDS_TO_DRAW));
    setInterpretation('');
    setError(null);
  }, [apiKeyMissing]);

  const handleInterpretCards = useCallback(async () => {
    if (apiKeyMissing || selectedCards.length === 0) return;

    setIsLoading(true);
    setError(null);
    setInterpretation('');

    try {
      const result = await interpretCards(selectedCards);
      setInterpretation(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Neznana napaka pri pridobivanju interpretacije.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedCards, apiKeyMissing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-yellow-100 p-4 sm:p-8 flex flex-col items-center selection:bg-yellow-400 selection:text-indigo-900">
      <header className="text-center my-6 sm:my-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 drop-shadow-lg">
          Vedeževalec Iz Kart
        </h1>
        <p className="text-lg text-yellow-200/80 mt-2">Odkrijte skrivnosti, ki jih nosijo vaše karte.</p>
      </header>

      {apiKeyMissing && (
         <ErrorAlert message="API ključ (API_KEY) za Gemini ni nastavljen. Aplikacija ne bo mogla pridobiti interpretacij." />
      )}

      <div className="my-6 sm:my-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGenerateCards}
          disabled={isLoading || apiKeyMissing}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-500 text-indigo-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {selectedCards.length > 0 ? 'Generiraj Nove Karte' : 'Generiraj Karte'}
        </button>
        {selectedCards.length > 0 && (
          <button
            onClick={handleInterpretCards}
            disabled={isLoading || apiKeyMissing}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-yellow-100 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Interpretiraj Karte
          </button>
        )}
      </div>

      {error && <ErrorAlert message={error} />}

      {selectedCards.length > 0 && (
        <section aria-labelledby="selected-cards-heading" className="my-6">
          <h2 id="selected-cards-heading" className="sr-only">Izbrane karte</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {selectedCards.map((card) => (
              <CardDisplay key={card.id} card={card} />
            ))}
          </div>
        </section>
      )}

      {isLoading && <LoadingSpinner />}

      {interpretation && !isLoading && (
        <section aria-labelledby="interpretation-heading" className="my-8 p-6 sm:p-8 bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-2xl max-w-3xl w-full">
          <h2 id="interpretation-heading" className="text-2xl sm:text-3xl font-semibold text-yellow-300 mb-4 text-center">Vaša Interpretacija</h2>
          <div className="text-yellow-100/90 text-base sm:text-lg leading-relaxed whitespace-pre-wrap prose prose-invert prose-p:my-3 prose-headings:text-yellow-200 max-w-none">
            {interpretation}
          </div>
        </section>
      )}

      <footer className="mt-auto pt-8 text-center text-yellow-200/70 text-sm">
        <p>&copy; {new Date().getFullYear()} Vedeževalec. Magija kodiranja.</p>
      </footer>
    </div>
  );
};

export default App;
    