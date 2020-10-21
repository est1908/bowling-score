import { Frame } from '../frame/frame';
import { FrameScore, ScoreTable } from '../types';
import { LastFrame, RegularFrame } from '../frame/index';

export const FRAMES_COUNT = 10;

export class ScoreTableDefault implements ScoreTable {
    private readonly _frames: Frame[] = Array(FRAMES_COUNT);
    private _currentFrameIndex = 0;

    get totalScore(): number {
        return this._frames.reduce((accumulator, curFrame) => accumulator + (curFrame.calculateScore() || 0), 0);
    }

    get currentFrameIndex(): number {
        return this._currentFrameIndex;
    }

    get isGameFinished(): boolean {
        return this._currentFrameIndex === FRAMES_COUNT - 1 && this.currentFrame.isComplete;
    }

    get currentFrame(): Frame {
        return this._frames[this.currentFrameIndex];
    }

    get pinsAvailable(): number {
        return this.currentFrame.pinsAvailable;
    }

    get frameScores(): FrameScore[] {
        // i use forEach because is more readable here than reduce version
        const res: FrameScore[] = [];
        let scoresAccumulator = 0;

        this._frames.forEach((curFrame) => {
            const score = curFrame.calculateScore();
            const frameScore: FrameScore = {
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

    constructor() {
        for (let i = FRAMES_COUNT - 1; i >= 0; i--) {
            const frame = i === FRAMES_COUNT - 1 ? new LastFrame() : new RegularFrame(this._frames[i + 1]);
            this._frames[i] = frame;
        }
    }

    add(pins: number): void {
        this.currentFrame.add(pins);
        if (this.currentFrame.isComplete) {
            this.nextFrame();
        }
    }

    reset() {
        this._frames.forEach((x) => x.reset());
        this._currentFrameIndex = 0;
    }

    private nextFrame(): void {
        if (this._currentFrameIndex < FRAMES_COUNT - 1) {
            this._currentFrameIndex++;
        }
    }
}
