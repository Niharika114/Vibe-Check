import { useState } from 'react';
import { Header } from '@/components/Header';
import { JournalInput } from '@/components/JournalInput';
import { MoodResult } from '@/components/MoodResult';
import { MoodChart } from '@/components/MoodChart';
import { RecentEntries } from '@/components/RecentEntries';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { JournalEntry, Mood } from '@/lib/types';

const Index = () => {
  const { entries, addEntry, deleteEntry } = useJournalEntries();
  const [lastAnalyzedMood, setLastAnalyzedMood] = useState<{ mood: Mood; score: number } | null>(null);

  const handleSubmit = (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    addEntry(entry);
    setLastAnalyzedMood({ mood: entry.mood, score: entry.moodScore });
  };

  return (
    <div className="min-h-screen gradient-warm">
      <div className="container max-w-3xl mx-auto px-4 py-6 pb-20">
        <Header />

        <div className="space-y-6">
          {/* Journal Input Section */}
          <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <JournalInput onSubmit={handleSubmit} />
          </section>

          {/* Mood Result - Show after submission */}
          {lastAnalyzedMood && (
            <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <MoodResult mood={lastAnalyzedMood.mood} score={lastAnalyzedMood.score} />
            </section>
          )}

          {/* Mood Chart */}
          <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <MoodChart entries={entries} days={7} />
          </section>

          {/* Recent Entries */}
          <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <RecentEntries entries={entries} onDelete={deleteEntry} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
