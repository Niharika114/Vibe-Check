import { Mood } from './types';

// Simple keyword-based mood analysis (for local demo)
// In production, this would call an AI API
export function analyzeMood(text: string): { mood: Mood; score: number } {
  const lowerText = text.toLowerCase();
  
  const moodKeywords: Record<Mood, string[]> = {
    happy: ['happy', 'joy', 'excited', 'amazing', 'wonderful', 'great', 'fantastic', 'love', 'blessed', 'grateful', 'thankful', 'awesome', 'brilliant', 'delighted', 'thrilled', 'cheerful', 'elated'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'zen', 'quiet', 'balanced', 'centered', 'mindful', 'gentle', 'still', 'easy'],
    neutral: ['okay', 'fine', 'normal', 'regular', 'usual', 'average', 'meh', 'alright', 'so-so'],
    anxious: ['anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 'panic', 'fear', 'scared', 'tense', 'uneasy', 'restless', 'concerned', 'uncertain'],
    sad: ['sad', 'down', 'depressed', 'unhappy', 'lonely', 'hopeless', 'empty', 'lost', 'hurt', 'disappointed', 'heartbroken', 'miserable', 'gloomy', 'blue', 'crying', 'tears'],
    angry: ['angry', 'mad', 'frustrated', 'annoyed', 'irritated', 'furious', 'rage', 'hate', 'upset', 'bitter', 'resentful', 'hostile'],
  };

  const scores: Record<Mood, number> = {
    happy: 0,
    calm: 0,
    neutral: 0,
    anxious: 0,
    sad: 0,
    angry: 0,
  };

  // Count keyword matches
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        scores[mood as Mood] += 1;
      }
    }
  }

  // Find the dominant mood
  let dominantMood: Mood = 'neutral';
  let maxScore = 0;

  for (const [mood, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantMood = mood as Mood;
    }
  }

  // Calculate mood score (1-10)
  const moodScoreMap: Record<Mood, number> = {
    happy: 9,
    calm: 8,
    neutral: 5,
    anxious: 4,
    sad: 3,
    angry: 2,
  };

  // Add some variance based on intensity
  const baseScore = moodScoreMap[dominantMood];
  const variance = Math.random() * 1.5 - 0.75; // -0.75 to +0.75
  const finalScore = Math.max(1, Math.min(10, Math.round(baseScore + variance)));

  return {
    mood: dominantMood,
    score: finalScore,
  };
}
