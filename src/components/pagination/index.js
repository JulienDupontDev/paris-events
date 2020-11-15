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
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
});

class ResultPagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalHits: this.props.nHits['nHits'],
      itemPage: 1
    }
  }

  componentDidUpdate = () => {
    if (this.state.totalHits !== Math.floor(this.props.nHits.nHits / 10)) {
      this.setState({ ...this.state, totalHits: Math.floor(this.props.nHits.nHits / 10), itemPage: 1 });
    }

    console.log(this.props)


  }

  handleUpdateResultItems = async (event, page) => {
    await axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-' + this.props.resultItems.query.replace(/start=(\d*)/, `start=${(page - 1) * 10}`)).then((response) => {
      // console.log(response)
      this.props.updateResultItems({ results: response.data.records, query: this.props.resultItems.query });
      this.setState({
        itemPage: page,
      });
    });
  }


  render() {
    const { classes } = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.pagination}>
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