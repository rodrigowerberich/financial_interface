import './App.css';
import React from 'react';

import LoginCard from './LoginCard';
import LoginCode from './LoginCode';
import FileImporter from './FileImporter';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showLogin: true,
      showLoginCode: false,
      showFileImporter: false,
      googleDriveHandle: -1
    };
    this.getHandle = this.getHandle.bind(this);
    this.hideComponent = this.hideComponent.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.toggleComponentVisibility = this.toggleComponentVisibility.bind(this);
    this.switchComponents = this.switchComponents.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onCodeSendClick = this.onCodeSendClick.bind(this);
    this.onCodeCloseClick = this.onCodeCloseClick.bind(this);
  }

  toggleComponentVisibility(name, state) {
    switch (name) {
      case "Login":
        this.setState({ showLogin: state });
        break;
      case "LoginCode":
          this.setState({ showLoginCode: state });
          break;
      case "FileImporter":
        this.setState({ showFileImporter: state });
        break;
      default:
        break;
    }
  }

  hideComponent(name) {
    this.toggleComponentVisibility(name, false);
  }

  showComponent(name) {
    this.toggleComponentVisibility(name, true);
  }

  switchComponents(comp_to_hide, comp_to_show) {
    this.showComponent(comp_to_show);
    this.hideComponent(comp_to_hide);
  }

  onLocalLoginClick() {
    requestGoogleDriveLogin().then((result) => { 
      result.json().then(
        (handle_json) => {
          this.setState({ googleDriveHandle: handle_json.handle });
          this.switchComponents('Login', 'FileImporter');
        })
    });
  }

  onLoginClick() {
    requestRemoteGoogleDriveLogin().then((result) => { 
      result.json().then(
        (handle_json) => {
          window.open(handle_json.auth_url);
          this.switchComponents('Login', 'LoginCode');
        })
    });
  }

  onCodeSendClick(receivedCode) {
    this.switchComponents('LoginCode', 'Login');
    attemptLoginAuthentication(receivedCode).then((result) => {
      if (result.status === 201)
      {
        result.json().then(
          (handle_json) => {
            this.setState({ googleDriveHandle: handle_json.handle });
            this.switchComponents('Login', 'FileImporter');
          })
      }
    });
  }

  onCodeCloseClick() {
    this.switchComponents('LoginCode', 'Login');
  }

  getHandle(){
    return this.state.googleDriveHandle;
  }

  onLogoutClick() {
    this.showComponent('Login');
    this.hideComponent('FileImporter');
  }

  render() {
    return (
      <Stack gap={3} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
        {this.state.showLogin && <LoginCard onClick={this.onLoginClick}/>}
        {this.state.showLoginCode && <LoginCode onCodeSendClick={this.onCodeSendClick} onCloseClick={this.onCodeCloseClick}/>}  
        {this.state.showFileImporter && <FileImporter onLogoutClick={this.onLogoutClick} handleProvider={this.getHandle}/>}
      </Stack>
    );
  }
}

function requestGoogleDriveLogin(path, name){
  return fetch('http://127.0.0.1:5000/login_to_google_drive');
}

function requestRemoteGoogleDriveLogin(path, name){
  return fetch('http://lorde.dosgatos:5000/request_login_to_google_drive');
}

function attemptLoginAuthentication(code){
  return fetch('http://lorde.dosgatos:5000/authenticate_login_to_google_drive', {
          method: 'POST',
          body: JSON.stringify({"code":code}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
}

export default App;
