import React, { Component } from 'react';
import './Disc.css';

class Disc extends Component {
  render() {
    return (
      <div className={`Disc Disc-player${this.props.value}`}></div>
    );
  }
}

export default Disc;
