import { Phone, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PhoneFriendProps {
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  eliminatedAnswers: ('A' | 'B' | 'C' | 'D')[];
  onClose: () => void;
}

const PhoneFriend = ({ correctAnswer, eliminatedAnswers, onClose }: PhoneFriendProps) => {
  const [message, setMessage] = useState('Đang kết nối...');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessage('Xin chào! Để tôi nghĩ xem...');
    }, 1500);

    const timer2 = setTimeout(() => {
      // 80% chance friend is correct
      const isCorrect = Math.random() < 0.8;
      const availableAnswers = ['A', 'B', 'C', 'D'].filter(
        a => !eliminatedAnswers.includes(a as 'A' | 'B' | 'C' | 'D')
      ) as ('A' | 'B' | 'C' | 'D')[];
      
      let suggestedAnswer: 'A' | 'B' | 'C' | 'D';
      
      if (isCorrect) {
        suggestedAnswer = correctAnswer;
      } else {
        const wrongAnswers = availableAnswers.filter(a => a !== correctAnswer);
        suggestedAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)] || correctAnswer;
      }

      const confidence = isCorrect ? 
        ['Tôi khá chắc', 'Tôi nghĩ', 'Theo tôi biết'][Math.floor(Math.random() * 3)] :
        ['Tôi đoán là', 'Có thể là', 'Tôi không chắc lắm, nhưng'][Math.floor(Math.random() * 3)];

      setMessage(`${confidence} đáp án là ${suggestedAnswer}!`);
      setShowAnswer(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [correctAnswer, eliminatedAnswers]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-gold/30 rounded-lg p-6 md:p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-xl text-primary uppercase tracking-wider">
            Gọi Điện Người Thân
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center space-y-6">
          <div className={`w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center ${!showAnswer && 'animate-pulse'}`}>
            <Phone className="w-10 h-10 text-primary" />
          </div>
          
          <p className="text-lg text-foreground font-display">
            "{message}"
          </p>
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

export default PhoneFriend;
