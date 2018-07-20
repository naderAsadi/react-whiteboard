import React from 'react';
import Button from '@material-ui/core/Button';
import RecordIcon from '@material-ui/icons/RecordVoiceOver'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import classes from './Tools.css';

const Tools=(props)=>{
    return(
        <div className={classes.Tools}>
            <List>
                <ListItem style={{marginBottom:'15px'}} button>
                    <RecordIcon color="primary"/>
                </ListItem>
                <ListItem style={{marginBottom:'15px'}} button>
                    <RecordIcon color="primary"/>
                </ListItem>
                <ListItem style={{marginBottom:'15px'}} button>
                    <RecordIcon color="primary"/>
                </ListItem>
                <ListItem style={{marginBottom:'15px'}} button>
                    <RecordIcon color="primary"/>
                </ListItem>
            </List>
        </div>
    );
}

export default Tools;