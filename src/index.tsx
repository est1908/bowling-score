import React from 'react';
import { render } from 'react-dom';
import App from './components/smart/app/app-component';
import 'reset-css';
import './styles/style.scss';
import MainLayout from './components/dumb/main-layout/main-layout-component';
import { ScoreTableDefault } from './domain';

const scoreTable = new ScoreTableDefault();

const element = (
    <MainLayout>
        <App scoreTable={scoreTable} />
    </MainLayout>
);
render(element, document.getElementById('root'));
