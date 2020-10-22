import React from 'react';
import { ActionButtonCode } from './action-button-codes';
import './action-buttons.scss';

type Props = {
    code: ActionButtonCode;
    enabled: boolean;
    onClick: (code: ActionButtonCode) => void;
};

export default function ActionButton(props: Props) {
    function handleClick() {
        props.onClick(props.code);
    }

    return (
        <button className="action-buttons__button" disabled={!props.enabled} onClick={handleClick}>
            {props.code}
        </button>
    );
}
