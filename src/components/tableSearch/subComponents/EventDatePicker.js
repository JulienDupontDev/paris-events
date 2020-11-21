import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

/**
 * @class
 * @component
 * @description Sélecteur de date pour la recherche d'évènements
 * 
 */
class EventDatePicker extends Component {
  constructor(props) {
    super(props);
    this.initialDate = this.props.date.value;
  }
  render() {
    const { date } = this.props;
    return (
      <Grid item xs={10} sm={4}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label="Date de l'évènement"
            format='dd/MM/yyyy'
            lang='fr'
            minDate={this.initialDate}
            value={(new Date(date.value))}
            onChange={this.checkDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    );
  }

  /**
   * @method
   * @description Vérifies si la date envoyée par le picker est une date valide et exécute la fonction pour mettre à jour la date dans les paramètres de recherche 
   * @param {date} date 
   */
  checkDate = (date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      if (!isNaN(date.getTime())) {  // d.valueOf() could also work
        this.props.update(date);
      }
    }
  }
}
export default EventDatePicker;