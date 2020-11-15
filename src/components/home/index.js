import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Sorting from '../tableSearch';
import ResultPagination from '../pagination';

const useStyle = theme => ({
  root: {
    marginTop: "5em",
  },

});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {

  }


  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root}>
        <Grid item xs={12} sm={12}>
          <Typography>Bienvenue ! Recherchez des évènements à Paris ci-dessous.</Typography>
        </Grid>
        {/* <Iframe url="https://opendata.paris.fr/explore/embed/dataset/que-faire-a-paris-/map/?disjunctive.category&disjunctive.tags&disjunctive.address_zipcode&disjunctive.address_city&disjunctive.access_type&disjunctive.price_type&disjunctive.address_name&rows=1&basemap=jawg.dark&location=14,48.86342,2.35773&static=false&datasetcard=false&scrollWheelZoom=true"
          height="450px"
          width="450px"
          display='initial'
          position="relative" /> */}
        <Sorting />

        <Grid item sm={12}>
          <ResultPagination test="coucou" />
        </Grid>
      </Grid>
    );
  };
}
export default withStyles(useStyle)(Home);