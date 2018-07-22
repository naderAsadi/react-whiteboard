import React from 'react';
import { NavLink } from 'react-router-dom';


import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            
        </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems type="button"/>
            </nav>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
    </header>
);

export default toolbar;