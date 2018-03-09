import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircleSpace from 'components/CircleSpace/CircleSpace'
import Disc from 'components/Disc/Disc'
import './Column.css'

class Column extends Component {
  isClickable() {
    return !this.props.isDisabled && this.props.column.indexOf(null) >= 0
  }

  renderNextDisc() {
    const height = 70 / this.props.column.length

    return (
      this.props.nextToPlay && (
        <div
          className="Column--nextDisc"
          style={{
            height: `${height}%`,
            top: `${-height}%`
          }}
        >
          <Disc value={this.props.nextToPlay} />
        </div>
      )
    )
  }

  render() {
    return (
      <div
        className={`Column ${this.isClickable() ? 'Column--clickable' : ''}`}
        onClick={() => {
          if (this.isClickable()) this.props.onClick()
        }}
      >
        {this.renderNextDisc()}
        {this.props.column.map((row, i) => {
          return <CircleSpace key={i} value={row} />
        })}
      </div>
    )
  }
}

Column.propTypes = {
  onClick: PropTypes.func.isRequired,
  column: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  nextToPlay: PropTypes.number
}

export default Column
