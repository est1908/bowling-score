import React from 'react';
import { FrameTry, FrameTryEnum } from '../../domain/types';

type Props = {
    tries: FrameTry[];
    score: number | null;
};

export default function Frame(props: Props) {
    function renderFrameStr(frameTry: FrameTry): string {
        switch (frameTry) {
            case FrameTryEnum.None:
                return '';
            case FrameTryEnum.Spare:
                return '/';
            case FrameTryEnum.Strike:
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
