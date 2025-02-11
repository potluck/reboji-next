import Puzzle from '@/components/Puzzle';

async function getPuzzle() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/puzzle`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch puzzle');
  }
  return res.json();
}

export default async function Home() {
  const puzzleData = await getPuzzle();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <main className="flex flex-col items-center space-y-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Reboji
          </h1>
          <div className="w-full max-w-2xl">
            <Puzzle 
              clue={puzzleData.clue}
              answer={puzzleData.answer}
              year={puzzleData.year}
              hint={puzzleData.hint}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
