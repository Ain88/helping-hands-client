import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import actionCable from 'actioncable'
import {BrowserRouter as Router } from 'react-router-dom'

const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

ReactDOM.render(<Router><App cableApp={CableApp} /></Router>, document.getElementById('root'));
