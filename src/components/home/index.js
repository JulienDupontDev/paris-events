import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import parisAPI from '../../api/paris';
import Sorting from '../tableSearch';
import EventCard from '../eventCard';
import Iframe from 'react-iframe';

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
    this.state = {
      events: [],
    }
  }

  async componentDidMount() {
    const paris = new parisAPI();
    await paris.getEvents().then(res => this.setState({ ...this.state, events: "cucou" }))
    console.log(this.state)

  }


  render() {
    const { classes, searchTerm } = this.props;

    return (
      <Grid className={classes.root}>
        <Grid item xs={12} sm={12}>
          <Typography>Bienvenue ! Recherchez des évènements à Paris ci-dessous.</Typography>
        </Grid>
        {/* <Iframe url="https://opendata.paris.fr/explore/embed/dataset/que-faire-a-paris-/map/?disjunctive.category&disjunctive.tags&disjunctive.address_zipcode&disjunctive.address_city&disjunctive.access_type&disjunctive.price_type&disjunctive.address_name&rows=1&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJ0cmVlbWFwIiwiZnVuYyI6IkNPVU5UIiwieUF4aXMiOiJwbXIiLCJzY2llbnRpZmljRGlzcGxheSI6dHJ1ZSwiY29sb3IiOiJyYW5nZS1jdXN0b20iLCJwb3NpdGlvbiI6ImNlbnRlciJ9XSwieEF4aXMiOiJjYXRlZ29yeSIsIm1heHBvaW50cyI6NTAsInRpbWVzY2FsZSI6IiIsInNvcnQiOiIiLCJzZXJpZXNCcmVha2Rvd24iOiIiLCJzZXJpZXNCcmVha2Rvd25UaW1lc2NhbGUiOiIiLCJjb25maWciOnsiZGF0YXNldCI6InF1ZS1mYWlyZS1hLXBhcmlzLSIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUuY2F0ZWdvcnkiOnRydWUsImRpc2p1bmN0aXZlLnRhZ3MiOnRydWUsImRpc2p1bmN0aXZlLmFkZHJlc3NfemlwY29kZSI6dHJ1ZSwiZGlzanVuY3RpdmUuYWRkcmVzc19jaXR5Ijp0cnVlLCJkaXNqdW5jdGl2ZS5hY2Nlc3NfdHlwZSI6dHJ1ZSwiZGlzanVuY3RpdmUucHJpY2VfdHlwZSI6dHJ1ZSwiZGlzanVuY3RpdmUuYWRkcmVzc19uYW1lIjp0cnVlLCJyb3dzIjoiMSJ9fX1dLCJkaXNwbGF5TGVnZW5kIjp0cnVlLCJhbGlnbk1vbnRoIjp0cnVlLCJ0aW1lc2NhbGUiOiIifQ%3D%3D&basemap=jawg.dark&location=14,48.86342,2.35773&static=false&datasetcard=false&scrollWheelZoom=true"
          height="450px"
          width="450px"
          display='initial'
          position="relative" /> */}
        <Sorting />

        <Grid item sm={5}>
          {searchTerm}
          {/* {this.state.events}
          <EventCard /> */}
        </Grid>
      </Grid>
    );
  };
}
export default withStyles(useStyle)(Home);