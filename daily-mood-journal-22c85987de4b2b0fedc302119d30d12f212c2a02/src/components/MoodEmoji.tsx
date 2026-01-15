import { Mood, moodEmojis } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MoodEmojiProps {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
};

export function MoodEmoji({ mood, size = 'md', animated = false, className }: MoodEmojiProps) {
  return (
    <span
      className={cn(
        sizeClasses[size],
        animated && 'animate-float',
        'inline-block select-none',
        className
      )}
      role="img"
      aria-label={mood}
    >
      {moodEmojis[mood]}
    </span>
  );
}
