import React, { Component } from 'react';
import './App.css';
import Game from 'components/Game/Game'
import Disc from 'components/Disc/Disc'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Disc />
        <Game />
      </div>
    );
  }
}

export default App;
