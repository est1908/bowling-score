import { RegularFrame } from './regular-frame';

describe('regular frame', () => {
    describe('positive cases', () => {
        it('should be initialized properly', () => {
            const frame = createFrame();

            expect(frame.triesCount).toBe(0);
            expect(frame.pinsAvailable).toBe(10);
            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeFalsy();
            expect(frame.isFull).toBeFalsy();
        });
        it('should accept first ball throw (0, )', () => {
            const frame = createFrame();
            frame.add(0);

            expect(frame.triesCount).toBe(1);
            expect(frame.pinsAvailable).toBe(10);
            expect(frame.getTry(0)).toBe(0);
            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeFalsy();
            expect(frame.isFull).toBeFalsy();
        });

        it('should calculate pinsAvailable (5, )', () => {
            const frame = createFrame();
            frame.add(5);

            expect(frame.triesCount).toBe(1);
            expect(frame.pinsAvailable).toBe(5);
        });

        it('should be full after two throws (2, 3)', () => {
            const frame = createFrame();
            frame.add(2);
            frame.add(3);

            expect(frame.triesCount).toBe(2);
            expect(frame.pinsAvailable).toBe(0);
            expect(frame.getTry(0)).toBe(2);
            expect(frame.getTry(1)).toBe(3);
            expect(frame.isFull).toBeTruthy();
        });

        it('should accept spare (0, 10)', () => {
            const frame = createFrame();
            frame.add(0);
            frame.add(10);

            expect(frame.triesCount).toBe(2);
            expect(frame.pinsAvailable).toBe(0);
            expect(frame.getTry(0)).toBe(0);
            expect(frame.getTry(1)).toBe(10);
            expect(frame.isSpare).toBeTruthy();
            expect(frame.isStrike).toBeFalsy();
        });
        it('should accept spare  (5, 5)', () => {
            const frame = createFrame();
            frame.add(5);
            frame.add(5);

            expect(frame.triesCount).toBe(2);
            expect(frame.pinsAvailable).toBe(0);
            expect(frame.getTry(0)).toBe(5);
            expect(frame.getTry(1)).toBe(5);
            expect(frame.isSpare).toBeTruthy();
        });

        it('should accept strike (10, )', () => {
            const frame = createFrame();
            frame.add(10);

            expect(frame.isSpare).toBeFalsy();
            expect(frame.isStrike).toBeTruthy();
            expect(frame.isFull).toBeTruthy();
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

        it('getTry should throw exceptions if index is invalid', () => {
            const frame = createFrame();
            frame.add(5);

            expect(() => frame.getTry(1)).toThrow();
        });

        test('should have maximum two attempts', () => {
            const frame = createFrame();
            frame.add(0);
            frame.add(5);

            expect(() => frame.add(5)).toThrow();
        });
    });

    function createFrame() {
        return new RegularFrame();
    }
});
