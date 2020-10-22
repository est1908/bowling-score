import cls from 'classnames';
import React from 'react';
import { IFrameScore } from '../../../domain';
import { Frame } from '../frame';
import { TotalScoreFrame } from '../total-score-frame';
import './score-table.scss';

type Props = {
    frameScores: IFrameScore[];
    currentFrameIndex: number | null;
    totalScore: number;
    pinsAvailable: number;
    isGameFinished: boolean;
};

export default function ScoreTable(props: Props) {
    return (
        <div className={cls('score-table', { 'score-table_highlighted': props.isGameFinished })}>
            <div className="score-table__score-frames">
                {props.frameScores.map((x, i) => (
                    <div key={`frame-${i}`} className="score-table__frame" title={`Score for frame ${i + 1}`}>
                        <Frame tries={x.tries} score={x.accumulatedScore} highlighted={i === props.currentFrameIndex} />
                    </div>
                ))}
                <div className="score-table__total-score-frame">
                    <TotalScoreFrame key="total" score={props.totalScore} />
                </div>
            </div>
        </div>
    );
}
