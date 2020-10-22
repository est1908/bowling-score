import ActionButtons from '../../dumb/action-buttons/action-buttons-component';
import React, { useEffect } from 'react';
import ScoreTableComponent from '../../dumb/score-table/score-table-component';
import { FrameScore, MAX_PINS_COUNT } from '../../../domain';
import './app.scss';
import { ActionButtonCode } from '../../dumb/action-buttons/action-button-codes';

type Props = {
    frameScores: FrameScore[];
    currentFrameIndex: number;
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
    isUndoAvailable: boolean;
    onUndo: () => void;
    onNewGame: () => void;
    onAction: (action: ActionButtonCode) => void;
};

export function App(props: Props) {
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    function getStatusText(): string {
        if (!props.isGameFinished) {
            return 'Please enter your current attempt result:';
        } else {
            return `Game is finished. You score is ${props.totalScore}!`;
        }
    }

    function renderScoreTable() {
        return (
            <ScoreTableComponent
                frameScores={props.frameScores}
                currentFrameIndex={!props.isGameFinished ? props.currentFrameIndex : null}
                pinsAvailable={props.pinsAvailable}
                totalScore={props.totalScore}
                isGameFinished={props.isGameFinished}
            />
        );
    }

    function renderActionButtons() {
        return (
            <>
                <div className="app-container__status-text">🎳&nbsp;{getStatusText()}</div>
                {!props.isGameFinished && (
                    <ActionButtons
                        maxNumber={props.pinsAvailable}
                        spareEnabled={props.pinsAvailable < MAX_PINS_COUNT}
                        strikeEnabled={props.pinsAvailable === MAX_PINS_COUNT}
                        onClick={props.onAction}
                    />
                )}
            </>
        );
    }

    function renderNewButton() {
        return (
            <button className="app-container__btn-new-game" onClick={props.onNewGame}>
                New
            </button>
        );
    }

    function renderUndoButton() {
        return (
            <button
                className="app-container__btn-undo"
                title="Undo last move"
                disabled={!props.isUndoAvailable}
                onClick={props.onUndo}
            >
                ↩
            </button>
        );
    }

    //TODO: Fix type here
    function handleKeyDown(e: any) {
        if (e.key >= '0' && e.key <= '9') {
            const pins = parseInt(e.key, 10);
            props.onAction(pins);
        }
        //TODO: add x / u
    }

    return (
        <div className="app-container">
            <h1 className="app-container__title">Bowling score calculator</h1>
            <div className="app-container__score-table">{renderScoreTable()}</div>
            <div className="app-container__action-buttons">{renderActionButtons()}</div>
            <div className="app-container__bottom_buttons">
                {renderNewButton()}
                {renderUndoButton()}
            </div>
        </div>
    );
}
