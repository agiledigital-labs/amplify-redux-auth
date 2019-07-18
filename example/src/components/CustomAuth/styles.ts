import { createStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#520049',
      light: '#520049',
      dark: '#520049',
      contrastText: '#fff'
    },
    secondary: {
      main: '#520049'
    }
  }
});

/**
 * @see https://material-ui.com/customization/themes
 */
const authStyles = createStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  logoImage: {
    [theme.breakpoints.up('xs')]: {
      width: '50px'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60px'
    },
    [theme.breakpoints.up('md')]: {
      width: '70px'
    },
    verticalAlign: 'middle'
  },
  logoSection: {
    top: '35px',
    position: 'absolute'
  },
  logoText: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '140%',
      top: '5px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '200%',
      top: '10px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '375%',
      top: '20px'
    },
    fontWeight: 300,
    position: 'relative',
    paddingLeft: '15px',
    textTransform: 'uppercase',
    color: '#000152'
  },
  card: {
    minWidth: 300
  },
  title: {
    margin: '20px',
    textAlign: 'center',
    color: '#000152',
    textTransform: 'uppercase'
  },
  form: {
    padding: '10px'
  },
  input: {
    display: 'flex',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#2626d1',
    color: '#ffffff'
  }
});

export default authStyles;
