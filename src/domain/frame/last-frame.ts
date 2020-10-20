import { MAX_PINS_COUNT } from '..';
import { Frame} from './frame';

export class LastFrame extends Frame {
    public get isComplete(): boolean {
        if (this.triesCount < 2) {
            return false;
        } else if (this.triesCount == 2) {
            const isThirdThrowAllowed = this.frameTriesSum >= MAX_PINS_COUNT;
            return !isThirdThrowAllowed;
        }
        return true;
    }

    public get pinsAvailable(): number {
        if (this.triesCount == 0) {
            return MAX_PINS_COUNT;
        }
        if (this.isComplete) {
            return 0;
        }
        return this.lastTry == MAX_PINS_COUNT ? MAX_PINS_COUNT : MAX_PINS_COUNT - this.lastTry;
    }

    public getScore(): number | null {
        if (!this.isComplete){
            return null;
        }
        return this.frameTriesSum;
    }
}
