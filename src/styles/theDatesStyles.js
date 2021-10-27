import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  inMonth: {
    borderRadius: '50%',
    cursor: 'pointer',
    transitionDuration: '.2s',
    '&:hover': {
      background: '#eee',
    },
  },
  textGray: {
    color: '#ccc',
  },
  textRed: {
    color: '#db3d44',
    cursor: 'pointer',
  },
  circleRed: {
    background: '#db3d44 !important',
    color: '#fff',
    borderRadius: '50%',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
});

export default useStyles;
