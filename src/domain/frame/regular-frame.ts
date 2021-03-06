import { Frame } from './frame';
import { MAX_PINS_COUNT, TryDisplaySymbol, TrySpecialSymbol } from '..';

const MAX_TRIES_COUNT = 2;

export class RegularFrame extends Frame {
    public get isStrike(): boolean {
        return this._tries.length === 1 && this._tries[0] === MAX_PINS_COUNT;
    }

    public get isSpare(): boolean {
        return this._tries.length === 2 && this.frameTriesSum === MAX_PINS_COUNT;
    }

    public get isComplete(): boolean {
        return this.isStrike || this._tries.length === 2;
    }

    public get frameMaxTries(): number {
        return 2;
    }

    public get pinsAvailable(): number {
        if (this.triesCount === 0) {
            return MAX_PINS_COUNT;
        }
        if (this.isComplete) {
            return 0;
        }
        return MAX_PINS_COUNT - this.lastTry;
    }

    private get nextTriesCountIncludedInScore(): number {
        if (this.isSpare) {
            return 1;
        } else if (this.isStrike) {
            return 2;
        }
        return 0;
    }

    constructor(nextFrame: Frame | null) {
        super();
        this.nextFrame = nextFrame;
    }

    public calculateScore(): number | null {
        if (!this.isComplete) {
            return null;
        }
        if (this.nextTriesCountIncludedInScore === 0) {
            return this.frameTriesSum;
        }
        // Regular frame always should have nextFrame so no problem with that
        const triesSum = (this.nextFrame as Frame).getTriesSum(this.nextTriesCountIncludedInScore);
        if (triesSum == null) {
            // If not all tries were made
            return null;
        }
        return this.frameTriesSum + triesSum;
    }

    protected calculateTryDisplayInfos(): TryDisplaySymbol[] {
        if (this.isStrike) {
            return [TrySpecialSymbol.None, TrySpecialSymbol.Strike];
        }
        if (this.isSpare) {
            return [this._tries[0], TrySpecialSymbol.Spare];
        }
        const res: TryDisplaySymbol[] = Array(MAX_TRIES_COUNT).fill(TrySpecialSymbol.None);
        for (let i = 0; i < this._tries.length; i++) {
            res[i] = this._tries[i];
        }
        return res;
    }
}
