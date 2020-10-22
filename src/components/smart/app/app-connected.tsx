import React, { Component } from 'react';
import { IBowlingScoreApp, IFrameScore } from '../../../domain';
import { ActionButtonCode } from '../../dumb/action-buttons/action-button-codes';
import { App } from '../../dumb/app/app-component';

type Props = {
    bowlingScore: IBowlingScoreApp;
};

type State = {
    frameScores: IFrameScore[];
    currentFrameIndex: number;
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
    isUndoAvailable: boolean;
};

function mapToState(bowlingScore: IBowlingScoreApp): State {
    return {
        frameScores: bowlingScore.scoreTable.frameScores,
        totalScore: bowlingScore.scoreTable.totalScore,
        currentFrameIndex: bowlingScore.currentFrameIndex,
        pinsAvailable: bowlingScore.pinsAvailable,
        isGameFinished: bowlingScore.isGameFinished,
        isUndoAvailable: bowlingScore.isUndoAvailable
    };
}

export default class AppConnected extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = mapToState(this.props.bowlingScore);
    }

    render() {
        return (
            <App {...this.state} onNewGame={this.handleNewGame} onUndo={this.handleUndo} onAction={this.handleAction} />
        );
    }

    handleAction = (btnCode: ActionButtonCode) => {
        const pins = this.buttonCodeToPins(btnCode);
        if (this.props.bowlingScore.isInputValid(pins)) {
            this.props.bowlingScore.add(pins);
            this.updateState();
        }
    };

    handleNewGame = () => {
        this.props.bowlingScore.reset();
        this.updateState();
    };

    handleUndo = () => {
        this.props.bowlingScore.undo();
        this.updateState();
    };

    private updateState() {
        this.setState(mapToState(this.props.bowlingScore));
    }

    private buttonCodeToPins(btnCode: ActionButtonCode): number {
        if (btnCode === '/' || btnCode === 'x') {
            return this.state.pinsAvailable;
        }
        return btnCode as number;
    }
}
