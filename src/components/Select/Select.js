import React, { Component } from 'react'
import './Select.css'
import PropTypes from 'prop-types'

class Select extends Component {
  render() {
    const label = (
      <label className="Select--label" htmlFor={this.props.id}>
        {this.props.label}:
      </label>
    )

    return (
      <div className="Select">
        {this.props.label && label}
        <select
          className="Select--select"
          id={this.props.id}
          value={this.props.value}
          onChange={e => this.props.onChange(e)}
        >
          {this.props.options.map(o => {
            return (
              <option value={o.value || o} key={o.value || o}>
                {o.label || o}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired
}

export default Select
