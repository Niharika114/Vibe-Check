import { Card } from '@/components/ui/card';
import { MoodEmoji } from './MoodEmoji';
import { Mood, moodLabels, motivationalQuotes } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

interface MoodResultProps {
  mood: Mood;
  score: number;
  showQuote?: boolean;
}

export function MoodResult({ mood, score, showQuote = true }: MoodResultProps) {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    // Show motivational quote for lower moods
    if (showQuote && (mood === 'sad' || mood === 'anxious' || mood === 'angry')) {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setQuote(randomQuote);
    } else {
      setQuote(null);
    }
  }, [mood, showQuote]);

  const getMoodMessage = () => {
    switch (mood) {
      case 'happy':
        return "You're radiating positivity today! Keep spreading that joy! ✨";
      case 'calm':
        return "You're in a peaceful state of mind. Enjoy this tranquility. 🌿";
      case 'neutral':
        return "A balanced day. Sometimes the quiet days are the most meaningful. 🌤️";
      case 'anxious':
        return "It's okay to feel anxious. Take a deep breath. You've got this. 💪";
      case 'sad':
        return "It's okay to feel down. Remember, you're not alone. 💙";
      case 'angry':
        return "Your feelings are valid. Take some time for yourself. 🌊";
      default:
        return "Thank you for sharing how you feel.";
    }
  };

  return (
    <Card className="gradient-mood shadow-card p-6 border-0 animate-scale-in">
      <div className="text-center space-y-4">
        <div className="animate-float">
          <MoodEmoji mood={mood} size="xl" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-foreground">
            Feeling {moodLabels[mood]}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Mood Score:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < score
                      ? 'bg-primary scale-100'
                      : 'bg-border scale-75'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{score}/10</span>
          </div>
        </div>

        <p className="text-muted-foreground text-lg font-serif italic">
          {getMoodMessage()}
        </p>

        {quote && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-start gap-3 text-left">
              <Quote className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-foreground font-serif text-lg italic">
                  "{quote.quote}"
                </p>
                <p className="text-sm text-muted-foreground">
                  — {quote.author}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
