import React, { Component } from 'react';
import { FrameScore, MAX_PINS_COUNT, ScoreTable, ScoreTableDefault } from '../../domain';
import ActionButtons, { ActionButtonCode } from '../dumb/action-buttons-component';
import Frame from '../dumb/frame-component';
import ScoreTableComponent from '../dumb/score-table-component';

type Props = {};

type State = {
    frameScores: FrameScore[];
    pinsAvailable: number;
};

function mapToState(scoreTable: ScoreTable): State {
    return {
        frameScores: scoreTable.frameScores,
        pinsAvailable: scoreTable.pinsAvailable
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
            <div>
                <p>App</p>
                <ScoreTableComponent
                 frameScores={this.state.frameScores}
                  pinsAvailable={this.state.pinsAvailable}
                  onClick={this.handleAddPins}
                   />
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
