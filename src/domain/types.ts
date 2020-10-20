export type FrameTry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | FrameTryEnum;
export const MAX_PINS_COUNT = 10;


export enum FrameTryEnum {
    None = -1,
    Spare = 20,
    Strike = 100
}

export interface FrameScore {
    tries: FrameTry[];
    score: number | null;
    isComplete: boolean;
}

export interface ScoreTable {
    frameScores: FrameScore[];
    totalScore: number;
    pinsAvailable: number;
    add(pins: number): void
    reset(): void
}