import React, { useState } from 'react';
import { ActionButtonCode } from 'components/dumb/action-buttons/action-button-codes';
import { App } from 'components/dumb/app/app-component';
import { IBowlingScoreApp, IFrameScore } from '../../../domain';

type Props = {
    bowlingScore: IBowlingScoreApp;
};

type AppState = {
    frameScores: IFrameScore[];
    currentFrameIndex: number;
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
    isUndoAvailable: boolean;
};

export default function AppConnected(props: Props) {
    const [appState, setAppState] = useState(mapToAppState(props.bowlingScore));

    return <App {...appState} onNewGame={handleNewGame} onUndo={handleUndo} onAction={handleAction} />;

    function handleAction(btnCode: ActionButtonCode) {
        const pins = buttonCodeToPins(btnCode);
        if (props.bowlingScore.isInputValid(pins)) {
            props.bowlingScore.add(pins);
            updateState();
        }
    }

    function handleNewGame() {
        props.bowlingScore.reset();
        updateState();
    }

    function handleUndo() {
        props.bowlingScore.undo();
        updateState();
    }

    function updateState() {
        setAppState(mapToAppState(props.bowlingScore));
    }

    function buttonCodeToPins(btnCode: ActionButtonCode): number {
        if (btnCode === '/' || btnCode === 'x') {
            return appState.pinsAvailable;
        }
        return btnCode as number;
    }
}

function mapToAppState(bowlingScore: IBowlingScoreApp): AppState {
    return {
        frameScores: bowlingScore.scoreTable.frameScores,
        totalScore: bowlingScore.scoreTable.totalScore,
        currentFrameIndex: bowlingScore.currentFrameIndex,
        pinsAvailable: bowlingScore.pinsAvailable,
        isGameFinished: bowlingScore.isGameFinished,
        isUndoAvailable: bowlingScore.isUndoAvailable
    };
}