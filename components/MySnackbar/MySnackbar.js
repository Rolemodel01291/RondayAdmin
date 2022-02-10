import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
          'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 12,
      whiteSpace: 'pre-line',
      textAlign: 'center'
  },
  
});


function Alert(props) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

export default function MySnackbar(props) {
  const classes = useStyles(); 
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props])

  const handle = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.handleClose(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handle}>
      <Alert onClose={handle} severity="info" className={clsx(classes.root)}>
        {props.title}
      </Alert>
    </Snackbar>

  );
}