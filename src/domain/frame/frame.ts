import { FrameTry, FrameTryEnum } from '../types';

export const MAX_PINS_COUNT = 10;

export abstract class Frame {
    protected _tries: number[] = [];
    public nextFrame: Frame | null = null;

    public abstract get isComplete(): boolean;
    public abstract get pinsAvailable(): number;
    public abstract getScore(): number | null;
    
    public get triesCount(): number {
        return this._tries.length;
    }

    public get frameTriesSum(): number {
        return this._tries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    public get lastTry(): number {
        return this.getTry(this.triesCount - 1);
    }

    public get tries(): FrameTry[] {
        return this.calculateTries();
    }

    public getTry(index: number): number {
        if (index < 0 || index >= this._tries.length) {
            throw Error('Invalid try index');
        }
        return this._tries[index];
    }

    public add(pins: number): void {
        if (pins < 0 || pins > MAX_PINS_COUNT) {
            throw Error('Invalid pin value, must be in range between 0 and 10');
        }
        if (this.isComplete) {
            throw Error('Frame is already full');
        }
        if (pins > this.pinsAvailable) {
            throw Error(`Only ${this.pinsAvailable} pins are available now on the lane`);
        }
        this._tries.push(pins);
    }

    public reset(): void {
        this._tries = [];
    }

    // Get tries sum of this frame and also can follow next frames
    public getTriesSum(count: number): number | null {
        if (count < 1 || count > 2) {
            throw Error('getTriesSum support only 1 and 2 values');
        }
        let sum = 0;
        for (let i = 0; i < Math.min(count, this._tries.length); i++) {
            sum += this._tries[i];
        }
        const remainingCount = count > this._tries.length ? count - this._tries.length : 0;
        if (remainingCount == 0) {
            return sum;
        }
        const nextFrame = this.nextFrame as Frame;
        if (nextFrame == null) {
            return null;
        }
        const nextTriesSum = nextFrame.getTriesSum(remainingCount);
        if (nextTriesSum == null) {
            return null;
        }
        return sum + nextTriesSum;
    }

    private calculateTries() {
        const res = [];
        for (let i = 0; i < this._tries.length; i++) {
            const curTry = this._tries[i];
            if (i > 0 && curTry > 0 && this._tries[i - 1] + curTry === MAX_PINS_COUNT) {
                res.push(FrameTryEnum.Spare);
            } else if (curTry === MAX_PINS_COUNT) {
                res.push(FrameTryEnum.Strike);
            } else {
                res.push(curTry);
            }
        }
        // fill with none values
        if (res.length < 2) {
            for (let i = res.length; i < 2; i++) {
                res.push(FrameTryEnum.None);
            }
        }
        return res;
    }
}
