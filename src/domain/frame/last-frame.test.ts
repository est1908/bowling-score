import { LastFrame } from './last-frame';

describe('last frame', () => {
    describe('positive cases', () => {
        it('should allow 2 attempts unless strike or spare', () => {
            const frame = createFrame();
            frame.add(1);
            frame.add(5);
            expect(frame.triesCount).toBe(2);
            expect(frame.getTry(0)).toBe(1);
            expect(frame.getTry(1)).toBe(5);
            expect(frame.isFull).toBeTruthy();
        });
        it('should allow 3 attempts due to spare', () => {
            const frame = createFrame();
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(5);
            expect(frame.pinsAvailable).toBe(5);
            frame.add(2);
            expect(frame.triesCount).toBe(3);
            expect(frame.getTry(0)).toBe(10);
            expect(frame.getTry(1)).toBe(5);
            expect(frame.getTry(2)).toBe(2);
            expect(frame.isFull).toBeTruthy();
        });

        it('should allow 3 strikes at last attempt', () => {
            const frame = createFrame();
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(10);
            expect(frame.triesCount).toBe(3);
            expect(frame.getTry(0)).toBe(10);
            expect(frame.getTry(1)).toBe(10);
            expect(frame.getTry(2)).toBe(10);
            expect(frame.isFull).toBeTruthy();
        });

        it('should allow 2 first strikes and last zero', () => {
            const frame = createFrame();
            frame.add(10);
            frame.add(10);
            expect(frame.pinsAvailable).toBe(10);
            frame.add(0);
            expect(frame.triesCount).toBe(3);
            expect(frame.getTry(0)).toBe(10);
            expect(frame.getTry(1)).toBe(10);
            expect(frame.getTry(2)).toBe(0);
            expect(frame.isFull).toBeTruthy();
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
