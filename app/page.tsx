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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold">Reboji</h1>
        <Puzzle 
          clue={puzzleData.clue}
          answer={puzzleData.answer}
          year={puzzleData.year}
          hint={puzzleData.hint}
        />
      </main>
    </div>
  );
}
