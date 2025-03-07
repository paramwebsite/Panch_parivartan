export interface StateInfo {
    id: string;
    name: string;
    facts: {
      attire: string;
      language: string;
      food: string;
      dance: string;
      festival: string;
    };
  }
  
  export interface Question {
    id: string;
    text: string;
    correctState: string;
    category: 'attire' | 'language' | 'food' | 'dance' | 'festival';
  }
  
  export interface GameState {
    score: number;
    currentQuestion: Question | null;
    showFeedback: boolean;
    isCorrect: boolean;
  }