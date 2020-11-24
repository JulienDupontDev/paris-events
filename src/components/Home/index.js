import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sorting from '../TableSearch';
import ResultPagination from '../Pagination';
import EventsMap from '../EventsMap';
const useStyle = (theme) => ({
  root: {
    marginTop: "5em",
    overflowX: 'hidden',
  },
});

/**
 * @class Home
 * @component
 * @description Page comprenant tous les composants utiles à l'application
 */
class Home extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root}>
        <EventsMap />
        <Sorting />
        <Grid item sm={12}>
          <ResultPagination />
        </Grid>
      </Grid>
    );
  };
}
export default withStyles(useStyle)(Home);
