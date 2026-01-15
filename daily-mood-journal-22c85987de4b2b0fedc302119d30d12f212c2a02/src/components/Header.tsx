import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center py-8 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Sparkles className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Vibe Check
        </h1>
      </div>
      <p className="text-lg text-muted-foreground font-serif italic">
        Your AI-powered mood journal ✨
      </p>
    </header>
  );
}
