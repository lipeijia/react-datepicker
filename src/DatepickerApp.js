import React, { useState } from 'react';
import Calendar from './components/Calendar';
import DatePicker from './components/DatePicker';
import useToggle from './hooks/useToggleState';
import { createUseStyles } from 'react-jss';
import {
  isDate,
  getPreviousMonth,
  getNextMonth,
  zeroPad,
  getDateISO,
} from './helpers/calendar';

const useStyles = createUseStyles({
  rootCenter: {
    width: '300px',
    margin: '0 auto',
    marginTop: '10vh',
  },
});
// Generate default state
const getSelectedDates = (date) => {
  const isDateObject = isDate(date);
  const _date = isDateObject ? date : new Date();
  return {
    current: isDateObject ? date : null,
    month: +_date.getMonth() + 1,
    year: _date.getFullYear(),
    date: _date.getDate(),
  };
};

function DatepickerApp() {
  const classes = useStyles();

  // Calendar UI state
  const [selectedDate, setSelectedDate] = useState(
    getSelectedDates(new Date())
  );
  //  (red circle) Calendar current selected year / month / date state
  const [currentDate, setCurrentDate] = useState({
    currentMonth: [selectedDate.year, selectedDate.month],
    currentYear: selectedDate.year,
  });

  // destructing state properties
  const { month, year, date } = selectedDate;

  // Date picker input value state
  const [val, updateVal] = useState(`${year}-${zeroPad(month, 2)}-${date}`);

  // Toggle different calendar mode (date / month / decade)
  const [isMonth, toggleMonths] = useToggle(false);
  const [isDecade, toggleDecade] = useToggle(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePickerKeyUp = (e) => {
    (e.code === 'Enter' || e.code === 'Escape') && setIsCalendarOpen(false);
  };

  // Date Picker Event Handlers
  const handleUpdateVal = (e) => {
    updateVal(e.target.value);
    const reg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    // YYYY-MM-DD
    // if input value is valid date formate, then update state
    if (reg.test(e.target.value)) {
      const validDate = new Date(e.target.value);
      const inputDate = getSelectedDates(validDate);
      setSelectedDate(() => ({
        current: inputDate.current,
        year: inputDate.year,
        month: zeroPad(inputDate.month, 2),
        date: zeroPad(inputDate.date, 2),
      }));
      setCurrentDate((prevState) => ({
        ...prevState,
        currentMonth: [inputDate.year, zeroPad(inputDate.month, 2)],
        currentYear: inputDate.year,
      }));
    }
  };

  // Date Calendar Event Handlers
  const handlePrevMonth = (e) => {
    e.preventDefault();
    const prevMonth = getPreviousMonth(month, year);
    setSelectedDate((prevState) => ({
      ...prevState,
      ...prevMonth,
    }));
  };
  const handleNextMonth = (e) => {
    e.preventDefault();
    const nextMonth = getNextMonth(month, year);
    setSelectedDate((prevState) => ({
      ...prevState,
      ...nextMonth,
    }));
  };

  const handleSelectDate = (e) => {
    e.preventDefault();
    const selectedDate = e.currentTarget.attributes.name.value;
    const newCurrentDate = new Date(selectedDate.replaceAll(',', '-'));
    setSelectedDate((prevState) => ({
      ...prevState,
      current: newCurrentDate,
      date: newCurrentDate.getDate(),
    }));
    updateVal(getDateISO(newCurrentDate));
    setIsCalendarOpen(false);
  };

  const handleShowMonths = (e) => {
    e.preventDefault();
    toggleMonths();
  };

  // Month Calendar Event Handlers
  const handlePrevYear = (e) => {
    e.preventDefault();
    setSelectedDate((prevState) => ({
      ...prevState,
      year: year - 1,
    }));
  };

  const handleNextYear = (e) => {
    e.preventDefault();
    setSelectedDate((prevState) => ({
      ...prevState,
      year: year + 1,
    }));
  };
  const handleSelectMonth = (e) => {
    e.preventDefault();
    const selectedMonth = e.currentTarget.attributes.name.value;
    const _selectedMonth = new Date(`${selectedMonth}-${zeroPad(date, 2)}`);
    const newCurrentMonth = _selectedMonth.getMonth();
    const newCurrentYear = _selectedMonth.getFullYear();

    setSelectedDate((prevState) => ({
      ...prevState,
      month: +newCurrentMonth + 1,
      year: +newCurrentYear,
    }));
    setCurrentDate((prevState) => ({
      ...prevState,
      currentMonth: [+newCurrentYear, +newCurrentMonth + 1],
    }));
    updateVal(getDateISO(_selectedMonth));
    toggleMonths();
  };

  const handleShowDecades = (e) => {
    e.preventDefault();
    toggleDecade();
  };

  // Decade Calendar Event Handlers
  const handlePrevDecades = (e) => {
    e.preventDefault();
    setSelectedDate((prevState) => ({
      ...prevState,
      year: +year - 10,
    }));
  };

  const handleNextDecades = (e) => {
    e.preventDefault();
    setSelectedDate((prevState) => ({
      ...prevState,
      year: +year + 10,
    }));
  };

  const handleSelectYear = (e) => {
    const selectedYear = e.currentTarget.innerText;
    const currentSelected = new Date(
      `${selectedYear}-${zeroPad(month, 2)}-${zeroPad(date, 2)}`
    );

    setSelectedDate((prevState) => ({
      ...prevState,
      year: +selectedYear,
    }));
    setCurrentDate((prevState) => ({
      ...prevState,
      currentYear: +selectedYear,
    }));
    updateVal(getDateISO(currentSelected));
    toggleDecade();
  };

  return (
    <div className={classes.rootCenter}>
      <DatePicker
        val={val}
        handleUpdateVal={handleUpdateVal}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        handlePickerKeyUp={handlePickerKeyUp}
      />
      {isCalendarOpen && (
        <Calendar
          selectedDate={selectedDate}
          currentDate={currentDate}
          isMonth={isMonth}
          isDecade={isDecade}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleSelectDate={handleSelectDate}
          handleShowMonths={handleShowMonths}
          handlePrevYear={handlePrevYear}
          handleNextYear={handleNextYear}
          handleSelectMonth={handleSelectMonth}
          handleShowDecades={handleShowDecades}
          handlePrevDecades={handlePrevDecades}
          handleNextDecades={handleNextDecades}
          handleSelectYear={handleSelectYear}
        />
      )}
    </div>
  );
}

export default DatepickerApp;
