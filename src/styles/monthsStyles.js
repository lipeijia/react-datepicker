import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowBtn: {
    border: 0,
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
  months: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexWrap: 'wrap',
    '& span': {
      width: 'calc(300px / 5)',
      height: 'calc(300px / 5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      borderRadius: '50%',
      margin: '.3em 0',
      transitionDuration: '.2s',
      cursor: 'pointer',
      '&:hover': {
        background: '#eee',
      },
    },
  },
  circleRed: {
    background: '#db3d44 !important',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default useStyles;
