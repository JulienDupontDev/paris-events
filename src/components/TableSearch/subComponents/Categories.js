import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Grid from '@material-ui/core/Grid';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

/**
 * @class Categories
 * @component
 * @description regroupe le filtre de catégories et de sous catégories 
 */
class Categories extends Component {

  render() {
    const { subCategories, categories } = this.props.parentState;

    return (
      <Grid item xs={12} sm={8}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              noOptionsText="Pas d'options"
              id='categories'
              key='1'
              limitTags={2}
              options={categories}
              disableCloseOnSelect
              onChange={this.props.handleUpdateCategories}
              getOptionLabel={(option) => option.name}
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
                  label='Catégories'
                  placeholder='Catégorie'
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              noOptionsText="Pas d'options"
              id='subCategories'
              key='2'
              limitTags={2}
              options={subCategories}
              groupBy={subCategory => subCategory.category}
              disableCloseOnSelect
              onChange={this.props.handleUpdateSubCategories}
              getOptionLabel={subCategory => subCategory.name}
              renderOption={(option, { selected }) => {
                return (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </React.Fragment>
                )
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Sous-catégories'
                  placeholder='Sous-catégorie'
                />
              )} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Categories;
