import React from 'react';
import './total-score-frame.scss';

type Props = {
    score: number;
};

export function TotalScoreFrame(props: Props) {
    return (
        <div className="total-score-frame" title="Total Score">
            <div className="total-score-frame__score">{props.score}</div>
        </div>
    );
}
