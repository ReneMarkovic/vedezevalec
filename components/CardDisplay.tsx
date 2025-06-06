
import React from 'react';
import { Card } from '../types';

interface CardDisplayProps {
  card: Card;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  const imageUrl = `https://picsum.photos/seed/${card.imageSeed}/200/300`;

  return (
    <div className="bg-slate-700/70 border-2 border-yellow-400/50 rounded-xl shadow-xl p-4 w-48 h-80 m-3 flex flex-col justify-between items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-yellow-200 mb-2">{card.name}</h3>
      <div className="w-full h-4/5 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={card.name} 
          className="max-w-full max-h-full object-cover rounded-md shadow-lg"
          onError={(e) => (e.currentTarget.src = 'https://picsum.photos/200/300?grayscale')} // Fallback image
        />
      </div>
      {/* <p className="text-xs text-yellow-100/70 mt-2">{card.keywords.join(', ')}</p> */}
    </div>
  );
};

export default CardDisplay;
    