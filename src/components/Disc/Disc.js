import React, { Component } from 'react';
import './Disc.css';
import PropTypes from 'prop-types';

class Disc extends Component {
  render() {
    return (
      <div className={`Disc Disc-player${this.props.value}`}></div>
    );
  }
}

Disc.propTypes = {
  value: PropTypes.number.isRequired
}

export default Disc;
