import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { updateResultItems, updateNHits, updateLoading } from '../../redux/actions';
import axios from 'axios';
import CustomSwitch from './subComponents/Switch';
import SimpleSelect from './subComponents/SimpleSelect';
import SearchInput from './subComponents/Search';
import facetsQuery from './facets.json';
import EventDatePicker from './subComponents/EventDatePicker';
import Categories from './subComponents/Categories';

const useStyles = (theme) => ({
  root: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center'
  },
});

/**
 * @class Sorting
 * @component
 * @description permet de modifier les critères de recherche pour l'utilisateur et d'aller chercher les évènements correspondants 
 */
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
      price_types: [],
      access_types: [],
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
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
  }

  /**
   * @method
   */
  componentDidUpdate() {
    this.handleUpdateResultItems();
  }

  /**
   * @method
   * @description Va charger tous les critères disponibles et les ajouter dans le state du composant
   */
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
          access_types: facets.filter(facet => facet.name === 'access_type')[0].facets,
          price_types: facets.filter(facet => facet.name === 'price_type')[0].facets,
          postCodes: facets.filter(facet => facet.name === 'address_zipcode')[0]
            .facets,
          tags: facets.filter(facet => facet.name === 'tags')[0].facets,
          cities: facets.filter(facet => facet.name === 'address_city')[0]
            .facets,
          places: facets.filter(facet => facet.name === 'address_name')[0]
            .facets,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { userFilters } = this.state;

    return (
      <Grid item>
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
          <SimpleSelect
            key='price_type'
            infos={{
              name: 'price_type',
              label: 'Type de prix',
              values: this.state.price_types
            }}
            update={this.updateSelectValue}
          />
          <SimpleSelect
            key='access_type'
            infos={{
              name: 'access_type',
              label: 'Type d\'accès',
              values: this.state.access_types
            }}
            update={this.updateSelectValue}
          />

          <EventDatePicker update={this.handleDateUpdate} date={this.state.userFilters.selectedDate} />
        </Grid>
      </Grid>
    )
  }

  /**
   * Vérifies que le tableau envoyé n'est pas nul
   * @method
   * @param {object[]} values 
   * @param {string} objectName 
   * @returns {boolean} 
   */
  isArrayEmpty = (values, objectName) => {
    if (values.length === 0) {
      this.setState({
        userFilters: { ...this.state.userFilters, [objectName]: [] }
      });
      return true;
    }
    return false;
  }

  /**
   * @method
   * @description Permet de mettre à jour l'état des filtres de recherche de type "select" (sauf Catégorie et Sous-catégories)
   * @param {*} object 
   * @param {*} values 
   */
  updateSelectValue = (object, values) => {
    if (values.length === 0) {
      this.setState({
        userFilters: { ...this.state.userFilters, [object]: [] }
      });
      return;
    }
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        [object]: {
          filters: [...values],
          facet: object,
        },
      }
    });
  }

  /**
   * @method
   * @description Permet de mettre à jour la date de l'évènement
   * @param {*} newDate 
   */
  handleDateUpdate = (newDate) => {
    if (newDate !== null) {
      this.setState({
        userFilters: {
          ...this.state.userFilters,
          selectedDate: { value: new Date(newDate).toISOString(), facet: 'date_start' },
        },
      });
      return;
    }
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        selectedDate: { value: null },
      },
    });

  }

  /**
   * @method
   * @description Modifie la valeur des champs de type Switch 
   * @param {*} object 
   * @param {*} value 
   */
  updateSwitchValue = (object, value) => {
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        [object]: value ? { value: value, facet: object } : { value: 0 },
      },
    });
  }

  /**
   * @method
   * @description Génère la requête avec les filtres définis par l'utilisateur
   * @returns {string} : query 
   */
  preparyQuery = () => {
    let query = '';
    Object.values(this.state.userFilters).forEach(value => {
      if (value.filters && value.filters.length !== 0) {
        query += `&facet=${value.facet}`;
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

  /**
   * @method
   * @description Sauvegardes la recherche de l'utilisateur dans le state 
   * @param {string} query 
   */
  handleSearch = (query) => {
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        userQuery: { value: query, facet: 'q' },
      },
    });
  }

  /**
   * @method
   * @description Mets à jour les résultats contenus dans le store avec ceux obtenus via l'api
   */
  handleUpdateResultItems = async () => {
    const query = this.preparyQuery();
    this.props.updateLoading(true);
    await axios
      .get(
        `https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-${query}`
      )
      .then(response => {
        this.props.updateResultItems({
          results: response.data.records,
          query: query,
        });
        this.props.updateNHits(response.data.nhits);
        this.props.updateLoading(false);
      });
  }

  /**
   * @method
   * @description Mets à jour les catégories dans les résultats de recherche 
   * et mets à jour les sous -catégories disponibles 
   * @param {*} event 
   * @param {object[]} categories 
   */
  handleUpdateCategories = (event, categories) => {
    if (categories.length === 0) {
      this.setState({
        subCategories: [],
        userFilters: { ...this.state.userFilters, categories: [] },
      });
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
      tempArray = tempArray.concat(subTempArray);
    });

    this.setState({
      subCategories: tempArray,
      savedCategories: { filters: [...categories], facet: 'category' },
      userFilters: {
        ...this.state.userFilters,
        categories: { filters: [...categories], facet: 'category' }
      }
    });
  }

  /**
   * @method
   * @description Permet de mettre à jour les sous-catégories choisies
   * Si aucune alors on remet les catégories choisies seulement
   * dans les filtres de recherche
   * @param {*} event 
   * @param {object[]} subCategories 
   */
  handleUpdateSubCategories = (event, subCategories) => {
    if (this.isArrayEmpty(subCategories, 'categories')) {
      this.setState({ ...this.state, userFilters: { ...this.state.userFilters, categories: this.state.savedCategories } })
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

export default connect(null, { updateResultItems, updateNHits, updateLoading })(withStyles(useStyles)(Sorting));
