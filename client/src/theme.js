import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a7c0cd',
      main: '#78909c',
      dark: '#4b636e',
    },
    secondary: {
      light: '#ffe54c',
      main: '#ffb300',
      dark: '#c68400',
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        color: 'white',
      },
    },
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        '& $notchedOutline': {
          borderColor: 'white',
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: 'white',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: 'white',
          },
        },
        '&$focused $notchedOutline': {
          borderColor: 'white',
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: 'white',
        '&$focused': {
          color: 'white',
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
});

export default theme;
