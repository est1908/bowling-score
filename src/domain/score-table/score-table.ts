import { Frame } from '../frame/frame';
import { FRAMES_COUNT, IFrameScore, IScoreTable } from '../types';

export class ScoreTable implements IScoreTable {
    private readonly _frames: Frame[] = Array(FRAMES_COUNT);

    get totalScore(): number {
        return this._frames.reduce((accumulator, curFrame) => accumulator + (curFrame.calculateScore() || 0), 0);
    }

    get frameScores(): IFrameScore[] {
        // i use forEach because is more readable here than reduce version
        const res: IFrameScore[] = [];
        let scoresAccumulator = 0;

        this._frames.forEach((curFrame) => {
            const score = curFrame.calculateScore();
            const frameScore: IFrameScore = {
                tries: curFrame.tryDisplayInfos,
                isComplete: curFrame.isComplete,
                accumulatedScore: score !== null ? score + scoresAccumulator : null,
                score
            };
            res.push(frameScore);
            scoresAccumulator += score !== null ? score : 0;
        });
        return res;
    }

    constructor(frames: Frame[]) {
        this._frames = frames;
    }
}
