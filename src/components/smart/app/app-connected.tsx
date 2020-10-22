import React, { Component } from 'react';
import { FrameScore, ScoreTable } from '../../../domain';
import { ActionButtonCode } from '../../dumb/action-buttons/action-button-codes';
import { App } from '../../dumb/app/app-component';

type Props = {
    scoreTable: ScoreTable;
};

type State = {
    frameScores: FrameScore[];
    currentFrameIndex: number;
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
    isUndoAvailable: boolean;
};

function mapToState(scoreTable: ScoreTable): State {
    return {
        frameScores: scoreTable.frameScores,
        currentFrameIndex: scoreTable.currentFrameIndex,
        totalScore: scoreTable.totalScore,
        pinsAvailable: scoreTable.pinsAvailable,
        isGameFinished: scoreTable.isGameFinished,
        isUndoAvailable: scoreTable.isUndoAvailable
    };
}

export default class AppConnected extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = mapToState(this.props.scoreTable);
    }

    render() {
        return (
            <App {...this.state} onNewGame={this.handleNewGame} onUndo={this.handleUndo} onAction={this.handleAction} />
        );
    }

    handleAction = (btnCode: ActionButtonCode) => {
        const pins = this.buttonCodeToPins(btnCode);
        if (this.props.scoreTable.isInputValid(pins)) {
            this.props.scoreTable.add(pins);
            this.updateState();
        }
    };

    handleNewGame = () => {
        this.props.scoreTable.reset();
        this.updateState();
    };

    handleUndo = () => {
        this.props.scoreTable.undo();
        this.updateState();
    };

    private updateState() {
        this.setState(mapToState(this.props.scoreTable));
    }

    private buttonCodeToPins(btnCode: ActionButtonCode): number {
        if (btnCode === '/' || btnCode === 'x') {
            return this.state.pinsAvailable;
        }
        return btnCode as number;
    }
}
