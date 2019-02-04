import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

let openSnackbarFn;

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
    message: ''
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  openSnackbar = ({ message }) => {
    this.setState({
      open: true,
      message
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false,
      message: ''
    });
  };

  render() {
    const message = (
      <span
        id="snackbar-message-id"
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={message}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export function openSnackbar({ message }) {
  openSnackbarFn({ message });
}

export default withStyles(styles)(SimpleSnackbar);
