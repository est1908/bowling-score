import cls from 'classnames';
import React from 'react';
import { TryDisplaySymbol, TrySpecialSymbol } from '../../../domain/types';
import './frames.scss';

type Props = {
    tries: TryDisplaySymbol[];
    score: number | null;
    highlighted: boolean;
};

function Frame(props: Props) {
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
        <div className={cls('frame', { frame_highlighted: props.highlighted })}>
            <div className="frame__tries">
                {props.tries.map((x, i) => (
                    <div className="frame__try" key={`try-${i}`}>
                        {renderTry(x)}
                    </div>
                ))}
            </div>
            <div className="frame__score">{props.score}</div>
        </div>
    );
}

// Memorize it due to not often changes
export default React.memo(Frame);
