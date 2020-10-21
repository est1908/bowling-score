import { TrySpecialSymbol } from '..';
import { LastFrame } from './last-frame';

describe('last frame', () => {
    describe('positive cases', () => {
        it('should be initialized properly', () => {
            const frame = createFrame();
            expect(frame.triesCount).toBe(0);
            expect(frame.tryDisplayInfos).toEqual([
                TrySpecialSymbol.None,
                TrySpecialSymbol.None,
                TrySpecialSymbol.None
            ]);
            expect(frame.pinsAvailable).toBe(10);
            expect(frame.isComplete).toBeFalsy();
        });

        //todo: add shadow to fields
        //todo: add shadow to next cell
        //todo: next step to move strike
        //todo: remove get try
        it('should allow 2 attempts unless strike or spare', () => {
            const frame = createFrame();
            frame.add(1);
            frame.add(5);
            expect(frame.triesCount).toBe(2);
            expect(frame.tryDisplayInfos).toEqual([1, 5, TrySpecialSymbol.None]);
            expect(frame.isComplete).toBeTruthy();
        });
        it('should allow 3 attempts due to spare', () => {
            const frame = createFrame();
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(5);
            expect(frame.pinsAvailable).toBe(5);
            frame.add(2);
            expect(frame.triesCount).toBe(3);
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.Strike, 5, 2]);
            expect(frame.isComplete).toBeTruthy();
        });

        it('should allow 3 strikes at last attempt', () => {
            const frame = createFrame();
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(10);
            expect(frame.triesCount).toBe(3);
            expect(frame.tryDisplayInfos).toEqual([
                TrySpecialSymbol.Strike,
                TrySpecialSymbol.Strike,
                TrySpecialSymbol.Strike
            ]);
            expect(frame.isComplete).toBeTruthy();
        });

        it('should allow 2 first strikes and last zero', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(0);
            expect(frame.triesCount).toBe(3);
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.Strike, TrySpecialSymbol.Strike, 0]);
            expect(frame.isComplete).toBeTruthy();
        });

        it('should allow spare and strike', () => {
            const frame = createFrame();
            frame.add(1);
            frame.add(9);
            expect(frame.isComplete).toBeFalsy();
            expect(frame.pinsAvailable).toBe(10);
            frame.add(10);
            expect(frame.tryDisplayInfos).toEqual([1, TrySpecialSymbol.Spare, TrySpecialSymbol.Strike]);
        });

        it('should allow strike and spare', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(9);
            frame.add(1);
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.Strike, 9, TrySpecialSymbol.Spare]);
        });
    });

    describe('score calculation', () => {
        it('calculate scores on simple frame', () => {
            const frame = createFrame();
            frame.add(2);
            frame.add(3);
            expect(frame.isComplete).toBeTruthy();
            expect(frame.calculateScore()).toBe(2 + 3);
        });

        it('calculate scores on incomplete frame', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(2);
            expect(frame.isComplete).toBeFalsy();
            expect(frame.calculateScore()).toBe(null);
        });

        it('calculate scores on strike spare frame', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(2);
            frame.add(8);
            expect(frame.calculateScore()).toBe(20);
        });

        it('calculate scores on 3 strike frame', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(10);
            frame.add(10);
            expect(frame.calculateScore()).toBe(30);
        });
        it('calculate scores on 3 and zero frame', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(10);
            frame.add(0);
            expect(frame.calculateScore()).toBe(20);
        });
    });

    describe('wrong inputs', () => {
        it('should throw exceptions if we have more than 10 pins in two attempts', () => {
            const frame = createFrame();
            frame.add(5);

            expect(frame.pinsAvailable).toBe(5);
            expect(() => frame.add(8)).toThrow();
        });

        it('should throw exceptions if we have more than 10 pins in 2 and 3 attempts', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(5);

            expect(frame.pinsAvailable).toBe(5);
            expect(() => frame.add(8)).toThrow();
        });
    });

    function createFrame() {
        return new LastFrame();
    }
});
