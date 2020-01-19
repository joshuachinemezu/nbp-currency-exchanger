import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import StarIcon from '@material-ui/icons/Star'

import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
    position: 'relative',
    minHeight: 200
  },
  fab: {
    position: 'fixed',
    textAlign: 'right',
    bottom: theme.spacing(5),
    right: theme.spacing(3)
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600]
    }
  }
}))

export default function FloatingActionButtonZoom(props) {
  const classes = useStyles()
  const theme = useTheme()
  // const [value] = React.useState(0)

  const showModal = props.showModal

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  }

 
  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'></AppBar>

        <Zoom
          key={'primary'}
          in={true}
          timeout={transitionDuration}
          unmountOnExit
        >
          <Fab
            onClick={showModal}
            aria-label={'Favorite'}
            className={classes.fab}
            color={'primary'}
          >
            <StarIcon />
          </Fab>
        </Zoom>
    </div>
  )
}
