import React, { Component } from 'react';
import axios from 'axios';
import { IconButton, Typography } from '@material-ui/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { getNhits } from '../../redux/selectors';
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

/**
 * Recupères les résultats dans le store redux
 * @param {*} state
 */
const mapStateToProps = state => {
  const nHits = getNhits(state);
  return nHits;
}

class EventsMap extends Component {
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

  handleDialogShow = () => this.setState({ eventsIframeOpened: !this.state.eventsIframeOpened });
  render() {
    const { events, center } = this.state;

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
          <DialogTitle id="alert-dialog-title">{this.state.loading ? "Chargement des données" : "Evènements à Paris"}
            <IconButton onClick={this.handleDialogShow}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <MapContainer
              center={center}
              zoom={18}
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
                      maxWidth: '200px'
                    }}>
                      <ListItem>{event.fields.address_name}</ListItem>
                      <ListItem>
                        <Typography>
                          {event.fields.address_street},
                  {event.fields.address_zipcode},
                  {event.fields.address_city}
                        </Typography>
                      </ListItem>
                      <ListItem></ListItem>
                    </List>
                  </Popup>
                </Marker>
              })
              }
            </MapContainer>
          </DialogContent>
        </Dialog>
      </Grid>

    );
  }

  async getEvents() {
    const baseQuery = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&';

    console.log(this.props.nHits)
    await axios.get(baseQuery)
      .then(async (response) => {
        await axios.get(baseQuery.concat('rows=' + response.data.nhits)).then((lastResponse) => {
          console.log(lastResponse)
          const { records } = lastResponse.data;
          this.setState({ events: records.filter((record) => record.geometry) });
          this.setState({ loading: false });
        })
          .catch(() => console.log('erreur'))
      })
      .catch((error) => console.log(error));
  }
}

export default connect(mapStateToProps)(EventsMap);