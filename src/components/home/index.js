import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sorting from '../tableSearch';
import ResultPagination from '../pagination';
import EventsMap from '../eventsMap';
const useStyle = theme => ({
  root: {
    marginTop: "5em",
    overflowX: 'hidden',
  },

});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsIframeOpened: false,
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root}>
        <EventsMap />
        <Sorting />
        <Grid item sm={12}>
          <ResultPagination test="coucou" />
        </Grid>
      </Grid>
    );
  };
}
export default withStyles(useStyle)(Home);