import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Grid from '@material-ui/core/Grid';
import { FormControl, FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { connect } from 'react-redux'
import { updateResultItems, updateNHits } from '../../redux/actions';
import axios from 'axios';


const useStyles = (theme) => ({
  root: {
    padding: "40px",
    display: "flex",
    justifyContent: "center"
  }
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



// const executeQuery = (query) => {

// }

class Sorting extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/api";
    this.state = {
      postCodes: [],
      cities: [],
      places: [],
      categories: [],
      tags: [],
      subCategories: [],
      userFilters: {
        pmr: { value: 0 },
        blind: { value: 0 },
        deaf: { value: 0 },
        categories: [],
        addresses_zipcodes: [],
        addresses_names: [],
        addresses_cities: [],
        subCategories: []
      }
    }
  }
  componentDidUpdate() {
    this.handleUpdateResultItems();
    // console.log(this.state.userFilters)

  }



  componentDidMount() {

    axios.get('https://opendata.paris.fr/api/records/1.0/search/?disjunctive.category=true&disjunctive.tags=true&disjunctive.address_zipcode=true&disjunctive.address_city=true&disjunctive.access_type=true&disjunctive.price_type=true&disjunctive.address_name=true&refine.category=Animations+&refine.category=Concerts+&refine.category=%C3%89v%C3%A9nements+&refine.category=Expositions+&refine.category=Spectacles+&rows=0&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&facetsort.category=alphanum&facetsort.tags=alphanum&facetsort.address_name=alphanum&facetsort.address_zipcode=alphanum&facetsort.address_city=alphanum&facetsort.access_type=alphanum&facetsort.price_type=alphanum&dataset=que-faire-a-paris-&timezone=Europe%2FBerlin&lang=fr').then((response) => {
      // console.log(response.data.facet_groups)
      const facets = response.data.facet_groups;
      this.setState(
        {
          categories: facets.filter((facet) => facet.name === 'category')[0].facets,
          types: facets.filter((facet) => facet.name.includes('type')),
          postCodes: facets.filter((facet) => facet.name === 'address_zipcode')[0].facets,
          tags: facets.filter((facet) => facet.name === 'tags')[0].facets,
          cities: facets.filter((facet) => facet.name === 'address_city')[0].facets,
          places: facets.filter((facet) => facet.name === 'address_name')[0].facets
        }
      )

    });
  }
  preparyQuery = () => {
    let query = '';
    Object.values(this.state.userFilters).map((value) => {

      if (value.filters && value.filters.length !== 0) {
        query += `&facet=${value.facet}`;
        console.log('lalala')

        value.filters.map((filter) => query += `&refine.${value.facet}=${encodeURIComponent(filter.path).replaceAll(' ', '+')}`);
      } else {
        console.log("valeur : ",)

        query += value.facet !== undefined ? `&facet=${value.facet}&refine.${value.facet}=${value.value}` : '';
      }
    });

    query = query !== '' ? query : '';
    console.log("query" + query)
    return `&q=${query}&rows=10&start=0`;
    // console.log(Object.values(options))
    // Object.values(options).forEach((option) => {
    //   console.log(option)
    //   console.log(`refine.category=${option.category}+-%3E${option.name}`)
    // });
  }

  handleUpdateResultItems = async () => {
    const query = this.preparyQuery();
    await axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-${query}`).then((response) => {
      this.props.updateResultItems({ results: response.data.records, query: query });
      // console.log(response.data.nhits)
      this.props.updateNHits(response.data.nhits);

      // console.log(response);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container item spacing={2} className={classes.root}>
        <Grid item xs={6} sm={4} >
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id="categories"
            key="1"
            limitTags={2}
            options={this.state.categories}
            disableCloseOnSelect

            onChange={(event, values) => {
              console.log(values)
              if (values.length === 0) {
                this.setState({ ...this.state, subCategories: [], userFilters: { ...this.state.userFilters, categories: [] } })
                return;
              }
              let tempArray = [];
              values.forEach((category) => {

                let subTempArray =
                  // tempArray = tempArray.concat(
                  category.facets.filter(
                    (subCategory) => !this.state.subCategories.includes(subCategory.name));
                subTempArray.forEach((subCategory) => subCategory.category = category.name)
                tempArray = tempArray.concat(subTempArray)
              }
              );

              console.log(values)

              this.setState({
                subCategories: tempArray,
                userFilters: { ...this.state.userFilters, categories: { filters: [...values], facet: "category" } }
              });

            }
            }
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
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Catégories" placeholder="Catégorie" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id="subCategories"
            key="2"
            limitTags={2}
            options={this.state.subCategories}
            groupBy={(subCategory) => subCategory.category}
            disableCloseOnSelect
            onChange={(event, values) => {
              if (values.length === 0) {
                this.setState({ userFilters: { ...this.state.userFilters, categories: [] } })
                return;
              }
              this.setState({
                userFilters: { ...this.state.userFilters, categories: { filters: [...values], facet: "category" } }
              });
            }}
            getOptionLabel={(subCategory) => subCategory.name}
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
            }
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Sous-catégories" placeholder="Sous-catégorie" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id="tags"
            limitTags={2}
            options={this.state.tags}
            onChange={(event, values) => {
              if (values.length === 0) {
                this.setState({ userFilters: { ...this.state.userFilters, tags: [] } })
                return;
              }
              this.setState({
                userFilters: {
                  ...this.state.userFilters, tags: {
                    filters: [...values], facet: "tags"
                  }
                }
              });
            }}
            disableCloseOnSelect
            getOptionLabel={(tag) => tag.name}
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
            )
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Mots-clés" placeholder="Mots-clés" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id="placeName"
            limitTags={2}
            options={this.state.places}
            disableCloseOnSelect
            onChange={(event, values) => {

              if (values.length === 0) {
                this.setState({ userFilters: { ...this.state.userFilters, addresses_names: [] } })
                return;
              }
              this.setState({
                userFilters: {
                  ...this.state.userFilters, addresses_names: {
                    filters: [...values], facet: "address_name"
                  }
                }
              });
            }}
            getOptionLabel={(place) => place.name}
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
            )
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Nom du lieu" placeholder="Nom du lieu" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4} >
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id="postCode"
            limitTags={2}
            options={this.state.postCodes}
            disableCloseOnSelect
            onChange={(event, values) => {
              if (values.length === 0) {
                this.setState({ userFilters: { ...this.state.userFilters, addresses_zipcodes: [] } })
                return;
              }
              this.setState({
                userFilters: {
                  ...this.state.userFilters, addresses_zipcodes: {
                    filters: [...values], facet: "address_zipcode"
                  }
                }
              });
            }}
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
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Code postal" placeholder="Code postal" />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id="city"
            limitTags={2}
            options={this.state.cities}
            disableCloseOnSelect
            onChange={(event, values) => {
              if (values.length === 0) {
                this.setState({ userFilters: { ...this.state.userFilters, addresses_cities: [] } })
                return;
              }
              this.setState({
                userFilters: {
                  ...this.state.userFilters, addresses_cities: {
                    filters: [...values], facet: 'address_city'
                  }
                }
              });
            }}
            getOptionLabel={(city) => city.name}
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
            }
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Ville" placeholder="Ville" />
            )}
          />
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={this.state.userFilters.pmr.value === 1} onChange={() => {
                  this.setState({
                    ...this.state,
                    userFilters: { ...this.state.userFilters, pmr: { value: this.state.userFilters.pmr.value === 0 ? 1 : 0, facet: 'pmr' } }
                  });

                }} name="pmr" />}
                label="Mobilité réduite"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={this.state.userFilters.blind.value === 1}
                  onChange={() => {
                    this.setState({
                      ...this.state,
                      userFilters: { ...this.state.userFilters, blind: { value: this.state.userFilters.blind.value === 0 ? 1 : 0, facet: 'blind' } }
                    });

                  }} name="blind" />}
                label="Accès mal voyant"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={this.state.userFilters.deaf.value === 1} onChange={() => {
                  this.setState({
                    ...this.state,
                    userFilters: { ...this.state.userFilters, deaf: { value: this.state.userFilters.deaf.value === 0 ? 1 : 0, facet: 'deaf' } }
                  });

                }}
                  name="deaf" />}
                label="Accès mal entendant"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        {/* {this.state.types ? this.state.types.forEach((type) => (
          <Grid item sm={2}>
            <Autocomplete
              multiple
              noOptionsText="Pas d'options" 
              id={type.name}
              limitTags={2}
              options={this.state.types}
              disableCloseOnSelect
              getOptionLabel={(type) => type.name}
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
              )
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label={type.name} placeholder="Mots-clés" />
              )}
            />
          </Grid>
        )) : null} */}
      </Grid>
    );
  }

}

export default connect(null, { updateResultItems, updateNHits })(withStyles(useStyles)(Sorting));