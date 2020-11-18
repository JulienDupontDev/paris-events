import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

class EventDatePicker extends Component {
  render() {
    const { update, date } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin='normal'
          id='date-picker-dialog'
          label="Date de l'évènement"
          format='dd/MM/yyyy'
          lang='fr'
          minDate={new Date(date.value)}
          value={new Date(date.value)}
          onChange={update}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
}
export default EventDatePicker;