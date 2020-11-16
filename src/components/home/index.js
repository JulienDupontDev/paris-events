import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Sorting from '../tableSearch';
import ResultPagination from '../pagination';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Iframe from 'react-iframe';

const useStyle = theme => ({
  root: {
    marginTop: "5em",
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
        <Grid item xs={12} sm={12}>
          <Typography>Bienvenue ! Recherchez des évènements à Paris ci-dessous.</Typography>
          <Button variant="outlined" color="primary" onClick={() => this.setState({ eventsIframeOpened: true })}>
            Voir la carte interactive des évènements
          </Button>
          <Dialog
            open={this.state.eventsIframeOpened}
            onClose={() => this.setState({ eventsIframeOpened: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <Iframe

                url="https://opendata.paris.fr/explore/embed/dataset/que-faire-a-paris-/map/?disjunctive.category&disjunctive.tags&disjunctive.address_zipcode&disjunctive.address_city&disjunctive.access_type&disjunctive.price_type&disjunctive.address_name&rows=1&basemap=jawg.dark&location=14,48.86342,2.35773&static=false&datasetcard=false&scrollWheelZoom=true"
                height="300px"
                width="500px"
                display='block'
                position="relative" />
            </DialogContent>
          </Dialog>
        </Grid>
        <Sorting />
        <Grid item sm={12}>
          <ResultPagination test="coucou" />
        </Grid>
      </Grid>
    );
  };
}
export default withStyles(useStyle)(Home);