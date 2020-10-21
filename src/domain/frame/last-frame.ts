import { Frame } from './frame';
import { MAX_PINS_COUNT, TryDisplaySymbol, TrySpecialSymbol } from '..';

const MAX_TRIES_COUNT = 3;

export class LastFrame extends Frame {
    public get isComplete(): boolean {
        if (this.triesCount < 2) {
            return false;
        } else if (this.triesCount === 2) {
            const isThirdThrowAllowed = this.frameTriesSum >= MAX_PINS_COUNT;
            return !isThirdThrowAllowed;
        }
        return true;
    }

    public get pinsAvailable(): number {
        if (this.triesCount === 0) {
            return MAX_PINS_COUNT;
        }
        if (this.isComplete) {
            return 0;
        }
        const lastStrike = this.lastTry === MAX_PINS_COUNT;
        const lastSpare =
            this._tries.length > 1 &&
            this._tries[this._tries.length - 1] + this._tries[this._tries.length - 2] === MAX_PINS_COUNT;
        return lastStrike || lastSpare ? MAX_PINS_COUNT : MAX_PINS_COUNT - this.lastTry;
    }

    public calculateScore(): number | null {
        if (!this.isComplete) {
            return null;
        }
        return this.frameTriesSum;
    }

    protected calculateTryDisplayInfos(): TryDisplaySymbol[] {
        const res: TryDisplaySymbol[] = Array(MAX_TRIES_COUNT).fill(TrySpecialSymbol.None);
        for (let i = 0; i < this._tries.length; i++) {
            if (this._tries[i] === MAX_PINS_COUNT) {
                res[i] = TrySpecialSymbol.Strike;
            } else if (i > 0 && this._tries[i] > 0 && this._tries[i] + this._tries[i - 1] === MAX_PINS_COUNT) {
                res[i] = TrySpecialSymbol.Spare;
            } else {
                res[i] = this._tries[i];
            }
        }
        return res;
    }
}
