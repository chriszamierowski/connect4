import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleSpace from 'components/CircleSpace/CircleSpace'
import './Column.css';

class Column extends Component {
  isClickable() {
    return !this.props.isDisabled && this.props.column.indexOf(null) >= 0
  }

  render() {
    return (
      <div
        className={`Column ${this.isClickable() ? 'Column--clickable' : ''}`}
        onClick={() => { if (this.isClickable()) this.props.onClick() }}>
        {this.props.column.map((row, i) => {
          return <CircleSpace
            key={i}
            value={row} />
        })}
      </div>
    );
  }
}

Column.propTypes = {
  onClick: PropTypes.func.isRequired,
  column: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
}

export default Column;
