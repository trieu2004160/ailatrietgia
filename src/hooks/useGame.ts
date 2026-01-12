import { useState, useCallback } from 'react';
import { Question, GameState, MONEY_LADDER, MILESTONES } from '@/types/game';
import { sampleQuestions } from '@/data/questions';

const initialState: GameState = {
  currentQuestionIndex: 0,
  selectedAnswer: null,
  answerState: 'selecting',
  lifelines: {
    fiftyFifty: true,
    phoneAFriend: true,
    askAudience: true,
  },
  eliminatedAnswers: [],
  gameOver: false,
  won: false,
  moneyWon: 0,
};

export const useGame = (questions: Question[] = sampleQuestions) => {
  const [state, setState] = useState<GameState>(initialState);
  const [gameStarted, setGameStarted] = useState(false);

  const currentQuestion = questions[state.currentQuestionIndex];

  const startGame = useCallback(() => {
    setState(initialState);
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
          if (state.currentQuestionIndex === questions.length - 1) {
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
      }, 2000);
    }, 1500);
  }, [state.selectedAnswer, state.answerState, state.currentQuestionIndex, currentQuestion, questions.length]);

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

  const usePhoneAFriend = useCallback(() => {
    if (!state.lifelines.phoneAFriend || state.answerState !== 'selecting') return;
    setState(prev => ({
      ...prev,
      lifelines: { ...prev.lifelines, phoneAFriend: false },
    }));
    return currentQuestion.correct;
  }, [state.lifelines.phoneAFriend, state.answerState, currentQuestion]);

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

  const restartGame = useCallback(() => {
    setState(initialState);
    setGameStarted(false);
  }, []);

  return {
    state,
    gameStarted,
    currentQuestion,
    totalQuestions: questions.length,
    startGame,
    selectAnswer,
    lockAnswer,
    useFiftyFifty,
    usePhoneAFriend,
    useAskAudience,
    restartGame,
  };
};
