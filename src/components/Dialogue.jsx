import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  empty: {
    margin: theme.spacing(10),
    textAlign: 'center'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function FullScreenDialog(props) {
  const classes = useStyles()

  let handleClose = props.handleClose
  let favorites = props.favorites
  let open = props.open

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Favorites
            </Typography>
            <Button
              autoFocus
              color='inherit'
              onClick={(e) => {
                props.removeAllFavorite()
                handleClose(e)
              }}
            >
              Remove All
            </Button>
          </Toolbar>
        </AppBar>
        {favorites.length > 0 ? (
          <List>
            {favorites.map((favorite, index) => (
              <div key={index}>
                <ListItem button>
                  <ListItemText primary={favorite} />
                  <IconButton
                    color='inherit'
                    onClick={() => props.removeFavorite(favorite)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>

                <Divider />
              </div>
            ))}
          </List>
        ) : (
          <Typography variant='h6' className={classes.empty}>
            No Favorite Currency
          </Typography>
        )}
      </Dialog>
    </div>
  )
}
