import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { TextField } from '@material-ui/core';

/**
 * @class
 * @component
 * @description Classe générique pour les select avec autocompletion 
 */
class SimpleSelect extends Component {
  render() {
    const { label, name, values } = this.props.infos;
    const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
    const checkedIcon = <CheckBoxIcon fontSize='small' />;

    return (
      <Grid item xs={6} sm={4}>
        <Autocomplete
          multiple
          noOptionsText="Pas d'options"
          id={name}
          limitTags={2}
          options={values}
          onChange={(event, values) => this.props.update(name, values)}
          disableCloseOnSelect
          getOptionLabel={tag => tag.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </React.Fragment>
          )}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              label={label}
              placeholder={label}
            />
          )}
        />
      </Grid>
    );
  }
}
export default SimpleSelect;
