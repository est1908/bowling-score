import { Frame } from '../frame/frame';
import { LastFrame, RegularFrame } from '../frame/index';
import { FrameScore, ScoreTable } from '../types';

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
        return this._currentFrameIndex == FRAMES_COUNT - 1 && this.currentFrame.isComplete;
    }

    get currentFrame(): Frame {
        return this._frames[this.currentFrameIndex];
    }

    get pinsAvailable(): number {
        return this.currentFrame.pinsAvailable;
    }

    get frameScores(): FrameScore[] {
        return this._frames.map((curFrame, i) => ({
            tries: curFrame.tryDisplayInfos,
            isComplete: curFrame.isComplete,
            score: curFrame.calculateScore()
        }));
    }

    constructor() {
        for (let i = FRAMES_COUNT - 1; i >= 0; i--) {
            const frame = i == FRAMES_COUNT - 1 ? new LastFrame() : new RegularFrame(this._frames[i+1]);
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
