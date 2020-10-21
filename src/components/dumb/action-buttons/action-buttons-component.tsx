import React from 'react';
import './action-buttons.scss';

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

    function renderButton(actBtnCode: ActionButtonCode) {
        function handleClick() {
            props.onClick(actBtnCode);
        }

        return (
            <button
                className="action-buttons__button"
                disabled={!isBtnEnabled(actBtnCode)}
                key={actBtnCode}
                onClick={handleClick}
            >
                {actBtnCode}
            </button>
        );
    }

    const itemCodes: ActionButtonCode[] = [...Array.from(Array(10).keys()), '/', 'x'];
    return <div className="action-buttons">{itemCodes.map((x) => renderButton(x))}</div>;
}
