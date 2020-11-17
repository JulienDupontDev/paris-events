import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch
} from '@material-ui/core'
import React, { Component } from 'react'

class CustomSwitch extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { value, name, title } = this.props.infos
    return (
      <Grid item>
        <FormControl component='fieldset'>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={value === 1}
                  onChange={() => this.props.update(name, value === 1 ? 0 : 1)}
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

export default CustomSwitch
