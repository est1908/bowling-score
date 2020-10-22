import React from 'react';
import { ActionButtonCode } from './action-button-codes';
import ActionButton from './action-button-component';
import './action-buttons.scss';

type Props = {
    maxNumber: number;
    spareEnabled: boolean;
    strikeEnabled: boolean;
    onClick: (pins: ActionButtonCode) => void;
};

export default function ActionButtons(props: Props) {
    function isBtnEnabled(x: number | string): boolean {
        if (x === '/') {
            return props.spareEnabled;
        }
        if (x === 'x') {
            return props.strikeEnabled;
        }
        return x <= props.maxNumber;
    }

    const itemCodes: ActionButtonCode[] = [...Array.from(Array(10).keys()), '/', 'x'];
    return (
        <div className="action-buttons">
            {itemCodes.map((x) => (
                <ActionButton key={`btn-${x}`} code={x} enabled={isBtnEnabled(x)} onClick={props.onClick} />
            ))}
        </div>
    );
}
