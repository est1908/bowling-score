import React from 'react';

export type ActionButtonCode = number | '/' | 'x';

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

    let itemCodes = [...Array.from(Array(10).keys()), '/', 'x'];

    return (
        <div className="action-buttons">
            {itemCodes.map((x) => (
                <button className="action-buttons__button" disabled={!isBtnEnabled(x)} key={x} onClick={() => props.onClick(x as ActionButtonCode)}>
                    {x}
                </button>
            ))}
        </div>
    );
}
