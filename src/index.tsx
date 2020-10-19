// import 'styles/style.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './styles/style.scss';

const element = (<App/>);
render(
    element,
    document.getElementById('root')
  );