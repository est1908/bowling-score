export enum FrameTryEnum {
    None = -1,
    Spare = 20,
    Strike = 100
}

export type FrameTry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | FrameTryEnum;

export interface FrameScore {
    tries: FrameTry[];
    score: number | null;
    isComplete: boolean;
}
