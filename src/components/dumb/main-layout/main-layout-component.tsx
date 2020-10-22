import React, { ReactNode } from 'react';
import './main-layout.scss';

type Props = {
    children: ReactNode;
};

export default function MainLayout(props: Props): JSX.Element {
    return (
        <div className="main-layout">
            <div className="main-layout__header" />
            <div className="main-layout__body">{props.children}</div>
        </div>
    );
}
