import { RegularFrame } from './regular-frame';
import { TrySpecialSymbol } from '../types';

describe('regular frame', () => {
    describe('positive cases', () => {
        it('should be initialized properly', () => {
            const frame = createFrame();

            expect(frame.triesCount).toBe(0);
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.None, TrySpecialSymbol.None]);
            expect(frame.pinsAvailable).toBe(10);
            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeFalsy();
            expect(frame.isComplete).toBeFalsy();
        });
        it('should accept first ball throw (0, )', () => {
            const frame = createFrame();
            frame.add(0);

            expect(frame.triesCount).toBe(1);
            expect(frame.tryDisplayInfos).toEqual([0, TrySpecialSymbol.None]);
            expect(frame.pinsAvailable).toBe(10);
            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeFalsy();
            expect(frame.isComplete).toBeFalsy();
        });

        it('should calculate pinsAvailable (5, )', () => {
            const frame = createFrame();
            frame.add(5);

            expect(frame.triesCount).toBe(1);
            expect(frame.tryDisplayInfos).toEqual([5, TrySpecialSymbol.None]);
            expect(frame.pinsAvailable).toBe(5);
        });

        it('should be full after two throws (2, 3)', () => {
            const frame = createFrame();
            frame.add(2);
            frame.add(3);

            expect(frame.triesCount).toBe(2);
            expect(frame.tryDisplayInfos).toEqual([2, 3]);
            expect(frame.pinsAvailable).toBe(0);
            expect(frame.isComplete).toBeTruthy();
        });

        it('should accept spare (0, 10)', () => {
            const frame = createFrame();
            frame.add(0);
            frame.add(10);

            expect(frame.triesCount).toBe(2);
            expect(frame.tryDisplayInfos).toEqual([0, TrySpecialSymbol.Spare]);
            expect(frame.pinsAvailable).toBe(0);
            expect(frame.isSpare).toBeTruthy();
            expect(frame.isStrike).toBeFalsy();
        });

        it('should be reset properly', () => {
            const frame = createFrame();
            frame.add(0);
            frame.add(10);
            frame.reset();

            expect(frame.triesCount).toBe(0);
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.None, TrySpecialSymbol.None]);
            expect(frame.pinsAvailable).toBe(10);
            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeFalsy();
            expect(frame.isComplete).toBeFalsy();
        });
        it('should accept spare  (5, 5)', () => {
            const frame = createFrame();
            frame.add(5);
            frame.add(5);

            expect(frame.triesCount).toBe(2);
            expect(frame.pinsAvailable).toBe(0);
            expect(frame.tryDisplayInfos).toEqual([5, TrySpecialSymbol.Spare]);
            expect(frame.isSpare).toBeTruthy();
        });

        it('should accept strike (10, )', () => {
            const frame = createFrame();
            frame.add(10);
            // yeeh this is strange thing... we should show strike in the second frame :)
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.None, TrySpecialSymbol.Strike]);
            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeTruthy();
            expect(frame.isComplete).toBeTruthy();
        });

        it('should allow undo', () => {
            const frame = createFrame();
            frame.add(1);
            expect(frame.tryDisplayInfos).toEqual([1, TrySpecialSymbol.None]);
            frame.undo();
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.None, TrySpecialSymbol.None]);
        });
        it('should allow undo nothing', () => {
            const frame = createFrame();
            frame.undo();
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.None, TrySpecialSymbol.None]);
        });
        it('should allow undo strike', () => {
            const frame = createFrame();
            frame.add(10);
            frame.undo();
            expect(frame.tryDisplayInfos).toEqual([TrySpecialSymbol.None, TrySpecialSymbol.None]);
        });
    });

    describe('score calculation', () => {
        it('calculate scores on simple frame', () => {
            const frame = createFrame([1, 3]);
            expect(frame.isComplete).toBeTruthy();
            expect(frame.calculateScore()).toBe(1 + 3);
        });

        it('calculate scores on spare frame', () => {
            const frame1 = createFrame([1, 9]);
            const frame2 = createFrame([5]);
            frame1.nextFrame = frame2;
            expect(frame1.calculateScore()).toBe(1 + 9 + 5);
        });

        it('calculate scores on strike frame', () => {
            const frame1 = createFrame([10]);
            const frame2 = createFrame([5, 3]);
            frame1.nextFrame = frame2;
            expect(frame1.calculateScore()).toBe(10 + 5 + 3);
        });

        it('calculate scores on 3 strikes frame', () => {
            const frame1 = createFrame([10]);
            const frame2 = createFrame([10]);
            const frame3 = createFrame([10]);
            frame1.nextFrame = frame2;
            frame2.nextFrame = frame3;
            expect(frame1.calculateScore()).toBe(10 + 10 + 10);
        });

        it('calculate scores on 2 strikes frame', () => {
            const frame1 = createFrame([10]);
            const frame2 = createFrame([10]);
            const frame3 = createFrame([]);
            frame1.nextFrame = frame2;
            frame2.nextFrame = frame3;
            expect(frame1.calculateScore()).toBe(null);
        });

        it('should allow to getScore only on completed frame', () => {
            const frame = createFrame([1]);
            expect(frame.isComplete).toBeFalsy();
            expect(frame.calculateScore()).toBe(null);
        });
    });

    describe('wrong inputs', () => {
        it('should throw exception on invalid values (pins < 0 and pins > 10)', () => {
            const frame = createFrame();

            expect(() => frame.add(-5)).toThrow();
            expect(() => frame.add(11)).toThrow();
        });

        it('should throw exceptions if we have more than 10 pins in two attempts', () => {
            const frame = createFrame();
            frame.add(5);

            expect(frame.pinsAvailable).toBe(5);
            expect(() => frame.add(8)).toThrow();
        });
        test('should have maximum two attempts', () => {
            const frame = createFrame();
            frame.add(0);
            frame.add(5);

            expect(() => frame.add(5)).toThrow();
        });
    });

    function createFrame(tries: number[] | null = null) {
        const frame = new RegularFrame(null);
        if (tries != null) {
            tries.forEach((pins) => frame.add(pins));
        }
        return frame;
    }
});
