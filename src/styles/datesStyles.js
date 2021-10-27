import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowBtn: {
    border: 0,
    fontSize: '14px',
    background: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    padding: '.7em',
    transitionDuration: '0.2s',
    '&:hover': {
      background: '#eee',
    },
  },
  datesBtn: {
    flexGrow: 1,
    border: 0,
    background: 'none',
    borderRadius: '3px',
    padding: '.7em 0',
    fontWeight: 'bold',
    fontSize: '14px',
    transitionDuration: '0.2s',
    cursor: 'pointer',
    '&:hover': {
      background: '#eee',
    },
  },
  days: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexWrap: 'wrap',
    '& *': {
      width: 'calc(300px / 9)',
      height: 'calc(300px / 9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
    },
    '& p': {
      fontWeight: 'bold',
      fontSize: '13px',
      margin: '.3em 0',
    },
    '& span': {
      margin: '.3em 0',
    },
  },
});

export default useStyles;
