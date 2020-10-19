const MAX_PINS_COUNT = 10;

export class Frame {
  private _tries = [];

  public get tries() {
    return this._tries;
  }

  public get isStrike(): boolean {
    return this.tries.length == 1 && this._tries[0] === 10;
  }

  public get isSpare(): boolean {
    return this.tries.length == 2 && this.tries[0] + this.tries[1] == MAX_PINS_COUNT;
  }

  constructor(private isLast: boolean = false) {}

  add(pins) {
    if (pins < 0 || pins > MAX_PINS_COUNT) {
      throw Error('Invalid pin value, it must be between 0 and 10');
    }
    if (this.tries.length == 2) {
      throw Error('Only 2 attempts are allowed');
    }
    this.tries.push(pins);
  }
}
