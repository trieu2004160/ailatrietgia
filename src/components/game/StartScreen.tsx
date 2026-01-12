import { Play, Trophy } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="spotlight" />
      
      <div className="text-center space-y-8 animate-fade-in relative z-10">
        <div className="float">
          <Trophy className="w-20 h-20 md:w-28 md:h-28 text-primary mx-auto" />
        </div>
        
        <h1 className="game-title leading-tight">
          AI LÀ<br />TRIỆU PHÚ
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          Trả lời 15 câu hỏi để trở thành triệu phú!
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-display text-xl uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all hover:scale-105 pulse-glow"
          >
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Bắt Đầu
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>🎯 50:50 • 📞 Gọi người thân • 👥 Hỏi khán giả</p>
          <p>3 quyền trợ giúp để giúp bạn</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
