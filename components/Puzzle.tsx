'use client';
import { useState } from 'react';

interface PuzzleProps {
  clue: string;
  answer: string;
  year: number;
  hint: string;
}

export default function Puzzle({ clue, answer, year, hint }: PuzzleProps) {
  const [guess, setGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const checkAnswer = (input: string) => {
    const normalizeString = (str: string) => {
      return str
        .trim()
        .toLowerCase()
        .replace(/^the\s+/, '') // Remove 'the ' from the beginning
        .replace(/\s+the\s+/, ' '); // Remove ' the ' from middle
    };
    
    const normalizedInput = normalizeString(input);
    const normalizedAnswer = normalizeString(answer);
    setIsCorrect(normalizedInput === normalizedAnswer);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md w-full">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Puzzle from {year}</h2>
        <p className="text-lg">{clue}</p>
        {hint && showHint && <p className="text-sm text-gray-600">Hint: {hint}</p>}
        {hint && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Show Hint
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            setIsCorrect(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkAnswer(guess);
            }
          }}
          placeholder="Enter your answer"
          className={`px-4 py-2 border rounded-lg w-full ${
            isCorrect === true ? 'border-green-500 bg-green-50' :
            isCorrect === false ? 'border-red-500 bg-red-50' :
            ''
          }`}
        />
        <button
          onClick={() => checkAnswer(guess)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Check Answer
        </button>
        {isCorrect !== null && (
          <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : 'Try again!'}
          </p>
        )}
      </div>
    </div>
  );
} 