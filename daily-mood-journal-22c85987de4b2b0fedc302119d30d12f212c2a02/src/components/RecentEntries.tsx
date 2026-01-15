import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JournalEntry, moodEmojis, moodLabels } from '@/lib/types';
import { format } from 'date-fns';
import { BookOpen, Trash2 } from 'lucide-react';

interface RecentEntriesProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

export function RecentEntries({ entries, onDelete }: RecentEntriesProps) {
  const recentEntries = entries.slice(0, 5);

  if (recentEntries.length === 0) {
    return (
      <Card className="gradient-card shadow-card p-6 border-0">
        <div className="text-center py-8 space-y-3">
          <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto" />
          <h3 className="text-lg font-medium text-muted-foreground">No entries yet</h3>
          <p className="text-sm text-muted-foreground">
            Start writing your first journal entry above!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gradient-card shadow-card p-6 border-0">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        Recent Entries
      </h3>

      <div className="space-y-3">
        {recentEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-background/50 rounded-lg p-4 border border-border/50 hover:shadow-soft transition-shadow animate-fade-in"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">{moodEmojis[entry.mood]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">
                      {format(new Date(entry.date), 'MMM d, yyyy')}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {moodLabels[entry.mood]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Score: {entry.moodScore}/10
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2 font-serif">
                    {entry.content}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(entry.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
