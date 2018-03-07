import React, { Component } from 'react';
import './CircleSpace.css';
import Disc from 'components/Disc/Disc'
import PropTypes from 'prop-types';

class CircleSpace extends Component {
  renderDisc() {
    return <Disc value={this.props.value} />
  }

  render() {
    return (
      <div
        className="CircleSpace">
        <span className="CircleSpace-hole">{this.props.value && this.renderDisc()}</span>
      </div>
    );
  }
}

CircleSpace.propTypes = {
  value: PropTypes.number
}

export default CircleSpace;
