import './App.css';
import React from 'react';

import LoginCard from './LoginCard';
import LoginCode from './LoginCode';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack } from 'react-bootstrap';
import { FileViewer, FileViewerController }from './FileViewer';
import { MonthViewerController } from './MonthViewer';
import { FolderSelectionController } from './FolderSelection';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showLogin: true,
      showLoginCode: false,
      showFileViewer: false,
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
    this.folderUpdateCallback = this.folderUpdateCallback.bind(this);
    this.generateDescription = this.generateDescription.bind(this);
    var folderSelectionController = new FolderSelectionController(
      ["Pessoal/Minhas Planilhas/Vida na Holanda/Financeiro/2021/", 
      "Financeiro/2021/",
      "Pessoal/Minhas Planilhas/Vida na Holanda/Financeiro/2022/", 
      "Financeiro/2022/"],
      this.folderUpdateCallback);
    this.monthViewerControllers = [
      new MonthViewerController("01 - Janeiro", "Informacoes", this.generateDescription), 
      new MonthViewerController("02 - Fevereiro", "Informacoes", this.generateDescription),
      new MonthViewerController("03 - Marco", "Informacoes", this.generateDescription),
      new MonthViewerController("04 - Abril", "Informacoes", this.generateDescription),
      new MonthViewerController("05 - Maio", "Informacoes", this.generateDescription),
      new MonthViewerController("06 - Junho", "Informacoes", this.generateDescription),
      new MonthViewerController("07 - Julho", "Informacoes", this.generateDescription),
      new MonthViewerController("08 - Agosto", "Informacoes", this.generateDescription),
      new MonthViewerController("09 - Setembro", "Informacoes", this.generateDescription),
      new MonthViewerController("10 - Outubro", "Informacoes", this.generateDescription),
      new MonthViewerController("11 - Novembro", "Informacoes", this.generateDescription),
      new MonthViewerController("12 - Dezembro", "Informacoes", this.generateDescription),
  ];
    this.fileViewerController = new FileViewerController(this.monthViewerControllers  , this.onLogoutClick, folderSelectionController);
    this.folder = "Unselected";
  }

  toggleComponentVisibility(name, state) {
    switch (name) {
      case "Login":
        this.setState({ showLogin: state });
        break;
      case "LoginCode":
        this.setState({ showLoginCode: state });
        break;
      case "FileViewer":
        this.setState({ showFileViewer: state });
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
            this.switchComponents('Login', 'FileViewer');
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
    this.switchComponents('FileViewer', 'Login');
  }

  folderUpdateCallback(folder) {
    this.folder = folder;
    if (folder === "Pessoal/Minhas Planilhas/Vida na Holanda/Financeiro/2021/" || folder === "Financeiro/2021/") {
      this.monthViewerControllers.forEach( (element, index, array) => {
        if (index > 8) {
          element.disabled = false;
        }else {
          element.disabled = true;
        }
      } );
    } else {
      this.monthViewerControllers.forEach( (element, index, array) => {
        element.disabled = false;
      } );
    }
  }

  async generateDescription(month) {
    var responseImportAux = await requestAux(this.getHandle(), this.folder);
    var jsonImportAux = await responseImportAux.json();
    var responseImport = await requestImport(this.getHandle(), this.folder, month);
    var jsonImport = await responseImport.json();
    var responseGenerate = await requestGenerateDescription(month, "Conta Conjunta NL");
    var jsonGenerate = await responseGenerate.json();
    var responseExport = await requestExport(this.getHandle(), this.folder, month);
    var jsonExport = await responseExport.json();
  }

  render() {
    return (
      <Stack gap={3} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
        {this.state.showLogin && <LoginCard onClick={this.onLoginClick}/>}
        {this.state.showLoginCode && <LoginCode onCodeSendClick={this.onCodeSendClick} onCloseClick={this.onCodeCloseClick}/>}  
        {this.state.showFileViewer && <FileViewer controller={this.fileViewerController}/>}
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

function serverAddress(){
    return 'lorde.dosgatos:5000';
    // return '127.0.0.1:5000';
} 

function requestImport(handle, path, name){
  return fetch('http://'+serverAddress()+'/import_spreadsheet_from_google_drive_with_auth', {
            method: 'POST',
            body: JSON.stringify({"handle":handle, "path":path+name}),
            headers: {
              'Content-Type': 'application/json'
            }
          });
}

function requestExport(handle, path, name){
    return fetch('http://'+serverAddress()+'/export_spreadsheet_to_google_drive_with_auth', {
            method: 'POST',
            body: JSON.stringify({
                    "handle": handle,
                    "month":name,
                    "export path": path+name
                }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
}

function requestGenerateDescription(month, account){
        return fetch('http://'+serverAddress()+'/update_descriptions', {
            method: 'POST',
            body: JSON.stringify(
            {
                "month": month,
                "account": account
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
}

function requestAux(handle, folder){
  return fetch('http://'+serverAddress()+'/import_spreadsheet_from_google_drive_with_auth', {
          method: 'POST',
          body: JSON.stringify({"handle":handle, "path":folder+"Aux"}),
          headers: {
            'Content-Type': 'application/json'
      }
  });
}

export default App;
