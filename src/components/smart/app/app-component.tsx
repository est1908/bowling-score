import React, { Component } from 'react';
import { FrameScore, MAX_PINS_COUNT, ScoreTable } from '../../../domain';
import ActionButtons, { ActionButtonCode } from '../../dumb/action-buttons/action-buttons-component';
import ScoreTableComponent from '../../dumb/score-table/score-table-component';
import './app.scss';


type Props = {
    scoreTable: ScoreTable
};

type State = {
    frameScores: FrameScore[];
    totalScore: number;
    pinsAvailable: number;
    statusText: string;
    isGameFinished: boolean;
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
        totalScore: scoreTable.totalScore,
        pinsAvailable: scoreTable.pinsAvailable,
        isGameFinished: scoreTable.isGameFinished,
        statusText: getStatusText(scoreTable)
    };
}

export default class App extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = mapToState(this.props.scoreTable);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="app-container">
                <h1 className="app-container__title">Bowling score calculator</h1>
                <div className="app-container__score-table">
                    <ScoreTableComponent
                        frameScores={this.state.frameScores}
                        pinsAvailable={this.state.pinsAvailable}
                        totalScore = {this.state.totalScore}
                    />
                </div>
                <div className="app-container__action-buttons">
                    <div className="app-container__status-text">🎳 {this.state.statusText}</div>
                    {!this.state.isGameFinished && (
                        <ActionButtons
                            maxNumber={this.state.pinsAvailable}
                            spareEnabled={this.state.pinsAvailable < MAX_PINS_COUNT}
                            strikeEnabled={this.state.pinsAvailable == MAX_PINS_COUNT}
                            onClick={this.handleAddPins}
                        />
                    )}
                </div>
                <button className="app-container__btn-new-game" onClick={this.handleNewGame}>
                    New Game
                </button>
            </div>
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
