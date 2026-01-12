import { cn } from '@/lib/utils';

interface AnswerButtonProps {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isCorrect: boolean | null;
  isRevealed: boolean;
  isEliminated: boolean;
  disabled: boolean;
}

const AnswerButton = ({
  letter,
  text,
  onClick,
  isSelected,
  isCorrect,
  isRevealed,
  isEliminated,
  disabled
}: AnswerButtonProps) => {
  const getStateClass = () => {
    if (isEliminated) return 'opacity-20 pointer-events-none';
    if (isRevealed && isCorrect) return 'correct';
    if (isRevealed && isSelected && !isCorrect) return 'wrong';
    if (isSelected) return 'selected';
    return '';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isEliminated}
      className={cn(
        "answer-hexagon w-full text-left cursor-pointer animate-slide-up",
        getStateClass(),
        disabled && !isRevealed && 'pointer-events-none'
      )}
      style={{
        animationDelay: `${['A', 'B', 'C', 'D'].indexOf(letter) * 0.1}s`
      }}
    >
      <span className="text-primary font-bold mr-3">{letter}:</span>
      <span className="text-foreground">{text}</span>
    </button>
  );
};

export default AnswerButton;
