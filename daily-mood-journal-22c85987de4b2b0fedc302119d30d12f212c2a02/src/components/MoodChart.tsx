import { Card } from '@/components/ui/card';
import { JournalEntry, moodColors, moodLabels } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import { TrendingUp, Calendar } from 'lucide-react';
import { useMemo } from 'react';

interface MoodChartProps {
  entries: JournalEntry[];
  days?: number;
}

export function MoodChart({ entries, days = 7 }: MoodChartProps) {
  const chartData = useMemo(() => {
    const today = startOfDay(new Date());
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const dayEntry = entries.find(entry => {
        const entryDate = format(new Date(entry.date), 'yyyy-MM-dd');
        return entryDate === dateStr;
      });

      data.push({
        date: format(date, 'EEE'),
        fullDate: format(date, 'MMM d'),
        score: dayEntry?.moodScore || null,
        mood: dayEntry?.mood || null,
      });
    }

    return data;
  }, [entries, days]);

  const averageMood = useMemo(() => {
    const validScores = chartData.filter(d => d.score !== null).map(d => d.score as number);
    if (validScores.length === 0) return null;
    return (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1);
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && payload[0].value !== null) {
      const data = payload[0].payload;
      return (
        <div className="bg-card shadow-elevated rounded-lg p-3 border border-border">
          <p className="text-sm font-medium text-foreground">{data.fullDate}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Mood: <span className="text-foreground font-medium">{data.mood ? moodLabels[data.mood] : 'N/A'}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Score: <span className="text-foreground font-medium">{data.score}/10</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="gradient-card shadow-card p-6 border-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Mood Trends
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Last {days} days
          </div>
        </div>

        {averageMood && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Average mood:</span>
            <span className="text-lg font-semibold text-primary">{averageMood}/10</span>
          </div>
        )}

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(12, 76%, 61%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(12, 76%, 61%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 25%, 88%)" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: 'hsl(20, 10%, 50%)' }}
                axisLine={{ stroke: 'hsl(30, 25%, 88%)' }}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 12, fill: 'hsl(20, 10%, 50%)' }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(12, 76%, 61%)"
                strokeWidth={3}
                fill="url(#moodGradient)"
                dot={{ fill: 'hsl(12, 76%, 61%)', strokeWidth: 2, stroke: 'white', r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(12, 76%, 61%)', stroke: 'white', strokeWidth: 2 }}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {entries.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-4">
            Start journaling to see your mood trends! ✨
          </p>
        )}
      </div>
    </Card>
  );
}
