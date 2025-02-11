import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a puzzle generator. Generate a emoji rebus puzzle hinting towards a movie title. Respond with a JSON object in this format: { \"clue\": \"emoji sequence\", \"movieTitle\": \"movie name\", \"year\": number, \"hint\": \"helpful hint\" }. Make the emoji sequence clever and fun."
        },
        {
          role: "user",
          content: "Generate a puzzle"
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    console.log("Hey pots: ", response);
    
    // Parse the JSON response from OpenAI
    const puzzleData = JSON.parse(response || '{}');
    
    return NextResponse.json({
      clue: puzzleData.clue,
      answer: puzzleData.movieTitle,
      year: puzzleData.year,
      hint: puzzleData.hint
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate puzzle' }, { status: 500 });
  }
} 