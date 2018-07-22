import React from 'react';

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
                    <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}}>ورود</button>
                </li>
                <li>
                    <button type="button" class="btn btn-success">ثبت نام</button>
                </li>
            </ul>
        );
    }
}

export default navigationItems;