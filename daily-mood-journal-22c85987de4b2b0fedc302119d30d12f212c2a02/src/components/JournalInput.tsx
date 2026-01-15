import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Sparkles, Send } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { analyzeMood } from '@/lib/moodAnalyzer';
import { JournalEntry, Mood } from '@/lib/types';

interface JournalInputProps {
  onSubmit: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
}

export function JournalInput({ onSubmit }: JournalInputProps) {
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { mood, score } = analyzeMood(content);
    
    onSubmit({
      date,
      content: content.trim(),
      mood,
      moodScore: score,
    });

    setContent('');
    setIsAnalyzing(false);
  };

  return (
    <Card className="gradient-card shadow-card p-6 border-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            How are you feeling today?
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal gap-2 bg-secondary/50 border-border hover:bg-secondary"
                )}
              >
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {format(date, "MMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Textarea
          placeholder="Write about your day, your thoughts, your feelings... Let it all out. ✨"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] bg-background/50 border-border/50 resize-none text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 font-serif text-lg"
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {content.length} characters
          </p>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isAnalyzing}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse-soft" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Save & Analyze
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
