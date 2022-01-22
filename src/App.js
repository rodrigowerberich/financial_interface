import './App.css';
import React from 'react';

import LoginCard from './LoginCard';
import FileImporter from './FileImporter';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showLogin: true,
      showFileImporter: false,
      googleDriveHandle: -1
    };
    this.getHandle = this.getHandle.bind(this);
    this.hideComponent = this.hideComponent.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.toggleComponentVisibility = this.toggleComponentVisibility.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  toggleComponentVisibility(name, state) {
    switch (name) {
      case "Login":
        this.setState({ showLogin: state });
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

  onLoginClick() {
    requestGoogleDriveLogin().then((result) => { 
      result.json().then(
        (handle_json) => {
          this.setState({ googleDriveHandle: handle_json.handle });
          this.showComponent('FileImporter');
          this.hideComponent('Login');
        })
    });
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
        {this.state.showFileImporter && <FileImporter onLogoutClick={this.onLogoutClick} handleProvider={this.getHandle}/>}
      </Stack>
    );
  }
}

function requestGoogleDriveLogin(path, name){
  return fetch('http://127.0.0.1:5000/login_to_google_drive');
}

export default App;
