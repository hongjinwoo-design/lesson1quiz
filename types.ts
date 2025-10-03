export interface QuizQuestion {
    id: number;
    type: string;
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
}

export interface OptionButtonProps {
    option: string;
    index: number;
    selected: number | null;
    isCorrect: boolean;
    isAnswered: boolean;
    onClick: (index: number) => void;
    isSpecialCase: boolean;
}

export interface IconProps {
    className?: string;
    fill?: string;
}

export type Difficulty = 'easy' | 'hard';
export type GameState = 'selectingDifficulty' | 'playing' | 'results';

export interface TimerProps {
    timeLeft: number;
    duration: number;
}

export interface DifficultySelectorProps {
    onSelectDifficulty: (difficulty: Difficulty) => void;
}
