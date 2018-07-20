import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import classes from './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log(window.innerWidth)

const app=(
    <div className={classes}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </div>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
