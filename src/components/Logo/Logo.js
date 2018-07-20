import React from 'react';

import burgerLogo from '../../assets/images/logo.svg';
import classes from './Logo.css';

const logo = (props) => (
    <div style={{height: '50px' }}>
        <img src={burgerLogo} alt="MyBurger" style={{height: '35px' }}/>
    </div>
);

export default logo;