import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './index.css';
import Chat from '../trivia';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
  }

  onKeyPress = (e) => {
    if (e.charCode === 13) {
      this.signIn();
    }
  }

  onChange = (e) => {
    this.setState({ input: e.target.value })
  }

  signIn = (e) => {
    this.setState({ username: this.state.input })
  }

  signOut = () => {
    this.setState({ username: '' })
  }

  render() {
    let usernameBlock = null;
    if (this.state.username) usernameBlock =
      <div>
        <div>
          <span>You are playing as {this.state.username}   </span>
          <button type="button" className="btn btn-primary" onClick={this.signOut}>Sign Out</button>
        </div>
      </div>
    else usernameBlock =
      <div>
        <div>Enter Your Name To Start Playing</div>
        <input placeholder='Your name' onKeyPress={this.onKeyPress} onChange={this.onChange}></input>
        <span>  </span><button type="button" className="btn btn-primary" onClick={this.signIn}>Chat</button>
      </div>

    let chatBlock = null;
    if (this.state.username) chatBlock =
      <div>
        <Chat username={this.state.username} />
      </div>
    else chatBlock =
      <div>Sign in to play!</div>


    var appTemplate =
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Trivia</h1>
          {usernameBlock}
        </header>
        <div className="App-body">
          {chatBlock}
        </div>
      </div>

    return appTemplate;
  }
}

export default App;
