import { Frame } from '../frame/frame';
import { FRAMES_COUNT, IScoreTable, IBowlingScoreApp } from '../types';
import { RegularFrame } from '../frame/regular-frame';
import { LastFrame } from '../frame/last-frame';
import { ScoreTable } from '../score-table/score-table';

export class BowlingScoreApp implements IBowlingScoreApp {
    private readonly _frames: Frame[] = Array(FRAMES_COUNT);
    private _currentFrameIndex = 0;
    private _scoreTable: ScoreTable;

    get scoreTable(): IScoreTable {
        return this._scoreTable;
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

    get isUndoAvailable(): boolean {
        return this.currentFrameIndex > 0 || this.currentFrame.triesCount > 0;
    }

    constructor() {
        this._frames[FRAMES_COUNT - 1] = new LastFrame();
        for (let i = FRAMES_COUNT - 2; i >= 0; i--) {
            const frame = new RegularFrame(this._frames[i + 1]);
            this._frames[i] = frame;
        }
        this._scoreTable = new ScoreTable(this._frames);
    }

    add(pins: number): void {
        this.currentFrame.add(pins);
        if (this.currentFrame.isComplete) {
            this.nextFrame();
        }
    }

    undo(): void {
        if (this.currentFrame.triesCount > 0) {
            this.currentFrame.undo();
        } else if (this.currentFrame.triesCount === 0 && this._currentFrameIndex > 0) {
            this._currentFrameIndex -= 1;
            this.currentFrame.undo();
        }
    }

    isInputValid(pins: number): boolean {
        return this.currentFrame.isInputValid(pins);
    }

    reset(): void {
        this._frames.forEach((x) => x.reset());
        this._currentFrameIndex = 0;
    }

    private nextFrame(): void {
        if (this._currentFrameIndex < FRAMES_COUNT - 1) {
            this._currentFrameIndex++;
        }
    }
}
