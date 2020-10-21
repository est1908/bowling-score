import React from 'react';
import { TryDisplaySymbol, TrySpecialSymbol } from '../../../domain/types';
import './frames.scss';

type Props = {
    tries: TryDisplaySymbol[];
    score: number | null;
};

export default function Frame(props: Props) {
    function renderTry(frameTry: TryDisplaySymbol) {
        switch (frameTry) {
            case TrySpecialSymbol.None:
                return '';
            case 0:
                return '-';
            case TrySpecialSymbol.Spare:
                return (
                    <span className="frame__spare" title="SPARE!">
                        /
                    </span>
                );
            case TrySpecialSymbol.Strike:
                return <span className="frame__strike">x</span>;
            default:
                return frameTry.toString();
        }
    }

    return (
        <div className="frame">
            <div className="frame__tries">
                {props.tries.map((x, i) => (
                    <div className="frame__try" key={i}>
                        {renderTry(x)}
                    </div>
                ))}
            </div>
            <div className="frame__score">{props.score}</div>
        </div>
    );
}
