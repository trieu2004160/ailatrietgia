import { Trophy, XCircle, RotateCcw } from 'lucide-react';

interface GameOverProps {
  won: boolean;
  moneyWon: number;
  onRestart: () => void;
}

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};

const GameOver = ({ won, moneyWon, onRestart }: GameOverProps) => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center space-y-8 p-8">
        {won ? (
          <>
            <Trophy className="w-24 h-24 text-primary mx-auto float" />
            <h2 className="game-title text-3xl md:text-5xl">
              Chúc Mừng!
            </h2>
            <p className="text-2xl text-foreground font-display">
              Bạn đã trở thành
            </p>
            <p className="text-4xl md:text-6xl font-display text-primary pulse-glow inline-block px-8 py-4 rounded-lg bg-card/50">
              TRIỆU PHÚ!
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-24 h-24 text-destructive mx-auto" />
            <h2 className="font-display text-3xl md:text-4xl text-destructive">
              Rất Tiếc!
            </h2>
            <p className="text-xl text-foreground">
              Bạn đã trả lời sai
            </p>
          </>
        )}
        
        <div className="space-y-2">
          <p className="text-muted-foreground">Số tiền bạn nhận được:</p>
          <p className="text-3xl md:text-4xl font-display text-primary">
            {formatMoney(moneyWon)}
          </p>
        </div>
        
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display text-xl uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
        >
          <RotateCcw className="w-6 h-6" />
          Chơi Lại
        </button>
      </div>
    </div>
  );
};

export default GameOver;
