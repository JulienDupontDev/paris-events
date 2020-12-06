import React, { Component } from 'react';
import axios from 'axios';
import { CircularProgress, IconButton, Link, Typography, withStyles } from '@material-ui/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Close } from '@material-ui/icons';

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const useStyles = () => ({
  mapContainer: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'none',
    height: '400px',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '8pt',
    wordWrap: 'anywhere',
  },
});

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

/**
 * @class
 * @component
 * @description Carte contenu dans un dialogue qui affiche les évènements disponibles à Paris
 */
class EventsMap extends Component {
  /**
   *  @constructor
   * @description constructeur qui déclare le state du composant
   * On définit le centre de la carte aux coordonnées du centre de Paris
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      center: [48.8566, 2.3522],
      loading: true,
      eventsIframeOpened: false,
    }
    this.handleDialogShow = this.handleDialogShow.bind(this);
    this.getEvents();
  }

  /**
   * @method
   * @description Permet d'afficher ou de fermer le modal
   */
  handleDialogShow = () => this.setState({ eventsIframeOpened: !this.state.eventsIframeOpened });

  render = () => {
    const { events, center } = this.state;
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={12}>
        <Typography>Bienvenue ! Recherchez des évènements à Paris ci-dessous.</Typography>
        <Button variant="outlined" color="primary" onClick={this.handleDialogShow}>
          Voir la carte interactive des évènements
      </Button>
        <Dialog
          maxWidth='md'
          fullWidth={true}
          open={this.state.eventsIframeOpened}
          onClose={this.handleDialogShow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.loading ? (
            <Typography>
              Chargement des données
            </Typography>
          ) : "Evènements à Paris"}
            <IconButton style={{ position: 'absolute', right: '0', top: '0' }} onClick={this.handleDialogShow}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent className={this.state.loading ? classes.mapContainer : ''} >
            {!this.state.loading ? <MapContainer
              center={center}
              zoom={11}
              scrollWheelZoom
              style={{ height: '400px', width: 'inherit' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              {events.map((event) => {
                return <Marker
                  position={[event.geometry.coordinates[1], event.geometry.coordinates[0]]}
                  key={event.fields.id}
                >
                  <Popup>
                    <List style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                      maxWidth: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '8pt',
                    }}>
                      <ListItem>
                        <Typography style={{ fontWeight: 'bold' }}>
                          {event.fields.title}
                        </Typography>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Chapeau</Typography>
                        {event.fields.lead_text}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>URL</Typography>
                        <Link href={event.fields.url} target='_blank' rel='noreferrer'>{event.fields.url}</Link>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Catégorie</Typography>
                        {event.fields.category}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Date de début</Typography>
                        {new Date(event.fields.date_start).toLocaleDateString('fr-FR', dateOptions)}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Date de fin</Typography>
                        {new Date(event.fields.date_end).toLocaleDateString('fr-FR', dateOptions)}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Image de couverture</Typography>
                        <img src={event.fields.cover_url} style={{ width: '100%' }} alt={event.fields.cover.filename} />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>
                          Adresse
                        </Typography>
                        <Link href={'https://google.com/maps/search/' + event.fields.address_street + ' ' + event.fields.address_city + ' ' + event.fields.address_zipcode}
                          target='_blank' rel='noreferrer'>
                          {event.fields.address_street},
                  {event.fields.address_zipcode},
                  {event.fields.address_city}
                        </Link>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Accès PMR</Typography>
                        {event.fields.pmr}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Accès mal entendant</Typography>
                        {event.fields.deaf}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Accès mal voyant</Typography>
                        {event.fields.blind}
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Type de prix</Typography>
                        {event.fields.price_type}
                      </ListItem>
                      {event.fields.price_detail ?
                        <ListItem className={classes.listItem}>
                          <Typography className={classes.sectionTitle}>Détail du prix</Typography>
                          {event.fields.price_detail}
                        </ListItem>
                        : ''
                      }
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Nom de contact</Typography>
                        {event.fields.contact_name}
                      </ListItem>
                      {event.fields.contact_phone ?
                        <ListItem className={classes.listItem}>
                          <Typography className={classes.sectionTitle}>Téléphone de contact</Typography>
                          {event.fields.contact_phone}
                        </ListItem>
                        : ''
                      }
                      {event.fields.contact_mail ?
                        <ListItem className={classes.listItem}>
                          <Typography className={classes.sectionTitle}>Email de contact</Typography>
                          {event.fields.contact_mail}
                        </ListItem>
                        : ''
                      }
                      {event.fields.contact_facebook ?
                        <ListItem className={classes.listItem}>
                          <Typography className={classes.sectionTitle}>Contact Facebook</Typography>
                          <Link href={event.fields.contact_facebook} target='_blank' rel='noreferrer'>
                            Cliquez pour voir la page
                          </Link>
                        </ListItem>
                        : ''
                      }
                      <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Type d'accès</Typography>
                        {event.fields.access_type}
                      </ListItem>
                      {event.fields.access_link ? <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Url de réservation</Typography>
                        <Link href={event.fields.access_link} target='_blank' rel='noreferrer'>
                          Cliquez ici pour réserver
                        </Link>
                      </ListItem> : ''
                      }
                      {event.fields.updated_at ? <ListItem className={classes.listItem}>
                        <Typography className={classes.sectionTitle}>Dernière mise à jour</Typography>
                        {(new Date(event.fields.updated_at)).toLocaleDateString('fr-FR', dateOptions)}
                      </ListItem> : ''
                      }
                    </List>
                  </Popup>
                </Marker>
              })
              }
            </MapContainer>
              : <CircularProgress size={40} />
            }
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }

  /**
   * @method
   * @description Permet d'aller récupérer d'une part le nombre d'évènements disponibles puis de récupérer tous les évènements grâce au nombre reçu qui sera passé à row=$nombre dans la requête
   */
  getEvents = async () => {
    const baseQuery = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&';

    await axios.get(baseQuery)
      .then(async (response) => {
        await axios.get(baseQuery.concat('rows=' + response.data.nhits))
          .then((lastResponse) => {
            const { records } = lastResponse.data;
            this.setState({ events: records.filter((record) => record.geometry) });
            this.setState({ loading: false });
          })
          .catch(() => alert('Une erreur est survenue lors de la récupération des résultats de recherche'))
      })
      .catch((error) => alert('Une erreur est survenue lors de la récupération des résultats de recherche'));
  }
}

export default withStyles(useStyles)(EventsMap);
