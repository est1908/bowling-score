import { TrySpecialSymbol } from '../types';
import { ScoreTableDefault } from './score-table';

describe('Score table', () => {
    it('should be initialized properly', () => {
        const table = createTable();
        expect(table.totalScore).toBe(0);
        expect(table.currentFrameIndex).toBe(0);
        expect(table.frameScores[0]).toEqual({
            tries: [TrySpecialSymbol.None, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('should not set score after first attempt', () => {
        const table = createTable();
        table.add(9);
        expect(table.totalScore).toBe(0);
        expect(table.currentFrameIndex).toBe(0);
        expect(table.frameScores[0]).toEqual({
            tries: [9, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('should calculate totalScore after first attempt', () => {
        const table = createTable();
        table.add(2);
        table.add(3);
        expect(table.totalScore).toBe(5);
        expect(table.currentFrameIndex).toBe(1);
        expect(table.frameScores[0]).toEqual({
            tries: [2, 3],
            score: 5,
            accumulatedScore: 5,
            isComplete: true
        });
    });

    it('should calculate totalScore with two zero attempts', () => {
        const table = createTable();
        table.add(0);
        table.add(0);
        expect(table.totalScore).toBe(0);
        expect(table.currentFrameIndex).toBe(1);
        expect(table.frameScores[0]).toEqual({
            tries: [0, 0],
            score: 0,
            accumulatedScore: 0,
            isComplete: true
        });
    });

    it('should calculate totalScore after second attempt', () => {
        const table = createTable();
        // frame 1
        table.add(2);
        table.add(7);
        // frame 2
        table.add(3);
        expect(table.totalScore).toBe(2 + 7);
        expect(table.currentFrameIndex).toBe(1);
        expect(table.frameScores[0]).toEqual({
            tries: [2, 7],
            score: 9,
            accumulatedScore: 9,
            isComplete: true
        });
        expect(table.isGameFinished).toBeFalsy();
        expect(table.frameScores[1]).toEqual({
            tries: [3, TrySpecialSymbol.None],
            score: null,
            accumulatedScore: null,
            isComplete: false
        });
    });

    it('should finish game', () => {
        const table = createTable();
        for (let i = 0; i < 10; i++) {
            table.add(2);
            table.add(7);
        }
        expect(table.isGameFinished).toBeTruthy();
        expect(table.totalScore).toBe(10 * (2 + 7));
        expect(table.currentFrameIndex).toBe(9);
        expect(table.frameScores[0]).toEqual({
            tries: [2, 7],
            score: 9,
            accumulatedScore: 9,
            isComplete: true
        });
        expect(table.frameScores[9]).toEqual({
            tries: [2, 7, TrySpecialSymbol.None],
            score: 9,
            accumulatedScore: 10 * (2 + 7),
            isComplete: true
        });
    });

    it('should process edge case', () => {
        const table = createTable();
        // fill 8 frames
        for (let i = 0; i < 8; i++) {
            table.add(2);
            table.add(7);
        }
        // strike 9-th frame
        table.add(10);
        // strike 10-th frame 3times
        table.add(10);
        table.add(10);
        table.add(9);

        expect(table.isGameFinished).toBeTruthy();
        expect(table.totalScore).toBe(8 * (2 + 7) + 10 + 10 + 10 + 10 + 10 + 9);
        expect(table.currentFrameIndex).toBe(9);
        expect(table.frameScores[0]).toEqual({
            tries: [2, 7],
            score: 9,
            accumulatedScore: 9,
            isComplete: true
        });
        expect(table.frameScores[7]).toEqual({
            tries: [2, 7],
            score: 2 + 7,
            accumulatedScore: 7 * (2 + 7) + 2 + 7,
            isComplete: true
        });
        expect(table.frameScores[8]).toEqual({
            tries: [TrySpecialSymbol.None, TrySpecialSymbol.Strike],
            score: 10 + 10 + 10,
            accumulatedScore: 8 * (2 + 7) + 10 + 10 + 10,
            isComplete: true
        });
        expect(table.frameScores[9]).toEqual({
            tries: [TrySpecialSymbol.Strike, TrySpecialSymbol.Strike, 9],
            score: 10 + 10 + 9,
            accumulatedScore: 8 * (2 + 7) + 10 + 10 + 10 + 10 + 10 + 9,
            isComplete: true
        });
    });

    it('should allow to win game with score 300', () => {
        const table = createTable();
        // 9 strikes + 3 in the last frame
        for (let i = 0; i < 9 + 3; i++) {
            table.add(10);
        }
        expect(table.isGameFinished).toBeTruthy();
        expect(table.totalScore).toBe(300);
    });


    function createTable() {
        return new ScoreTableDefault();
    }
});
