import React from 'react';
import Dates from './calenderPartial/Dates';
import Months from './calenderPartial/Months';
import Decades from './calenderPartial/Decades';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  calendarContent: {
    border: '1px solid #ddd',
    padding: '1em',
    boxShadow: '1px 3px 3px #ddd',
  },
});

export default function Calendar(props) {
  const classes = useStyles();
  const {
    selectedDate,
    currentDate,
    isMonth,
    isDecade,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
    handleShowMonths,
    handlePrevYear,
    handleNextYear,
    handleSelectMonth,
    handleShowDecades,
    handlePrevDecades,
    handleNextDecades,
    handleSelectYear,
  } = props;

  const { month, year, current } = selectedDate;
  const { currentMonth, currentYear } = currentDate;

  // Render Calendar

  let renderCalendar;
  if (isMonth & !isDecade) {
    renderCalendar = (
      <Months
        currentMonth={currentMonth}
        month={month}
        year={year}
        handlePrevYear={handlePrevYear}
        handleNextYear={handleNextYear}
        handleSelectMonth={handleSelectMonth}
        handleShowDecades={handleShowDecades}
      />
    );
  } else if (isDecade) {
    renderCalendar = (
      <Decades
        year={year}
        currentYear={currentYear}
        handlePrevDecades={handlePrevDecades}
        handleNextDecades={handleNextDecades}
        handleSelectYear={handleSelectYear}
      />
    );
  } else {
    renderCalendar = (
      <Dates
        month={month}
        year={year}
        current={current}
        handleShowMonths={handleShowMonths}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        handleSelectDate={handleSelectDate}
      />
    );
  }

  return (
    <>
      {/* <DatePicker /> */}
      <div className={classes.calendarContent}>{renderCalendar}</div>
    </>
  );
}
