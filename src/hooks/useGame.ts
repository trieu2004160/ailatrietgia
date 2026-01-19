import { useState, useCallback } from 'react';
import { Question, GameState, MONEY_LADDER, MILESTONES } from '@/types/game';
import { allQuestionSets } from '@/data/questions';

const initialState: GameState = {
  currentQuestionIndex: 0,
  currentQuestionSetIndex: 0,
  selectedAnswer: null,
  answerState: 'selecting',
  lifelines: {
    fiftyFifty: true,
    askAudience: true,
    askExpert: true,
  },
  eliminatedAnswers: [],
  gameOver: false,
  won: false,
  moneyWon: 0,
};

export const useGame = () => {
  const [state, setState] = useState<GameState>(initialState);
  const [gameStarted, setGameStarted] = useState(false);

  const currentQuestions = allQuestionSets[state.currentQuestionSetIndex];
  const currentQuestion = currentQuestions[state.currentQuestionIndex];

  const startGame = useCallback(() => {
    setState(prev => ({
      ...initialState,
      currentQuestionSetIndex: prev.currentQuestionSetIndex, // Keep the current question set
    }));
    setGameStarted(true);
  }, []);

  const selectAnswer = useCallback((answer: 'A' | 'B' | 'C' | 'D') => {
    if (state.answerState !== 'selecting') return;
    setState(prev => ({ ...prev, selectedAnswer: answer }));
  }, [state.answerState]);

  const lockAnswer = useCallback(() => {
    if (!state.selectedAnswer || state.answerState !== 'selecting') return;
    setState(prev => ({ ...prev, answerState: 'locked' }));

    // Reveal answer after delay
    setTimeout(() => {
      setState(prev => ({ ...prev, answerState: 'revealed' }));

      // Check if correct
      setTimeout(() => {
        const isCorrect = state.selectedAnswer === currentQuestion.correct;

        if (isCorrect) {
          if (state.currentQuestionIndex === currentQuestions.length - 1) {
            // Won the game!
            setState(prev => ({
              ...prev,
              gameOver: true,
              won: true,
              moneyWon: MONEY_LADDER[prev.currentQuestionIndex],
            }));
          } else {
            // Next question
            setState(prev => ({
              ...prev,
              currentQuestionIndex: prev.currentQuestionIndex + 1,
              selectedAnswer: null,
              answerState: 'selecting',
              eliminatedAnswers: [],
            }));
          }
        } else {
          // Wrong answer - calculate money won
          let moneyWon = 0;
          for (let i = MILESTONES.length - 1; i >= 0; i--) {
            if (state.currentQuestionIndex > MILESTONES[i]) {
              moneyWon = MONEY_LADDER[MILESTONES[i]];
              break;
            }
          }

          setState(prev => ({
            ...prev,
            gameOver: true,
            won: false,
            moneyWon,
          }));
        }
      }, 1000);
    }, 1500);
  }, [state.selectedAnswer, state.answerState, state.currentQuestionIndex, state.currentQuestionSetIndex, currentQuestion, currentQuestions.length]);

  const useFiftyFifty = useCallback(() => {
    if (!state.lifelines.fiftyFifty || state.answerState !== 'selecting') return;

    const wrongAnswers = (['A', 'B', 'C', 'D'] as const).filter(
      a => a !== currentQuestion.correct && !state.eliminatedAnswers.includes(a)
    );

    // Randomly eliminate 2 wrong answers
    const shuffled = [...wrongAnswers].sort(() => Math.random() - 0.5);
    const toEliminate = shuffled.slice(0, 2);

    setState(prev => ({
      ...prev,
      lifelines: { ...prev.lifelines, fiftyFifty: false },
      eliminatedAnswers: [...prev.eliminatedAnswers, ...toEliminate],
    }));
  }, [state.lifelines.fiftyFifty, state.answerState, currentQuestion, state.eliminatedAnswers]);

  const useAskAudience = useCallback(() => {
    if (!state.lifelines.askAudience || state.answerState !== 'selecting') return;

    setState(prev => ({
      ...prev,
      lifelines: { ...prev.lifelines, askAudience: false },
    }));

    // Generate poll percentages
    const correct = currentQuestion.correct;
    const available = (['A', 'B', 'C', 'D'] as const).filter(
      a => !state.eliminatedAnswers.includes(a)
    );

    const percentages = { A: 0, B: 0, C: 0, D: 0 };
    let remaining = 100;

    // Give correct answer 50-70%
    const correctPercentage = Math.floor(Math.random() * 20) + 50;
    percentages[correct] = correctPercentage;
    remaining -= correctPercentage;

    // Distribute rest among available wrong answers
    const wrongAvailable = available.filter(a => a !== correct);
    wrongAvailable.forEach((answer, i) => {
      if (i === wrongAvailable.length - 1) {
        percentages[answer] = remaining;
      } else {
        const portion = Math.floor(Math.random() * remaining);
        percentages[answer] = portion;
        remaining -= portion;
      }
    });

    return percentages;
  }, [state.lifelines.askAudience, state.answerState, currentQuestion, state.eliminatedAnswers]);

  const useAskExpert = useCallback(() => {
    if (!state.lifelines.askExpert || state.answerState !== 'selecting') return;
    setState(prev => ({
      ...prev,
      lifelines: { ...prev.lifelines, askExpert: false },
    }));
    return currentQuestion.correct;
  }, [state.lifelines.askExpert, state.answerState, currentQuestion]);

  const restartGame = useCallback(() => {
    setState(prev => {
      // Switch to the next question set (toggle between 0 and 1)
      let newQuestionSetIndex = prev.currentQuestionSetIndex;
      if (allQuestionSets.length > 1) {
        // Simple toggle: if current is 0, go to 1; if 1, go to 0
        newQuestionSetIndex = (prev.currentQuestionSetIndex + 1) % allQuestionSets.length;
      }

      return {
        ...initialState,
        currentQuestionSetIndex: newQuestionSetIndex,
      };
    });
    setGameStarted(false);
  }, []);

  return {
    state,
    gameStarted,
    currentQuestion,
    totalQuestions: currentQuestions.length,
    startGame,
    selectAnswer,
    lockAnswer,
    useFiftyFifty,
    useAskAudience,
    useAskExpert,
    restartGame,
  };
};
