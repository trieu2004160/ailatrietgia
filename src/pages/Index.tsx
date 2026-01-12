import { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import StartScreen from '@/components/game/StartScreen';
import QuestionDisplay from '@/components/game/QuestionDisplay';
import AnswerButton from '@/components/game/AnswerButton';
import MoneyLadder from '@/components/game/MoneyLadder';
import Lifelines from '@/components/game/Lifelines';
import GameOver from '@/components/game/GameOver';
import AudiencePoll from '@/components/game/AudiencePoll';
import PhoneFriend from '@/components/game/PhoneFriend';
import { Check } from 'lucide-react';

const Index = () => {
  const {
    state,
    gameStarted,
    currentQuestion,
    totalQuestions,
    startGame,
    selectAnswer,
    lockAnswer,
    useFiftyFifty,
    usePhoneAFriend,
    useAskAudience,
    restartGame,
  } = useGame();

  const [showAudiencePoll, setShowAudiencePoll] = useState(false);
  const [audiencePercentages, setAudiencePercentages] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [showPhoneFriend, setShowPhoneFriend] = useState(false);

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  const handleAskAudience = () => {
    const percentages = useAskAudience();
    if (percentages) {
      setAudiencePercentages(percentages);
      setShowAudiencePoll(true);
    }
  };

  const handlePhoneFriend = () => {
    usePhoneAFriend();
    setShowPhoneFriend(true);
  };

  const answers = ['A', 'B', 'C', 'D'] as const;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="spotlight" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="game-title text-2xl md:text-4xl">AI LÀ TRIỆU PHÚ</h1>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-6">
          {/* Main Game Area */}
          <div className="space-y-6">
            {/* Lifelines */}
            <Lifelines
              fiftyFifty={state.lifelines.fiftyFifty}
              phoneAFriend={state.lifelines.phoneAFriend}
              askAudience={state.lifelines.askAudience}
              onUseFiftyFifty={useFiftyFifty}
              onUsePhoneAFriend={handlePhoneFriend}
              onUseAskAudience={handleAskAudience}
              disabled={state.answerState !== 'selecting'}
            />

            {/* Question */}
            <QuestionDisplay
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              question={currentQuestion.question}
            />

            {/* Answers */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {answers.map((letter) => (
                <AnswerButton
                  key={letter}
                  letter={letter}
                  text={currentQuestion.answers[letter]}
                  onClick={() => selectAnswer(letter)}
                  isSelected={state.selectedAnswer === letter}
                  isCorrect={letter === currentQuestion.correct}
                  isRevealed={state.answerState === 'revealed'}
                  isEliminated={state.eliminatedAnswers.includes(letter)}
                  disabled={state.answerState !== 'selecting'}
                />
              ))}
            </div>

            {/* Lock Answer Button */}
            {state.selectedAnswer && state.answerState === 'selecting' && (
              <div className="flex justify-center animate-scale-in">
                <button
                  onClick={lockAnswer}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display text-lg uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
                >
                  <Check className="w-5 h-5" />
                  Xác Nhận
                </button>
              </div>
            )}

            {state.answerState === 'locked' && (
              <div className="text-center">
                <p className="font-display text-xl text-primary animate-pulse">
                  Đáp án của bạn: {state.selectedAnswer}...
                </p>
              </div>
            )}
          </div>

          {/* Money Ladder */}
          <div className="hidden md:block">
            <MoneyLadder currentLevel={state.currentQuestionIndex} />
          </div>
        </div>

        {/* Mobile Money Display */}
        <div className="md:hidden mt-6">
          <MoneyLadder currentLevel={state.currentQuestionIndex} />
        </div>
      </div>

      {/* Modals */}
      {state.gameOver && (
        <GameOver
          won={state.won}
          moneyWon={state.moneyWon}
          onRestart={restartGame}
        />
      )}

      {showAudiencePoll && (
        <AudiencePoll
          percentages={audiencePercentages}
          eliminatedAnswers={state.eliminatedAnswers}
          onClose={() => setShowAudiencePoll(false)}
        />
      )}

      {showPhoneFriend && (
        <PhoneFriend
          correctAnswer={currentQuestion.correct}
          eliminatedAnswers={state.eliminatedAnswers}
          onClose={() => setShowPhoneFriend(false)}
        />
      )}
    </div>
  );
};

export default Index;
