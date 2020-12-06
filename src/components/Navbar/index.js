import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import { Link } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

/**
 * @method
 * @description Permet d'afficher une fleche pour retourner en haut de la page
 * @param {*} props
 */
function ScrollTop(props) {
  const { children, window } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  /**
   * Gere le click sur le bouton haut de page
   * @method
   * @param {*} event 
   */
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}
/**
 * @class Navbar
 * @component
 * @param {*} props 
 */
export default function Navbar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Link
            underline='none'
            href='/'
            style={{ color: 'white', fontSize: '15pt' }}
            rel='noreferrer'
            variant='h1'
          >
            Paris évènements
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
      <ScrollTop {...props}>
        <Fab
          color='primary'
          size='small'
          aria-label='scroll back to top'
          style={{ zIndex: '999' }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
