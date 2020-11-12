import { Button, Grid, withStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { updateResultItems } from '../../redux/actions';
import ResultItemsList from '../resultItemsList'
import { getResultItemsList, getNhits } from '../../redux/selectors';

const mapStateToProps = state => {
  const resultItems = getResultItemsList(state);
  const nHits = getNhits(state);
  return { resultItems, nHits };
}

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  coverImage: {
    objectFit: 'cover',
  },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  // },
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  },
  itemsContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class ResultPagination extends Component {

  constructor(props) {
    super(props);
    // this.state = props;
    this.state = {
      totalHits: this.props.nHits['nHits'],
      itemPage: 1
    }
    console.log(Object.values(this.props.nHits))
  }

  componentDidUpdate = () => {
    console.log(this.props);
    if (this.state.totalHits !== Math.floor(this.props.nHits['nHits']) / 10) {
      this.setState({ ...this.state, totalHits: Math.floor(this.props.nHits['nHits']) / 10 })
      console.log(this.props.nHits)

    }


  }

  handleUpdateResultItems = async (event, page) => {
    await axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=10&start=
    ${(page - 1) * 10}&facet=category&refine.category=Animations+-%3E+Atelier+%2F+Cours`).then((response) => {
      // this.setState({
      //   totalHits: reponse.data.nhits / 10,
      //   items: reponse.data.records,
      //   itemPage: page
      // })
      this.props.updateResultItems(response.data.records);
      // console.log(response)
      this.setState({
        itemPage: page,
        totalHits: Math.floor(response.data.nhits / 10) + 1
      });

    });
  }


  render() {
    const { classes } = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.pagination}>
          <Button onClick={() => this.setState({ totalHits: 3 })}>Click</Button>
          <Pagination showFirstButton showLastButton count={this.state.totalHits} defaultPage={1} page={this.state.itemPage} boundaryCount={2} onChange={this.handleUpdateResultItems} />
        </Grid>
        <ResultItemsList />
        <Grid item xs={12} className={classes.pagination}>
          <Pagination showFirstButton showLastButton count={this.state.totalHits} defaultPage={1} page={this.state.itemPage} boundaryCount={2} onChange={this.handleUpdateResultItems} />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, { updateResultItems })(withStyles(useStyles)(ResultPagination));