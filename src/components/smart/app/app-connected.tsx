import React, { useContext, useState } from 'react';
import { ActionButtonCode } from 'components/dumb/action-buttons/action-button-codes';
import { App } from 'components/dumb/app/app-component';
import { IBowlingScoreApp, IFrameScore } from '../../../domain';
import { AppContext } from '../../../app-context';

type Props = {};

type AppState = {
    frameScores: IFrameScore[];
    currentFrameIndex: number;
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
    isUndoAvailable: boolean;
};

export default function AppConnected(props: Props) {
    const bowlingScoreApp: IBowlingScoreApp = useContext(AppContext)!;
    const [appState, setAppState] = useState(mapToAppState(bowlingScoreApp));

    return <App {...appState} onNewGame={handleNewGame} onUndo={handleUndo} onAction={handleAction} />;

    function handleAction(btnCode: ActionButtonCode) {
        const pins = buttonCodeToPins(btnCode);
        if (bowlingScoreApp.isInputValid(pins)) {
            bowlingScoreApp.add(pins);
            updateState();
        }
    }

    function handleNewGame() {
        bowlingScoreApp.reset();
        updateState();
    }

    function handleUndo() {
        bowlingScoreApp.undo();
        updateState();
    }

    function updateState() {
        setAppState(mapToAppState(bowlingScoreApp));
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
