import React from 'react';
import TheDate from './TheDate';
import {
  WEEK_DAYS,
  CALENDAR_MONTHS,
  calendarDates,
} from '../../helpers/calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useStyles from '../../styles/datesStyles';

const Dates = (props) => {
  const {
    current,
    month,
    year,
    today,
    handlePrevMonth,
    handleNextMonth,
    handleShowMonths,
    handleSelectDate,
  } = props;
  const classes = useStyles();
  const monthName =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];
  const calendarDatesArr = calendarDates(month, year);

  return (
    <>
      <div className={classes.navigation}>
        <button className={classes.arrowBtn} onClick={handlePrevMonth}>
          <IoIosArrowBack />
        </button>
        <button className={classes.datesBtn} onClick={handleShowMonths}>
          {`${monthName}  ${year}`}
        </button>

        <button className={classes.arrowBtn} onMouseDown={handleNextMonth}>
          <IoIosArrowForward />
        </button>
      </div>
      <div className={classes.days}>
        {Object.values(WEEK_DAYS).map((day) => (
          <p key={day} className={classes.day}>
            {day}
          </p>
        ))}
      </div>
      <div className={classes.days}>
        {calendarDatesArr.map((date) => (
          <TheDate
            key={date.join('-')}
            date={date}
            current={current}
            month={month}
            year={year}
            today={today}
            handleSelectDate={handleSelectDate}
          />
        ))}
      </div>
    </>
  );
};

export default Dates;
