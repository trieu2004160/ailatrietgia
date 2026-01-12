interface QuestionDisplayProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
}

const QuestionDisplay = ({ questionNumber, totalQuestions, question }: QuestionDisplayProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center">
        <span className="font-display text-primary text-lg uppercase tracking-widest">
          Câu hỏi {questionNumber}/{totalQuestions}
        </span>
      </div>
      <div className="question-box">
        <p className="text-foreground leading-relaxed">{question}</p>
      </div>
    </div>
  );
};

export default QuestionDisplay;
