import { BowlingScoreApp } from './bownling-score-app';
import { TrySpecialSymbol } from '../types';

describe('Bowling score app', () => {
    it('should be initialized properly', () => {
        const app = createApp();
        expect(app.currentFrameIndex).toBe(0);
        expect(app.scoreTable.totalScore).toBe(0);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [TrySpecialSymbol.None, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('should not set score after first attempt', () => {
        const app = createApp();
        app.add(9);
        expect(app.currentFrameIndex).toBe(0);
        expect(app.scoreTable.totalScore).toBe(0);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [9, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('should calculate totalScore after first attempt', () => {
        const app = createApp();
        app.add(2);
        app.add(3);
        expect(app.currentFrameIndex).toBe(1);
        expect(app.scoreTable.totalScore).toBe(5);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [2, 3],
            score: 5,
            accumulatedScore: 5,
            isComplete: true
        });
    });

    it('should calculate totalScore with two zero attempts', () => {
        const app = createApp();
        app.add(0);
        app.add(0);
        expect(app.currentFrameIndex).toBe(1);
        expect(app.scoreTable.totalScore).toBe(0);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [0, 0],
            score: 0,
            accumulatedScore: 0,
            isComplete: true
        });
    });

    it('should calculate totalScore after second attempt', () => {
        const app = createApp();
        // frame 1
        app.add(2);
        app.add(7);
        // frame 2
        app.add(3);
        expect(app.currentFrameIndex).toBe(1);
        expect(app.isGameFinished).toBeFalsy();
        expect(app.scoreTable.totalScore).toBe(2 + 7);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [2, 7],
            score: 9,
            accumulatedScore: 9,
            isComplete: true
        });
        expect(app.scoreTable.frameScores[1]).toEqual({
            tries: [3, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('should finish game', () => {
        const app = createApp();
        for (let i = 0; i < 10; i++) {
            app.add(2);
            app.add(7);
        }
        expect(app.isGameFinished).toBeTruthy();
        expect(app.currentFrameIndex).toBe(9);
        expect(app.scoreTable.totalScore).toBe(10 * (2 + 7));
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [2, 7],
            score: 9,
            accumulatedScore: 9,
            isComplete: true
        });
        expect(app.scoreTable.frameScores[9]).toEqual({
            tries: [2, 7, TrySpecialSymbol.None],
            score: 9,
            accumulatedScore: 10 * (2 + 7),
            isComplete: true
        });
    });

    it('should process edge case', () => {
        const app = createApp();
        // fill 8 frames
        for (let i = 0; i < 8; i++) {
            app.add(2);
            app.add(7);
        }
        // strike 9-th frame
        app.add(10);
        // strike 10-th frame 3times
        app.add(10);
        app.add(10);
        app.add(9);

        expect(app.isGameFinished).toBeTruthy();
        expect(app.currentFrameIndex).toBe(9);
        expect(app.scoreTable.totalScore).toBe(8 * (2 + 7) + 10 + 10 + 10 + 10 + 10 + 9);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [2, 7],
            score: 9,
            accumulatedScore: 9,
            isComplete: true
        });
        expect(app.scoreTable.frameScores[7]).toEqual({
            tries: [2, 7],
            score: 2 + 7,
            accumulatedScore: 7 * (2 + 7) + 2 + 7,
            isComplete: true
        });
        expect(app.scoreTable.frameScores[8]).toEqual({
            tries: [TrySpecialSymbol.None, TrySpecialSymbol.Strike],
            score: 10 + 10 + 10,
            accumulatedScore: 8 * (2 + 7) + 10 + 10 + 10,
            isComplete: true
        });
        expect(app.scoreTable.frameScores[9]).toEqual({
            tries: [TrySpecialSymbol.Strike, TrySpecialSymbol.Strike, 9],
            score: 10 + 10 + 9,
            accumulatedScore: 8 * (2 + 7) + 10 + 10 + 10 + 10 + 10 + 9,
            isComplete: true
        });
    });

    it('should allow to win game with score 300', () => {
        const app = createApp();
        // 9 strikes + 3 in the last frame
        for (let i = 0; i < 9 + 3; i++) {
            app.add(10);
        }
        expect(app.isGameFinished).toBeTruthy();
        expect(app.scoreTable.totalScore).toBe(300);
    });

    it('allow undo try from current frame', () => {
        const app = createApp();
        app.add(1);
        app.add(4);
        expect(app.currentFrameIndex).toBe(1);
        app.undo();
        expect(app.currentFrameIndex).toBe(0);
        expect(app.scoreTable.frameScores[0]).toEqual({
            tries: [1, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('allow undo try from previus frame', () => {
        const app = createApp();
        app.add(1);
        app.add(4);
        app.add(5);
        app.undo();
        expect(app.currentFrameIndex).toBe(1);
        expect(app.scoreTable.totalScore).toBe(1 + 4);
    });

    it('allow undo from initial state', () => {
        const app = createApp();
        app.undo();
        app.undo();
        app.undo();
        expect(app.currentFrameIndex).toBe(0);
        expect(app.scoreTable.totalScore).toBe(0);
    });

    it('should validate valid input', () => {
        const app = createApp();
        expect(app.isInputValid(5)).toBeTruthy();
    });

    it('should validate invalid input', () => {
        const app = createApp();
        app.add(5);
        expect(app.isInputValid(8)).toBeFalsy();
    });

    function createApp() {
        return new BowlingScoreApp();
    }
});
