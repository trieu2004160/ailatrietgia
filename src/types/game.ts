export interface Question {
  id: number;
  question: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: 'A' | 'B' | 'C' | 'D';
}

export interface GameState {
  currentQuestionIndex: number;
  currentQuestionSetIndex: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  answerState: 'selecting' | 'locked' | 'revealed';
  lifelines: {
    fiftyFifty: boolean;
    askAudience: boolean;
    askExpert: boolean;
  };
  eliminatedAnswers: ('A' | 'B' | 'C' | 'D')[];
  gameOver: boolean;
  won: boolean;
  moneyWon: number;
}

export const MONEY_LADDER = [
  2000,        // 1
  4000,        // 2
  6000,        // 3
  8000,        // 4
  10000,       // 5 - Milestone
  15000,       // 6
  20000,       // 7
  30000,       // 8
  40000,       // 9
  50000,       // 10 - Milestone
  55000,       // 11
  60000,       // 12
  65000,       // 13
  70000,       // 14
  80000,       // 15 - Winner!
];

export const MILESTONES = [4, 9, 14]; // 0-indexed positions for 10000, 50000, 80000
