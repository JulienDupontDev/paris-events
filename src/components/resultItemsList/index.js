import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Typography, withStyles } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { connect } from 'react-redux'
import { getResultItemsList } from '../../redux/selectors';

const mapStateToProps = state => {
  const resultItems = getResultItemsList(state);
  return resultItems;
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

const toHtml = (string) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(string, 'text/html');
  return (doc.body.innerText);
}
class ResultItemsList extends Component {

  constructor(props) {
    super(props);
    // this.state = props;
    // this.state = {
    //   ...this.state,
    //   totalHits: 150,
    //   items: [
    //   ],
    //   itemPage: 1
    // }
    // console.log(this.props)
  }

  render() {
    const { classes } = this.props

    return (
      <Grid
        container
        spacing={2}
        style={{ marginTop: "1em" }}
        className={classes.itemsContainer}>

        {this.props.resultItems.length === 0 ? "Pas de résultats" :

          this.props.resultItems.map((item) => {
            return (
              <Grid item xs={10} sm={5} key={item.fields.id}>
                <Card>
                  <CardActionArea
                    href={item.fields.url}
                    target='_blank'
                    rel='noopener'>
                    <CardMedia
                      component="img"
                      alt={item.fields.cover_alt}
                      height="250"
                      image={item.fields.cover_url}
                      title="Contemplative Reptile"
                      className={classes.coverImage}
                    // onLoadStart={console.log(this)}
                    // onLoadedData={console.log('loaded')}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.fields.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">
                        {toHtml(item.fields.description)}
                      </Typography>
                      <Iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBEjR01uRc1-BrUPZB2TFtRebrQv7FCnuM
    &q=${item.fields.address_name}&zoom=18`}
                        frameBorder={0}
                        style={{ border: 0, minWidth: "100%", height: "100px" }}
                        ariaHidden={false}
                        allowFullScreen=""
                      />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" >
                      <Link underline='none' href={item.fields.url} target='_blank' rel='noopener'>En savoir plus</Link>
                    </Button>
                    <IconButton>
                      <Facebook />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>

            );
          })
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(ResultItemsList));