import React from 'react';
import { render } from 'react-dom';
import App from './components/smart/app/app-component';
import 'reset-css';
import './styles/style.scss';

const element = <App />;
render(element, document.getElementById('root'));
