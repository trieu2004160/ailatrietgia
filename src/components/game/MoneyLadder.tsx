import { MONEY_LADDER, MILESTONES } from '@/types/game';
import { cn } from '@/lib/utils';

interface MoneyLadderProps {
  currentLevel: number;
}

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};

const MoneyLadder = ({ currentLevel }: MoneyLadderProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
      <h3 className="font-display text-lg text-primary text-center mb-4 uppercase tracking-wider">
        Thang Tiền Thưởng
      </h3>
      <div className="space-y-1">
        {[...MONEY_LADDER].reverse().map((amount, reversedIndex) => {
          const index = MONEY_LADDER.length - 1 - reversedIndex;
          const isCurrent = index === currentLevel;
          const isPassed = index < currentLevel;
          const isMilestone = MILESTONES.includes(index);
          
          return (
            <div
              key={index}
              className={cn(
                "money-step flex justify-between items-center",
                isCurrent && "current",
                isPassed && "passed",
                isMilestone && "milestone"
              )}
            >
              <span className="text-sm opacity-60">{index + 1}</span>
              <span className={cn(
                "text-sm md:text-base",
                isCurrent && "text-lg font-bold"
              )}>
                {formatMoney(amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoneyLadder;
