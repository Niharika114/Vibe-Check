export type Mood = 'happy' | 'calm' | 'neutral' | 'anxious' | 'sad' | 'angry';

export interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood: Mood;
  moodScore: number; // 1-10
  createdAt: Date;
}

export interface MoodData {
  date: string;
  score: number;
  mood: Mood;
}

export const moodEmojis: Record<Mood, string> = {
  happy: '😊',
  calm: '😌',
  neutral: '😐',
  anxious: '😰',
  sad: '😢',
  angry: '😠',
};

export const moodLabels: Record<Mood, string> = {
  happy: 'Happy',
  calm: 'Calm',
  neutral: 'Neutral',
  anxious: 'Anxious',
  sad: 'Sad',
  angry: 'Angry',
};

export const moodColors: Record<Mood, string> = {
  happy: 'hsl(45, 93%, 63%)',
  calm: 'hsl(174, 42%, 65%)',
  neutral: 'hsl(30, 20%, 70%)',
  anxious: 'hsl(35, 90%, 60%)',
  sad: 'hsl(220, 40%, 60%)',
  angry: 'hsl(0, 70%, 55%)',
};

export const motivationalQuotes = [
  { quote: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown" },
  { quote: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { quote: "The only way out is through.", author: "Robert Frost" },
  { quote: "This too shall pass.", author: "Persian Proverb" },
  { quote: "Be gentle with yourself. You're doing the best you can.", author: "Unknown" },
  { quote: "Your feelings are valid. It's okay to not be okay.", author: "Unknown" },
  { quote: "Stars can't shine without darkness.", author: "D.H. Sidebottom" },
  { quote: "Healing is not linear. Be patient with yourself.", author: "Unknown" },
  { quote: "You've survived 100% of your worst days so far.", author: "Unknown" },
  { quote: "Small steps still move you forward.", author: "Unknown" },
];
