import React from 'react';
import { CALENDAR_MONTHS, calendarMonths } from '../../helpers/calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useStyles from '../../styles/monthsStyles';

export default function Months({
  currentMonth,
  month,
  year,
  handlePrevYear,
  handleNextYear,
  handleSelectMonth,
  handleShowDecades,
}) {
  const classes = useStyles();
  const monthsNames = Object.values(CALENDAR_MONTHS);
  const thisMonths = calendarMonths(year);
  return (
    <>
      <div className={classes.navigation}>
        <button className={classes.arrowBtn} onClick={handlePrevYear}>
          <IoIosArrowBack />
        </button>
        <button className={classes.datesBtn} onClick={handleShowDecades}>
          {year}
        </button>
        <button className={classes.arrowBtn} onClick={handleNextYear}>
          <IoIosArrowForward />
        </button>
      </div>
      <div className={classes.months}>
        {monthsNames.map((m, i) => (
          <span
            className={
              +thisMonths[i][0] === +currentMonth[0] &&
              +thisMonths[i][1] === +currentMonth[1]
                ? classes.circleRed
                : ''
            }
            key={thisMonths[i].join('-')}
            name={thisMonths[i].join('-')}
            onClick={handleSelectMonth}
          >
            {m}
          </span>
        ))}
      </div>
    </>
  );
}
