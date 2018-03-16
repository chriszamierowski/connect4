import React, { Component } from 'react'
import './App.css'
import Game from 'components/Game/Game'
import About from 'components/About/About'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ) // not initial render

    return (
      <div className="App">
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/about" component={About} />
          <Route path="/" exact component={Game} />
          <Redirect from="*" to="/" />
        </Switch>
        {isModal ? <Route path="/about" component={About} /> : null}
      </div>
    )
  }
}

export default App
