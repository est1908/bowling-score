import { Frame, MAX_PINS_COUNT } from './frame';

export class RegularFrame extends Frame {
    public get isStrike(): boolean {
        return this._tries.length == 1 && this._tries[0] === MAX_PINS_COUNT;
    }

    public get isSpare(): boolean {
        return this._tries.length == 2 && this.triesSum == MAX_PINS_COUNT;
    }

    public get isFull(): boolean {
        return this.isStrike || this._tries.length == 2;
    }

    public get pinsAvailable(): number {
        if (this.triesCount == 0) {
            return MAX_PINS_COUNT;
        }
        if (this.isFull) {
            return 0;
        }
        return MAX_PINS_COUNT - this.lastTry;
    }
}
