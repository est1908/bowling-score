import React from 'react';
import { TryDisplaySymbol, TrySpecialSymbol } from '../../domain/types';

type Props = {
    tries: TryDisplaySymbol[];
    score: number | null;
};

export default function Frame(props: Props) {
    function renderFrameStr(frameTry: TryDisplaySymbol): string {
        switch (frameTry) {
            case TrySpecialSymbol.None:
                return '';
            case TrySpecialSymbol.Spare:
                return '/';
            case TrySpecialSymbol.Strike:
                return 'x';
            default:
                return frameTry.toString();
        }
    }

    return (
        <div className="frame">
            <div className="frame__tries">
                {props.tries.map((x, i) => (
                    <div className="frame__try" key={i}>
                        {renderFrameStr(x)}
                    </div>
                ))}
            </div>
        </div>
    );
}
