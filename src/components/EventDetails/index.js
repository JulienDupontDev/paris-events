import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { CardMedia, Grid, Link } from '@material-ui/core'
import { Facebook, Mail, Phone } from '@material-ui/icons';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import Iframe from 'react-iframe';

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const useStyles = theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    flex: 1
  },
  grid: {
    marginTop: '5em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      padding: '20px',
    },
  },
  sectionTitle: {
    fontWeigth: 'bold',
  },
  containerColumn: {
    display: 'flex',
    justifyContent: 'center',
  },
  leafletContainer: {
    heigth: '200px',
  },
  popUp: {
    maxHeight: '200px',
    overflowY: 'auto',
    maxWidth: '200px',
  },
});

/**
 * @method
 * @description Permet de reformatter la description car les données ne se tranforment pas directement en HTML toutes seules
 * @param {*} string
 */
const toHtml = string => {
  let parser = new DOMParser()
  let doc = parser.parseFromString(string, 'text/html')

  return doc.body.innerText;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
});

/**
 * @class 
 * @component
 * @description Affiche un dialogue avec les informations détaillées de l'évènement
 */
class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  /**
   * @method
   * @description Permet de fermer le dialog
   */
  handleClose = () => this.setState({ open: false });

  /**
   * @method
   * @description Permet d'ouvrir le dialog'
   */
  handleOpen = () => this.setState({ open: true });

  render() {
    const { item, classes } = this.props;

    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => this.setState({ open: true })}
        >
          En savoir plus
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={() => this.setState({ open: false })}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography variant='h6'>{item.fields.title}</Typography>
            </Toolbar>
          </AppBar>
          <Grid className={classes.grid} container spacing={2} >
            <Grid item xs={12} md={6}>
              <Grid container className={classes.containerColumn}>
                <Grid item xs={12} sm={10}>
                  <CardMedia src={item.fields.cover_url} component='img' />
                </Grid>
                <Grid item xs={10}>
                  <Typography className={classes.sectionTitle}>
                    Lien de l'évènement
                  </Typography>
                  <Link href={item.fields.url} rel='noreferrer' target='_blank'>{item.fields.url}</Link>
                </Grid>
                {item.fields.access_link ?
                  <Grid item xs={10}>
                    <Typography className={classes.sectionTitle}>
                      Lien de réservation
                  </Typography>
                    <Link
                      href={item.fields.access_link}
                      rel='noreferrer'
                      target='_blank'
                    >
                      {item.fields.access_link}
                    </Link>
                  </Grid>
                  : ''}
                <Grid item xs={12}>
                  <List style={{ display: 'flex', justifyContent: 'center' }}>
                    {item.fields.contact_facebook ? (
                      <ListItem style={{ width: 'min-content' }}>
                        <IconButton
                          href={item.fields.contact_facebook}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <Facebook />
                        </IconButton>
                      </ListItem>
                    ) : (
                        ''
                      )}
                    {item.fields.contact_phone ? (
                      <ListItem style={{ width: 'min-content' }}>
                        <IconButton href={'tel:' + item.fields.contact_phone}>
                          <Phone />
                        </IconButton>
                      </ListItem>
                    ) : (
                        ''
                      )}
                    {item.fields.contact_mail ? (
                      <ListItem style={{ width: 'min-content' }}>
                        <IconButton
                          href={'mailto:' + item.fields.contact_mail}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <Mail />
                        </IconButton>
                      </ListItem>
                    ) : (
                        ''
                      )}
                  </List>
                </Grid>
                <Grid item xs={10}>
                  {item.geometry ? (
                    <MapContainer
                      center={[
                        item.geometry.coordinates[1],
                        item.geometry.coordinates[0]
                      ]}
                      zoom={18}
                      scrollWheelZoom
                      style={{ height: '400px', width: 'inherit' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      />
                      <Marker
                        position={[
                          item.geometry.coordinates[1],
                          item.geometry.coordinates[0]
                        ]}
                      >
                        <Popup>
                          <List className={classes.popUp}>
                            <ListItem>{item.fields.address_name}</ListItem>
                            <ListItem>
                              <Typography>
                                {item.fields.address_street},
                                {item.fields.address_zipcode},
                                {item.fields.address_city}
                              </Typography>
                            </ListItem>
                            <ListItem></ListItem>
                          </List>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                      <Iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBEjR01uRc1-BrUPZB2TFtRebrQv7FCnuM
    &q=${item.fields.address_street} ${item.fields.address_city}&zoom=18`}
                        frameBorder={0}
                        ariaHidden={false}
                        allowFullScreen=''
                        width="100%"
                        height="400px"
                      />
                    )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} className={classes.containerColumn}>
                <Grid item xs={12}>
                  <Typography className={classes.sectionTitle}>
                    Chapeau
                  </Typography>
                  <Typography>{item.fields.lead_text}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.sectionTitle}>
                    Description
                  </Typography>
                  <Typography>{toHtml(item.fields.description)}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.sectionTitle}>
                    Date de début
                  </Typography>
                  {new Date(item.fields.date_start).toDateString()}
                </Grid>
                <Grid item>
                  <Typography className={classes.sectionTitle}>
                    Date de fin
                  </Typography>
                  {new Date(item.fields.date_end).toDateString()}
                </Grid>
                <Grid item>
                  <Typography className={classes.sectionTitle}>
                    Type d'accès
                  </Typography>
                  <Typography>{item.fields.access_type}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.sectionTitle}>
                    Type de prix
                  </Typography>
                  <Typography>{item.fields.price_type}</Typography>
                </Grid>
              </Grid>
              {item.fields.price_detail ?
                <Grid item>
                  <Typography>Détail du prix</Typography>
                  {item.fields.price_detail}
                </Grid>
                : ''
              }
            </Grid>
          </Grid>
        </Dialog>
      </div>
    )
  }
}
export default withStyles(useStyles)(EventDetails);
