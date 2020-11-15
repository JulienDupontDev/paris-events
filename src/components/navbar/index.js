import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
});

class SearchAppBar extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root} >
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Paris évènements
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}

export default withStyles(useStyle)(SearchAppBar);