import React from 'react';
import { calendarDecades } from '../../helpers/calendar';
import useStyles from '../../styles/decadesStyles';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Decades({
  currentYear,
  year,
  handlePrevDecades,
  handleNextDecades,
  handleSelectYear,
}) {
  const classes = useStyles();
  // Generate current decade
  // [prevDecadeYear, currentDecade, nextDecadeYear]
  const thisDecade = calendarDecades(year);
  const prevDecadeYear = thisDecade[0];
  const currentDecade = thisDecade[1];
  const nextDecadeYear = thisDecade[2];

  return (
    <>
      <div className={classes.navigation}>
        <button onClick={handlePrevDecades} className={classes.arrowBtn}>
          <IoIosArrowBack />
        </button>
        <span>{`${currentDecade[0]} - ${currentDecade[9]}`}</span>
        <button className={classes.arrowBtn} onClick={handleNextDecades}>
          <IoIosArrowForward />
        </button>
      </div>
      <div className={classes.decades}>
        <span className={classes.textGray}>{prevDecadeYear}</span>
        {currentDecade.map((decade) => (
          <span
            key={decade}
            className={+decade === +currentYear ? classes.circleRed : ''}
            onClick={handleSelectYear}
          >
            {decade}
          </span>
        ))}
        <span className={classes.textGray}>{nextDecadeYear}</span>
      </div>
    </>
  );
}
