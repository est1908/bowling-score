import React, { Component } from 'react';
import { FrameScore, MAX_PINS_COUNT, ScoreTable, ScoreTableDefault } from '../../domain';
import ActionButtons, { ActionButtonCode } from '../dumb/action-buttons-component';
import ScoreTableComponent from '../dumb/score-table-component';

type Props = {};

type State = {
    frameScores: FrameScore[];
    pinsAvailable: number;
    statusText: string;
};

function getStatusText(scoreTable: ScoreTable): string {
    if (!scoreTable.isGameFinished) {
        return 'Please chooose your current attempt result:';
    } else {
        return `Game is finished. You score is ${scoreTable.totalScore}!`;
    }
}

function mapToState(scoreTable: ScoreTable): State {
    return {
        frameScores: scoreTable.frameScores,
        pinsAvailable: scoreTable.pinsAvailable,
        statusText: getStatusText(scoreTable)
    };
}

export default class App extends Component<Props, State> {
    // todo: may be move outside component
    _scoreTable: ScoreTable;

    constructor(props: Props) {
        super(props);
        this._scoreTable = new ScoreTableDefault();
        this.state = mapToState(this._scoreTable);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="app-container">
                <h1 className="app-container__title">Bowling score calculator</h1>
                <div className="app-container__score-table"><ScoreTableComponent frameScores={this.state.frameScores} pinsAvailable={this.state.pinsAvailable} /></div>
                <div className="app-container__action-buttons">
                    <div className="app-container__status-text">{this.state.statusText}</div>
                    <ActionButtons
                        maxNumber={this.state.pinsAvailable}
                        spareEnabled={true}
                        strikeEnabled={this.state.pinsAvailable == MAX_PINS_COUNT}
                        onClick={this.handleAddPins}
                    />
                </div>
                <button className="app-container__btn-new-game">New Game</button>
            </div>
        );
    }

    handleAddPins = (btnCode: ActionButtonCode) => {
        const pins = this.buttonCodeToPins(btnCode);
        this._scoreTable.add(pins);
        this.updateState();
        // todo: show error from exception
    };

    private updateState() {
        this.setState(mapToState(this._scoreTable));
    }

    private buttonCodeToPins(btnCode: ActionButtonCode): number {
        if (btnCode === '/' || btnCode === 'x') {
            return this._scoreTable.pinsAvailable;
        }
        return btnCode as number;
    }
}
