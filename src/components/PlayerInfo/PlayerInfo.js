import React, { Component } from 'react'
import './PlayerInfo.css'
import PropTypes from 'prop-types'
import Disc from 'components/Disc/Disc'

class PlayerInfo extends Component {
  render() {
    return (
      <div
        className={`PlayerInfo PlayerInfo-player${this.props.value || ''} ${
          this.props.isTheirTurn ? 'PlayerInfo-turn' : ''
        }`}
      >
        <Disc value={this.props.value} />
        <h2 className="PlayerInfo--name">{`Player ${this.props.value}`}</h2>
      </div>
    )
  }
}

PlayerInfo.propTypes = {
  value: PropTypes.number.isRequired,
  isTheirTurn: PropTypes.bool
}

export default PlayerInfo
