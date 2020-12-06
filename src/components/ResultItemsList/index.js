import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { connect } from 'react-redux';
import { getResultItemsList } from '../../redux/selectors';
import EventDetails from '../EventDetails';
/**
 * Recupères les résultats dans le store redux
 * @param {*} state
 */
const mapStateToProps = state => {
  const resultItems = getResultItemsList(state)
  return resultItems;
}
const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  coverImage: {
    objectFit: 'cover',
    width: '100%',
  },
  itemsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em',
    marginBottom: '1em',
  },
  itemDescription: {
    overflow: 'hidden',
  },
});

/**
 * Permet de reformatter la description car les données ne se tranforment pas directement en HTML toutes seules
 * On limite aussi le nombre de caractères affichés pour uniformiser l'affichage des cartes
 * @param {*} string
 */
const toHtml = string => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(string, 'text/html');
  let content = doc.body.innerText;

  return content.length < 300
    ? content
    : content.substring(0, 300).concat('.....');
}

/**
 * @class ResultItemsList
 * @component
 * @description Composant qui affiche les résultats de recherche sous forme de carte
 */
class ResultItemsList extends Component {
  render() {
    const { classes, resultItems } = this.props;

    return (
      <Grid container item spacing={2} className={classes.itemsContainer}>
        {resultItems.length === 0
          ? 'Pas de résultats'
          : resultItems.map(item => {
            return (
              <Grid item xs={10} sm={5} key={item.fields.id}>
                <Card style={{ zIndex: 5 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      alt={item.fields.cover_alt}
                      height='250'
                      image={item.fields.cover_url}
                      title={item.fields.cover_alt}
                      className={classes.coverImage}

                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {item.fields.title.toUpperCase()}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                        className={classes.itemDescription}
                      >
                        {toHtml(item.fields.description)}
                      </Typography>
                      <Iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBEjR01uRc1-BrUPZB2TFtRebrQv7FCnuM
    &q=${item.fields.address_street} ${item.fields.address_city}&zoom=18`}
                        frameBorder={0}
                        style={{
                          border: 0,
                          minWidth: '100%',
                          height: '100px'
                        }}
                        ariaHidden={false}
                        allowFullScreen=''
                      />
                      <Typography>
                        {item.fields.price_type}
                        {item.fields.price_detail
                          ? ' - ' + item.fields.price_detail
                          : ''}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <EventDetails item={item} />
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
      </Grid>
    );
  }
}

export default connect(mapStateToProps,)(withStyles(useStyles)(ResultItemsList));
