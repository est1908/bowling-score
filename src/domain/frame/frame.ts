import { TryDisplaySymbol, TrySpecialSymbol, MAX_PINS_COUNT } from '../types';


export abstract class Frame {
    protected _tries: number[] = [];
    public nextFrame: Frame | null = null;

    public abstract get isComplete(): boolean;
    public abstract get pinsAvailable(): number;
    public abstract calculateScore(): number | null;
    protected abstract calculateTryDisplayInfos(): TryDisplaySymbol[];
    
    public get triesCount(): number {
        return this._tries.length;
    }

    public get frameTriesSum(): number {
        return this._tries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    public get lastTry(): number {
        return this._tries[this._tries.length - 1];
    }

    public get tryDisplayInfos(): TryDisplaySymbol[] {
        return this.calculateTryDisplayInfos();
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
}
