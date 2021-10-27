import React from 'react';
import { isSameDay, isSameMonth } from '../../helpers/calendar';
import useStyles from '../../styles/theDatesStyles';

const TheDate = ({ date, current, month, year, today, handleSelectDate }) => {
  const classes = useStyles();
  const _date = new Date(date.join('-'));
  const dateDay = date[2];

  // Check if calendar date is same day as today
  const isToday = isSameDay(_date, today);

  // Check if calendar date is same day as currently selected date
  const isCurrent = current && isSameDay(_date, current);

  // Check if calendar date is in the same month as the state month and year
  const inMonth =
    month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));

  return (
    <>
      <span
        onClick={handleSelectDate}
        className={`${
          inMonth
            ? isToday
              ? classes.textRed
              : classes.inMonth
            : classes.textGray
        } ${inMonth && isCurrent ? classes.circleRed : ''}`}
        key={date}
        name={date}
      >
        {dateDay}
      </span>
    </>
  );
};

export default TheDate;
