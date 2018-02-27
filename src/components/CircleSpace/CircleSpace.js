import React, { Component } from 'react';
import './CircleSpace.css';

class CircleSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diameter: 0,
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const height = this.el.clientHeight
    const width = this.el.clientWidth
    const diameter = (height > width ? width : height) * 0.8

    this.setState({ diameter })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div
        className="CircleSpace"
        ref={ (el) => this.el = el}>
        <span className="CircleSpace-hole" style={{
          height: this.state.diameter,
          width: this.state.diameter,
          marginTop: - this.state.diameter / 2,
          marginLeft: - this.state.diameter / 2,
        }}></span>
      </div>
    );
  }
}

export default CircleSpace;