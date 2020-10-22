import App from './components/smart/app/app-connected';
import MainLayout from './components/dumb/main-layout/main-layout-component';
import React from 'react';
import { render } from 'react-dom';
import { ScoreTableDefault } from './domain';
import './styles/style.scss';
import 'reset-css';

const scoreTable = new ScoreTableDefault();

const element = (
    <MainLayout>
        <App scoreTable={scoreTable} />
    </MainLayout>
);
render(element, document.getElementById('root'));
