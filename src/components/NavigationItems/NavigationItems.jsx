import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button'; 

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    if(props.type==="button"){
        return(
            <ul className={classes.NavigationItems} style={{paddingRight:'20px'}}>
                <NavigationItem link="/board" type="text">تخته سفید</NavigationItem>
                <NavigationItem link="/" exact type="text">خانه</NavigationItem>
            </ul>
        );
    }else{
        return(
            
            <ul className={classes.NavigationItems}>
                <li>
                    <Button variant="outlined" size="medium" color="primary">
                        <NavLink to="/" style={{textDecoration:"none" , color:'#1eb270'}}>ورود</NavLink>
                    </Button>
                </li>
                <li>
                    <Button variant="contained" size="medium" style={{backgroundColor:'#1eb270',margin:'0 10px'}}>
                        <NavLink to="/" style={{textDecoration:"none" , color:'white'}}>ثبت نام</NavLink>
                    </Button>
                </li>
            </ul>
        );
    }
}

export default navigationItems;