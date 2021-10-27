// (int) The current year.
export const THIS_YEAR = +new Date().getFullYear();

// etMonth() and getDay() both return a zero-based value.
// (int) THe current month starting from 1 - 12.
// 1 => January, 12 => December
export const THIS_MONTH = +new Date().getMonth() + 1;

// Week days names and short names.
export const WEEK_DAYS = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
};

// Calendar months names and short names.
export const CALENDAR_MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

// Weeks displayed on calendar.
export const CALENDAR_WEEKS = 6;

// Pads a string values with leading zeros(0) until length is reached.
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
};

// (int) Number days in a month for given year from 28 -31
// 31: 1, 3, 5, 7, 8, 10, 12
// 30: 4, 6, 9, 11
// 29: 2(leap year)
// 28: 2

export const getMonthDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

// (int) First day of the month for a given from 1 - 7
// 1 => Sunday, 7 => Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

// ---------------

// (bool) Checks if a  value is a date - this is just a check
export const isDate = (date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';

  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
};

// (bool) Checks if two date values are the same day
export const isSameDay = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
};

// (bool) Checks if two date values are the same month and year
export const isSameMonth = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;

  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2),
  ].join('-');
};

// ({month, year}) Gets the month and year before the given month and year
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

// ({month, year}) Gets the month and year after the given month and year
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

// -------------

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]

export const calendarDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  // ---CURRENT---
  // step1: Get number of days in the month and the month's first day
  const monthDates = getMonthDates(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  // step2: Builds dates to be displayed from current month
  const thisMonthDates = [...Array(monthDates)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  // ---PREV---
  // step1: Get the previous months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );

  // step2: Get number of days to be displayed from previous
  const dayFromPrevMonth = monthFirstDay - 1;

  // step3: Get the last day in previous month
  const prevLastDate = getMonthDates(prevMonth, prevMonthYear);

  // step4: Builds dates to be displayed from previous month
  const prevMonthDates = [...Array(dayFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevLastDate - dayFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  // ---NEXT---
  // step1: Get the previous months and years
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  // step2: Get number of days to be displayed from next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const spaceForNextMonth =
    CALENDAR_WEEKS * 7 - (dayFromPrevMonth + monthDates);

  // ---Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(spaceForNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

export const calendarMonths = (year = THIS_YEAR) =>
  [...Array(12)].map((m, i) => [year, zeroPad(i + 1, 2)]);

export const calendarDecades = (year = THIS_YEAR) => {
  const startYear = +`${year.toString().slice(0, 3)}0`;
  const endYear = +`${year.toString().slice(0, 3)}9`;
  const prevDecadeYear = startYear - 1;
  const nextDecadeYear = endYear + 1;
  const currentDecade = [...Array(10)].map((d, i) => startYear + i);
  return [prevDecadeYear, currentDecade, nextDecadeYear];
};
