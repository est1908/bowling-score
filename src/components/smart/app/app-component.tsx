import ActionButtons from '../../dumb/action-buttons/action-buttons-component';
import React, { Component } from 'react';
import ScoreTableComponent from '../../dumb/score-table/score-table-component';
import { FrameScore, MAX_PINS_COUNT, ScoreTable } from '../../../domain';
import './app.scss';
import { ActionButtonCode } from '../../dumb/action-buttons/action-button-codes';

type Props = {
    scoreTable: ScoreTable;
};

type State = {
    frameScores: FrameScore[];
    currentFrameIndex: number;
    totalScore: number;
    pinsAvailable: number;
    statusText: string;
    isGameFinished: boolean;
    isUndoAvailable: boolean;
};

function getStatusText(scoreTable: ScoreTable): string {
    if (!scoreTable.isGameFinished) {
        return 'Please enter your current attempt result:';
    } else {
        return `Game is finished. You score is ${scoreTable.totalScore}!`;
    }
}

function mapToState(scoreTable: ScoreTable): State {
    return {
        frameScores: scoreTable.frameScores,
        currentFrameIndex: scoreTable.currentFrameIndex,
        totalScore: scoreTable.totalScore,
        pinsAvailable: scoreTable.pinsAvailable,
        isGameFinished: scoreTable.isGameFinished,
        isUndoAvailable: scoreTable.isUndoAvailable,
        statusText: getStatusText(scoreTable)
    };
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = mapToState(this.props.scoreTable);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div className="app-container">
                <h1 className="app-container__title">Bowling score calculator</h1>
                <div className="app-container__score-table">{this.renderScoreTable()}</div>
                <div className="app-container__action-buttons">{this.renderActionButtons()}</div>
                <div className="app-container__bottom_buttons">
                    {this.renderNewButton()}
                    {this.renderUndoButton()}
                </div>
            </div>
        );
    }

    renderScoreTable() {
        return (
            <ScoreTableComponent
                frameScores={this.state.frameScores}
                currentFrameIndex={!this.state.isGameFinished ? this.state.currentFrameIndex : null}
                pinsAvailable={this.state.pinsAvailable}
                totalScore={this.state.totalScore}
                isGameFinished={this.state.isGameFinished}
            />
        );
    }

    renderActionButtons() {
        return (
            <>
                <div className="app-container__status-text">🎳&nbsp;{this.state.statusText}</div>
                {!this.state.isGameFinished && (
                    <ActionButtons
                        maxNumber={this.state.pinsAvailable}
                        spareEnabled={this.state.pinsAvailable < MAX_PINS_COUNT}
                        strikeEnabled={this.state.pinsAvailable === MAX_PINS_COUNT}
                        onClick={this.handleAddPins}
                    />
                )}
            </>
        );
    }

    renderNewButton() {
        return (
            <button className="app-container__btn-new-game" onClick={this.handleNewGame}>
                New
            </button>
        );
    }

    renderUndoButton() {
        return (
            <button
                className="app-container__btn-undo"
                title="Undo last move"
                disabled={!this.state.isUndoAvailable}
                onClick={this.handleUndo}
            >
                ↩
            </button>
        );
    }

    handleAddPins = (btnCode: ActionButtonCode) => {
        const pins = this.buttonCodeToPins(btnCode);
        this.props.scoreTable.add(pins);
        this.updateState();
    };

    handleNewGame = () => {
        this.props.scoreTable.reset();
        this.updateState();
    };

    handleUndo = () => {
        this.props.scoreTable.undo();
        this.updateState();
    };

    handleKeyDown = (e: any) => {
        if (e.key >= '0' && e.key <= '9') {
            const pins = parseInt(e.key, 10);
            if (this.props.scoreTable.isInputValid(pins)) {
                this.props.scoreTable.add(pins);
                this.updateState();
            }
        }
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
