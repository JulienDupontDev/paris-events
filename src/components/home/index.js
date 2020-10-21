import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = theme => ({
  root: {
    marginTop: "5em",
  },
});

// const showResults = () => (

//   this.state.events.length ?
//     <div>{this.state.events}</div>
//     : <div>Rien</div>
// );

class Home extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { classes } = this.props;
    const {
      searchTerm,
      events,
    } = this.props;
    return (
      <Grid className={classes.root}>
        <Grid item  xs={12} sm={10}>
          <Typography>Bienvenue ! Recherchez des évènements à Paris ci-dessous.</Typography>
        </Grid>
        <Grid item>
          {searchTerm}
        </Grid>
      </Grid>
    );
  };
}
export default withStyles(useStyle)(Home);