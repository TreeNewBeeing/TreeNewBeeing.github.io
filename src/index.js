import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {screenSize, } from './lib/Position';
import './css/index.css';

import App from './components/App';

ReactDOM.render(<App />, document.getElementsByTagName('body')[0]);

registerServiceWorker();
