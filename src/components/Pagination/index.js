import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateResultItems, updateLoading } from '../../redux/actions';
import ResultItemsList from '../ResultItemsList';
import { getResultItemsList, getNhits, getLoading } from '../../redux/selectors';

/**
 * @method
 *@description Récupères les résultats de recherche ainsi que le nombre total de
 * @param {*} state
 */
const mapStateToProps = state => {
  const resultItems = getResultItemsList(state);
  const nHits = getNhits(state);
  const loading = getLoading(state);
  return { resultItems, nHits, loading };
}

const useStyles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
});

/**
 * @class ResultPagination
 * @component
 * @desription Contient la pagination et l'appel du composant 
 * affichant les résultats de recherche
 * Est connecté au store redux
 */
class ResultPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalHits: this.props.nHits.nHits,
      itemPage: 1,
    };
  }
  /**
   * @method
   * @description Permet de remettre la page par défaut à 1 si le nombre de résultats a changé
   */
  componentDidUpdate = () => {
    if (this.state.totalHits !== Math.floor(this.props.nHits.nHits / 10) + 1) {
      this.setState({
        ...this.state,
        totalHits: Math.floor(this.props.nHits.nHits / 10) + 1,
        itemPage: 1,
      });
    }
  }
  /**
   * @method
   * @description Va récupérer les résultats en fonction de la page demandée en reprennant la requête existante
   * @param {*} event
   * @param {int} page
   */
  handleUpdateResultItems = async (event, page) => {
    this.props.updateLoading(true);
    await axios
      .get(
        'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-' +
        this.props.resultItems.query.replace(
          /start=(\d*)/,
          `start=${(page - 1) * 10}`
        )
      )
      .then(response => {
        this.props.updateResultItems({
          results: response.data.records,
          query: this.props.resultItems.query,
        });
        this.setState({
          itemPage: page,
        });
        this.props.updateLoading(false);
      });
  }

  /**
   * @method
   */
  render() {
    const { classes } = this.props;
    const paginationSize = window.innerWidth < 768 ? 'small' : 'large';
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.pagination}>
          <Pagination
            size={paginationSize}
            showFirstButton
            showLastButton
            count={this.state.totalHits}
            defaultPage={1}
            page={this.state.itemPage}
            boundaryCount={2}
            onChange={this.handleUpdateResultItems}
          />
        </Grid>
        <Grid item>
          {this.props.loading.loading ? <CircularProgress /> : <ResultItemsList />}
        </Grid>
        <Grid item xs={12} className={classes.pagination}>
          <Pagination
            showFirstButton
            showLastButton
            count={this.state.totalHits}
            defaultPage={1}
            page={this.state.itemPage}
            boundaryCount={2}
            onChange={this.handleUpdateResultItems}
          />
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, { updateResultItems, updateLoading })(withStyles(useStyles)(ResultPagination));
