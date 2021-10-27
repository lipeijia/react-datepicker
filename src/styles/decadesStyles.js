import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& span': {
      fontSize: '14px',
      fontWeight: 'bold',
    },
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
  decades: {
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
      borderRadius: '50%',
      margin: '.3em 0',
      transitionDuration: '.2s',
      cursor: 'pointer',
      userSelect: 'none',
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
  textGray: {
    color: '#ccc',
    '&:hover': {
      background: 'none !important',
      cursor: 'auto !important',
    },
  },
});

export default useStyles;
