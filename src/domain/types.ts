export const MAX_PINS_COUNT = 10;
export const FRAMES_COUNT = 10;

export interface IBowlingScoreApp {
    scoreTable: IScoreTable;
    currentFrameIndex: number;
    add(pins: number): void;
    isInputValid(pins: number): boolean;
    isUndoAvailable: boolean;
    pinsAvailable: number;
    isGameFinished: boolean;
    reset(): void;
    undo(): void;
}

export interface IScoreTable {
    frameScores: IFrameScore[];
    totalScore: number;
}

export interface IFrameScore {
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
