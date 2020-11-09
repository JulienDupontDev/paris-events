import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Link, List, ListItem, Typography, withStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';
import { Facebook } from '@material-ui/icons';
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
class ResultPagination extends Component {

  constructor(props) {
    super(props);
    // this.state = props;
    this.state = {
      ...this.state,
      totalHits: 150,
      items: [
      ],
      itemPage: 1
    }
  }

  handleChangePage = (event, page) => {
    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=10&start=
    ${(page - 1) * 10}&facet=category&refine.category=Animations+-%3E+Atelier+%2F+Cours`).then((reponse) => {
      this.setState({
        totalHits: reponse.data.nhits / 10,
        items: reponse.data.records,
        itemPage: page
      })
      console.log(reponse)
    })
    console.log(this.state.items)
  };



  renderItems() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={12} >
        <Grid container spacing={2} style={{ marginTop: "1em" }} className={classes.itemsContainer}>
          {this.state.items.length == 0 ? "Pas de résultats" :

            this.state.items.map((item) => {
              console.log(item.fields.title)
              return (
                <Grid item xs={10} sm={5}>
                  <Card>
                    <CardActionArea href={item.fields.url} target='_blank' rel='noopener'>
                      <CardMedia
                        component="img"
                        alt={item.fields.cover_alt}
                        height="250"
                        image={item.fields.cover_url}
                        title="Contemplative Reptile"
                        className={classes.coverImage}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.fields.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {toHtml(item.fields.description)}
                        </Typography>
                        <Iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBEjR01uRc1-BrUPZB2TFtRebrQv7FCnuM
    &q=${item.fields.address_name}&zoom=18`} />
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
      </Grid>

    );
  }
  render() {
    const { classes } = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.pagination}>
          <Pagination showFirstButton showLastButton count={this.state.totalHits} defaultPage={1} page={this.state.itemPage} boundaryCount={2} onChange={this.handleChangePage} />
        </Grid>
        {this.renderItems()}
        <Grid item xs={12} className={classes.pagination}>
          <Pagination showFirstButton showLastButton count={this.state.totalHits} defaultPage={1} page={this.state.itemPage} boundaryCount={2} onChange={this.handleChangePage} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(ResultPagination);