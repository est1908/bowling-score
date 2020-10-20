import React from 'react';
import { FrameScore, MAX_PINS_COUNT } from '../../domain';
import ActionButtons, { ActionButtonCode } from './action-buttons-component';
import Frame from './frame-component';

type Props = {
    frameScores: FrameScore[];
    pinsAvailable: number;
    onClick: (pins: ActionButtonCode) => void;
};

export default function ScoreTable(props: Props) {
    return (
        <div className="score-table">
            <div className="score-frames">
                {props.frameScores.map((x, i) => (
                    <Frame key={i} {...x} />
                ))}
            </div>
            <ActionButtons
                maxNumber={props.pinsAvailable}
                spareEnabled={true}
                strikeEnabled={props.pinsAvailable == MAX_PINS_COUNT}
                onClick={props.onClick}
            />
        </div>
    );
}
