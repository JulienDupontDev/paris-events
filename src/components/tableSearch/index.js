import React, { Component } from 'react'
import { fade, withStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { updateResultItems, updateNHits } from '../../redux/actions';
import axios from 'axios';
import CustomSwitch from './subComponents/Switch';
import SimpleSelect from './subComponents/SimpleSelect';
import SearchInput from './subComponents/search';
import facetsQuery from './facets.json';
import EventDatePicker from './datePicker';
import Categories from './subComponents/Categories';

const useStyles = (theme) => ({
  root: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
})

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

class Sorting extends Component {
  constructor(props) {
    super(props)
    this.baseUrl =
      'https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/api'
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
        subCategories: [],
        selectedDate: { value: new Date().toISOString() }
      }
    }
    this.updateSwitchValue = this.updateSwitchValue.bind(this);
    this.updateSelectValue = this.updateSelectValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUpdateCategories = this.handleUpdateCategories.bind(this);
    this.handleUpdateSubCategories = this.handleUpdateSubCategories.bind(this);
  }

  componentDidUpdate() {
    this.handleUpdateResultItems();
  }

  componentDidMount() {
    axios
      .get(
        facetsQuery.query
      )
      .then(response => {
        const facets = response.data.facet_groups
        this.setState({
          categories: facets.filter(facet => facet.name === 'category')[0]
            .facets,
          types: facets.filter(facet => facet.name.includes('type')),
          postCodes: facets.filter(facet => facet.name === 'address_zipcode')[0]
            .facets,
          tags: facets.filter(facet => facet.name === 'tags')[0].facets,
          cities: facets.filter(facet => facet.name === 'address_city')[0]
            .facets,
          places: facets.filter(facet => facet.name === 'address_name')[0]
            .facets
        });
      });
  }

  render() {
    const { classes } = this.props
    const { userFilters } = this.state

    return (
      <Grid container spacing={2} className={classes.root}>
        <SearchInput update={this.handleSearch} />
        <Categories handleUpdateCategories={this.handleUpdateCategories} handleUpdateSubCategories={this.handleUpdateSubCategories} parentState={this.state} />
        <SimpleSelect
          key='tags'
          infos={{ name: 'tags', label: 'Mots-clés', values: this.state.tags }}
          update={this.updateSelectValue}
        />
        <SimpleSelect
          key='address_name'
          infos={{
            name: 'address_name',
            label: 'Nom du lieu',
            values: this.state.places
          }}
          update={this.updateSelectValue}
        />
        <SimpleSelect
          key='address_zipcode'
          infos={{
            name: 'address_zipcode',
            label: 'Code postal',
            values: this.state.postCodes
          }}
          update={this.updateSelectValue}
        />
        <SimpleSelect
          key='address_city'
          infos={{
            name: 'address_city',
            label: 'Ville',
            values: this.state.cities
          }}
          update={this.updateSelectValue}
        />
        <CustomSwitch
          key='pmr'
          update={this.updateSwitchValue}
          infos={{
            name: 'pmr',
            title: 'Mobilité réduite',
            value: userFilters.pmr.value
          }}
        />
        <CustomSwitch
          key='blind'
          update={this.updateSwitchValue}
          infos={{
            name: 'blind',
            title: 'Accès mal voyant',
            value: userFilters.blind.value
          }}
        />
        <CustomSwitch
          key='deaf'
          update={this.updateSwitchValue}
          infos={{
            name: 'deaf',
            title: 'Accès mal entendant',
            value: userFilters.deaf.value
          }}
        />
        <EventDatePicker update={this.handleDateUpdate} date={this.state.userFilters.selectedDate} />
        {this.state.types
          ? this.state.types.map(type => (
            <SimpleSelect
              key={type.name}
              infos={{
                name: type.name,
                label: type.name,
                values: type.facets
              }}
              update={this.updateSelectValue}
            />
          ))
          : null}
      </Grid>
    )
  }

  isArrayEmpty = (values, objectName) => {
    if (values.length === 0) {
      this.setState({
        [objectName]: [],
        userFilters: { ...this.state.userFilters, [objectName]: [] }
      });

      return true;
    }

    return false;
  }

  updateSelectValue = (object, values) => {
    if (values.length === 0) {
      this.setState({
        userFilters: { ...this.state.userFilters, [object]: [] }
      })
      return;
    }
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        [object]: {
          filters: [...values],
          facet: object
        }
      }
    });
  }

  handleDateUpdate = (newDate) => {
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        selectedDate: { value: newDate.toISOString() },
        facet: 'date_starte'
      }
    });
  }

  updateSwitchValue = (object, value) => {
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        [object]: { value: value, facet: object }
      }
    });
  }

  preparyQuery = () => {
    let query = ''
    Object.values(this.state.userFilters).forEach(value => {
      if (value.filters && value.filters.length !== 0) {
        query += `&facet=${value.facet}`;
        console.log('lalala');

        value.filters.map(
          filter =>
            (query += `&refine.${value.facet}=${encodeURIComponent(
              filter.path
            ).replaceAll(' ', '+')}`)
        );
      } else {
        value.facet !== 'q'
          ? (query +=
            value.facet !== undefined
              ? `&facet=${value.facet}&refine.${value.facet}=${value.value}`
              : '')
          : (query += `&q=${value.value}`);
      }
    });
    query = query !== '' ? query : '';
    return `${query}&rows=10&start=0`;
  }

  handleSearch = (query) => {
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        userQuery: { value: query, facet: 'q' }
      }
    });
  }

  handleUpdateResultItems = async () => {
    const query = this.preparyQuery()
    await axios
      .get(
        `https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-${query}`
      )
      .then(response => {
        this.props.updateResultItems({
          results: response.data.records,
          query: query
        });
        this.props.updateNHits(response.data.nhits);
      });
  }

  handleUpdateCategories = (event, categories) => {
    console.log(categories)
    if (categories.length === 0) {
      this.setState({
        subCategories: [],
        userFilters: { ...this.state.userFilters, categories: [] }
      })
      return;
    }
    let tempArray = [];
    categories.forEach(category => {
      let subTempArray = category.facets.filter(
        subCategory =>
          !this.state.subCategories.includes(subCategory.name)
      );
      subTempArray.forEach(
        subCategory => (subCategory.category = category.name)
      );
      tempArray = tempArray.concat(subTempArray)
    });

    console.log(categories);

    this.setState({
      subCategories: tempArray,
      userFilters: {
        ...this.state.userFilters,
        categories: { filters: [...categories], facet: 'category' }
      }
    });
  }

  handleUpdateSubCategories = (event, subCategories) => {
    if (this.isArrayEmpty(subCategories, 'categories')) {
      return;
    }
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        categories: { filters: [...subCategories], facet: 'category' }
      }
    });
  }
}

export default connect(null, { updateResultItems, updateNHits })(
  withStyles(useStyles)(Sorting)
);
