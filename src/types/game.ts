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
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  answerState: 'selecting' | 'locked' | 'revealed';
  lifelines: {
    fiftyFifty: boolean;
    phoneAFriend: boolean;
    askAudience: boolean;
  };
  eliminatedAnswers: ('A' | 'B' | 'C' | 'D')[];
  gameOver: boolean;
  won: boolean;
  moneyWon: number;
}

export const MONEY_LADDER = [
  200000,      // 1
  400000,      // 2
  600000,      // 3
  1000000,     // 4
  2000000,     // 5 - Milestone
  3000000,     // 6
  6000000,     // 7
  10000000,    // 8
  14000000,    // 9
  22000000,    // 10 - Milestone
  30000000,    // 11
  40000000,    // 12
  60000000,    // 13
  85000000,    // 14
  150000000,   // 15 - Winner!
];

export const MILESTONES = [4, 9, 14]; // 0-indexed positions for 2M, 22M, 150M
