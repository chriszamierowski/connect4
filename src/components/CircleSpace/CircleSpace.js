import React, { Component } from 'react';
import './CircleSpace.css';
import Disc from 'components/Disc/Disc'

class CircleSpace extends Component {
  render() {
    const disc = <Disc
      value={this.props.value} />

    return (
      <div
        className="CircleSpace">
        <span className="CircleSpace-hole">{this.props.value && disc}</span>
      </div>
    );
  }
}

export default CircleSpace;
