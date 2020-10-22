import App from './components/smart/app/app-connected';
import MainLayout from './components/dumb/main-layout/main-layout-component';
import React from 'react';
import { render } from 'react-dom';
import './styles/style.scss';
import 'reset-css';
import { BowlingScoreApp } from './domain';

const bowlingScoreApp = new BowlingScoreApp();

const element = (
    <MainLayout>
        <App bowlingScore={bowlingScoreApp} />
    </MainLayout>
);
render(element, document.getElementById('root'));
