import { X } from 'lucide-react';

interface AudiencePollProps {
  percentages: { A: number; B: number; C: number; D: number };
  eliminatedAnswers: ('A' | 'B' | 'C' | 'D')[];
  onClose: () => void;
}

const AudiencePoll = ({ percentages, eliminatedAnswers, onClose }: AudiencePollProps) => {
  const answers = ['A', 'B', 'C', 'D'] as const;
  const maxPercentage = Math.max(...Object.values(percentages));

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-gold/30 rounded-lg p-6 md:p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-xl text-primary uppercase tracking-wider">
            Ý Kiến Khán Giả
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          {answers.map((letter) => {
            const isEliminated = eliminatedAnswers.includes(letter);
            const percentage = isEliminated ? 0 : percentages[letter];
            const isHighest = percentage === maxPercentage && !isEliminated;
            
            return (
              <div key={letter} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={`font-display ${isHighest ? 'text-primary' : 'text-foreground'}`}>
                    {letter}
                  </span>
                  <span className={isHighest ? 'text-primary font-bold' : 'text-muted-foreground'}>
                    {percentage}%
                  </span>
                </div>
                <div className="h-8 bg-navy-lighter rounded-sm overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${
                      isHighest ? 'bg-primary' : 'bg-secondary'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-primary/20 text-primary font-display uppercase tracking-wider rounded hover:bg-primary/30 transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default AudiencePoll;
