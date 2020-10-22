import React from 'react';
import './total-score-frame.scss';

type Props = {
    score: number;
};

export default function TotalScoreFrame(props: Props): JSX.Element {
    return (
        <div className="total-score-frame" title="Total Score">
            <div className="total-score-frame__score">{props.score}</div>
        </div>
    );
}
