import React from 'react';
import PropTypes from 'prop-types';
import s from './Row.scss';
import _ from 'lodash';
import Cell from '../Cell';

function Row({rowIndex,data}) {
  return (
      <tr className={s.tableRow}>
          <th>{rowIndex + 1}</th>
          { _.times(10, cellIndex => <Cell key={cellIndex} rowIndex={rowIndex} cellIndex={cellIndex} />) }
      </tr>
  );
}

Row.propTypes = {
    rowIndex: PropTypes.number.isRequired
};

export default Row;