import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {screenSize, } from './lib/Position';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('app'));

registerServiceWorker();
