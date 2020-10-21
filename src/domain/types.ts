export const MAX_PINS_COUNT = 10;

export interface ScoreTable {
    frameScores: FrameScore[];
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
    currentFrameIndex: number;
    add(pins: number): void;
    reset(): void;
}

export interface FrameScore {
    tries: TryDisplaySymbol[];
    score: number | null;
    accumulatedScore: number | null; // current frame score + sum of previous frames score
    isComplete: boolean;
}

export type TryDisplaySymbol = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | TrySpecialSymbol;

export enum TrySpecialSymbol {
    None = -1,
    Spare = 20,
    Strike = 100
}
