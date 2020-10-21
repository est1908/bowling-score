import React from 'react';
import { FrameScore } from '../../../domain';
import Frame from '../frames/frame-component';
import TotalScoreFrame from '../frames/total-score-frame-component';
import './score-table.scss';

type Props = {
    frameScores: FrameScore[];
    totalScore: number;
    pinsAvailable: number;
};

export default function ScoreTable(props: Props) {
    return (
        <div className="score-table">
            <div className="score-table__score-frames">
                {props.frameScores.map((x, i) => (
                    <Frame key={i} tries={x.tries} score={x.accumulatedScore} />
                ))}
                <TotalScoreFrame key="total" score={props.totalScore} />
            </div>
        </div>
    );
}