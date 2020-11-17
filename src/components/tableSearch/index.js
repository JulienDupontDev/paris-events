import React, { Component } from 'react'
import { fade, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Grid from '@material-ui/core/Grid'
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputBase
} from '@material-ui/core'
import { connect } from 'react-redux'
import { updateResultItems, updateNHits } from '../../redux/actions'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import CustomSwitch from './subComponents/Switch'
import SimpleSelect from './subComponents/SimpleSelect'

const useStyles = theme => ({
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
  constructor (props) {
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
    this.updateSwitchValue = this.updateSwitchValue.bind(this)
    this.updateSelectValue = this.updateSelectValue.bind(this)
  }

  componentDidUpdate () {
    this.handleUpdateResultItems()
  }

  componentDidMount () {
    axios
      .get(
        'https://opendata.paris.fr/api/records/1.0/search/?disjunctive.category=true&disjunctive.tags=true&disjunctive.address_zipcode=true&disjunctive.address_city=true&disjunctive.access_type=true&disjunctive.price_type=true&disjunctive.address_name=true&refine.category=Animations+&refine.category=Concerts+&refine.category=%C3%89v%C3%A9nements+&refine.category=Expositions+&refine.category=Spectacles+&rows=0&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&facetsort.category=alphanum&facetsort.tags=alphanum&facetsort.address_name=alphanum&facetsort.address_zipcode=alphanum&facetsort.address_city=alphanum&facetsort.access_type=alphanum&facetsort.price_type=alphanum&dataset=que-faire-a-paris-&timezone=Europe%2FBerlin&lang=fr'
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
        })
      })
  }

  render () {
    const { classes } = this.props
    const { userFilters } = this.state

    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Recherche'
              // className={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
              onChange={event =>
                this.setState({
                  userFilters: {
                    ...this.state.userFilters,
                    userQuery: { value: event.target.value, facet: 'q' }
                  }
                })
              }
              inputProps={{ 'aria-label': 'Rechercher' }}
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id='categories'
            key='1'
            limitTags={2}
            options={this.state.categories}
            disableCloseOnSelect
            onChange={(event, values) => {
              console.log(values)
              if (values.length === 0) {
                this.setState({
                  subCategories: [],
                  userFilters: { ...this.state.userFilters, categories: [] }
                })
                return
              }
              let tempArray = []
              values.forEach(category => {
                let subTempArray = category.facets.filter(
                  subCategory =>
                    !this.state.subCategories.includes(subCategory.name)
                )
                subTempArray.forEach(
                  subCategory => (subCategory.category = category.name)
                )
                tempArray = tempArray.concat(subTempArray)
              })

              console.log(values)

              this.setState({
                subCategories: tempArray,
                userFilters: {
                  ...this.state.userFilters,
                  categories: { filters: [...values], facet: 'category' }
                }
              })
            }}
            getOptionLabel={option => option.name}
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
        <Grid item xs={6} sm={4}>
          <Autocomplete
            multiple
            noOptionsText="Pas d'options"
            id='subCategories'
            key='2'
            limitTags={2}
            options={this.state.subCategories}
            groupBy={subCategory => subCategory.category}
            disableCloseOnSelect
            onChange={(event, values) => {
              if (this.isArrayEmpty(values, 'categories')) {
                return
              }

              this.setState({
                userFilters: {
                  ...this.state.userFilters,
                  categories: { filters: [...values], facet: 'category' }
                }
              })
            }}
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
            )}
          />
        </Grid>

        <SimpleSelect
          infos={{ name: 'tags', label: 'Mots-clés', values: this.state.tags }}
          update={this.updateSelectValue}
        />
        <SimpleSelect
          infos={{
            name: 'address_name',
            label: 'Nom du lieu',
            values: this.state.places
          }}
          update={this.updateSelectValue}
        />
        <SimpleSelect
          infos={{
            name: 'address_zipcode',
            label: 'Code postal',
            values: this.state.postCodes
          }}
          update={this.updateSelectValue}
        />
        <SimpleSelect
          infos={{
            name: 'address_city',
            label: 'Ville',
            values: this.state.cities
          }}
          update={this.updateSelectValue}
        />
        <CustomSwitch
          update={this.updateSwitchValue}
          infos={{
            name: 'pmr',
            title: 'Mobilité réduite',
            value: userFilters.pmr.value
          }}
        />
        <CustomSwitch
          update={this.updateSwitchValue}
          infos={{
            name: 'blind',
            title: 'Accès mal voyant',
            value: userFilters.blind.value
          }}
        />
        <CustomSwitch
          update={this.updateSwitchValue}
          infos={{
            name: 'deaf',
            title: 'Accès mal entendant',
            value: userFilters.deaf.value
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label="Date de l'évènement"
            format='dd/MM/yyyy'
            lang='fr'
            value={new Date(this.state.userFilters.selectedDate.value)}
            onChange={time =>
              this.setState({
                userFilters: {
                  ...this.state.userFilters,
                  selectedDate: { value: time.toISOString() },
                  facet: 'date_starte'
                }
              })
            }
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        {this.state.types
          ? this.state.types.map(type => (
              <Grid item sm={2}>
                <Autocomplete
                  multiple
                  noOptionsText="Pas d'options"
                  id={type.name}
                  limitTags={2}
                  options={this.state.types}
                  disableCloseOnSelect
                  getOptionLabel={type => type.name}
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
                      label={type.name}
                      placeholder='Mots-clés'
                    />
                  )}
                />
              </Grid>
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
      })

      return true
    }

    return false
  }
  updateSelectValue = (object, values) => {
    if (values.length === 0) {
      this.setState({
        userFilters: { ...this.state.userFilters, [object]: [] }
      })
      return
    }
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        [object]: {
          filters: [...values],
          facet: object
        }
      }
    })
  }

  updateSwitchValue = (object, value) => {
    this.setState({
      userFilters: {
        ...this.state.userFilters,
        [object]: { value: value, facet: object }
      }
    })
  }

  preparyQuery = () => {
    let query = ''
    Object.values(this.state.userFilters).forEach(value => {
      if (value.filters && value.filters.length !== 0) {
        query += `&facet=${value.facet}`
        console.log('lalala')

        value.filters.map(
          filter =>
            (query += `&refine.${value.facet}=${encodeURIComponent(
              filter.path
            ).replaceAll(' ', '+')}`)
        )
      } else {
        value.facet !== 'q'
          ? (query +=
              value.facet !== undefined
                ? `&facet=${value.facet}&refine.${value.facet}=${value.value}`
                : '')
          : (query += `&q=${value.value}`)
      }
    })
    query = query !== '' ? query : ''
    return `${query}&rows=10&start=0`
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
        })
        this.props.updateNHits(response.data.nhits)
      })
  }
}

export default connect(null, { updateResultItems, updateNHits })(
  withStyles(useStyles)(Sorting)
)
