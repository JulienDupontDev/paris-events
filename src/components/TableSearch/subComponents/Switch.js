import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch
} from '@material-ui/core';
import React, { Component } from 'react';

/**
 * @class
 * @component
 * @description Classe générique pour champs de type switch
 */
class CustomSwitch extends Component {

  render() {
    const { value, name, title } = this.props.infos;
    return (
      <Grid item xs={10} sm={4}>
        <FormControl component='fieldset'>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={value === 1}
                  color="primary"
                  onChange={() => value === 1 ? this.props.update(name, null) : this.props.update(name, 1)}
                  name={name}
                />
              }
              label={title}
            />
          </FormGroup>
        </FormControl>
      </Grid>
    )
  }
}
export default CustomSwitch;
