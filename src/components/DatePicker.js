import React from 'react';
import { IoIosCalendar } from 'react-icons/io';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
    color: '#555',
    transitionDuration: '.2s',
    '& input': {
      width: '6em',
      border: 0,
      padding: '5px 0',
      color: 'inherit',
      textAlign: 'center',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  open: {
    '& svg': {
      color: 'lightseagreen',
      transitionDuration: '.2s',
    },
    borderColor: 'lightseagreen',
  },
});

export default function DatePicker(props) {
  const {
    val,
    handleUpdateVal,
    isCalendarOpen,
    setIsCalendarOpen,
    handlePickerKeyUp,
  } = props;
  const classes = useStyles();

  return (
    <>
      <div
        className={`${classes.root} ${isCalendarOpen ? classes.open : ''}`}
        onClick={() => setIsCalendarOpen(true)}
      >
        <IoIosCalendar />
        <input
          type='text'
          value={val}
          onChange={handleUpdateVal}
          onKeyUp={handlePickerKeyUp}
        />
      </div>
    </>
  );
}
