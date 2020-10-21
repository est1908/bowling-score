import React from 'react';

type Props = {
    score: number;
};

export default function TotalScoreFrame(props: Props) {
    return (
        <div className="frame" title="Total Score">
            <div className="frame__total-score">{props.score}</div>
        </div>
    );
}
