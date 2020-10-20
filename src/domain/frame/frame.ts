export const MAX_PINS_COUNT = 10;

export abstract class Frame {
    protected _tries: number[] = [];

    public abstract get isFull(): boolean;
    public abstract get pinsAvailable(): number;

    public get triesCount(): number {
        return this._tries.length;
    }

    public get triesSum(): number {
        return this._tries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    public get lastTry(): number {
        return this.getTry(this.triesCount - 1);
    }

    public getTry(index: number): number {
        if (index < 0 || index >= this._tries.length) {
            throw Error('Invalid try index');
        }
        return this._tries[index];
    }

    public add(pins: number) {
        this.validatePins(pins);
        this.validateFull();
        this.validatePinsAvailable(pins);
        this._tries.push(pins);
    }

    private validatePins(pins: number) {
        if (pins < 0 || pins > MAX_PINS_COUNT) {
            throw Error('Invalid pin value, must be in range between 0 and 10');
        }
    }

    private validateFull() {
        if (this.isFull) {
            throw Error('Frame is already full');
        }
    }

    private validatePinsAvailable(pins: number) {
        if (pins > this.pinsAvailable) {
            throw Error(`Only ${this.pinsAvailable} are available now on the lane`);
        }
    }
}
