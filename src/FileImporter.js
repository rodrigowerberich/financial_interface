// import LoadingButton from './LoadingButton.js';
// import React from 'react';
// import { Card, Stack, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';


// export default class FileImporter extends React.Component {
//     constructor(props) {
//         super(props); 
//         this.state = { 
//             selected_folder:"Unselected",
//             categoryUpdaterDisabled:true 
//         };
//         this.onLogoutClick = props.onLogoutClick;
//         this.handleProvider = props.handleProvider;
//         this.setSelectedFolder = this.setSelectedFolder.bind(this);
//         this.requestImport = this.requestImport.bind(this);
//         this.requestExport = this.requestExport.bind(this);
//         this.requestAux = this.requestAux.bind(this);
//         this.getDisabled = this.getDisabled.bind(this);
//     }
    
//     setSelectedFolder(folder) {
//         this.setState({ 
//             selected_folder: folder,
//             categoryUpdaterDisabled:false 
//         });
//     }

//     getDisabled(){
//         return this.state.categoryUpdaterDisabled;
//     }

//     requestImport(name) {
//         return requestImport(this.handleProvider(), this.state.selected_folder, name);
//     }

//     requestExport(name) {
//         return requestExport(this.handleProvider(), this.state.selected_folder, name);
//     }

//     requestAux(){
//         return !this.getDisabled() ? requestAux(this.handleProvider()): null;
//     }

//     render() {
//       return (
//         <Stack  style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'}}>
//             <FolderSelection updateFolderCallback={this.setSelectedFolder}/>
//             <CategoryUpdater disabled={this.getDisabled} onRequestImport={this.requestImport} onRequestExport={this.requestExport}/>
//             <LoadingButton variant="primary"  loadingMessage="Importanto planilha auxiliar..." defaultMessage="Importar Aux" onClickRequest={this.requestAux}/>
//             <Button variant="primary" onClick={this.onLogoutClick}>Logout</Button>
//         </Stack>
//       );
//     }  
// }

// class CategoryUpdater extends React.Component{
//     constructor(props) {
//         super(props);
//         this.onRequestImportParent = props.onRequestImport;
//         this.onRequestExportParent = props.onRequestExport;
//         this.disabled = props.disabled;
//         this.onRequestImport = this.onRequestImport.bind(this);
//         this.onRequestExport = this.onRequestExport.bind(this);
//         this.onRequestGenerateDescription = this.onRequestGenerateDescription.bind(this);
//         this.setDisplayText = this.setDisplayText.bind(this);
//         this.generateDropdownItem = this.generateDropdownItem.bind(this);
//         this.dropdownOptions = [
//             // '01 - Janeiro', 
//             // '02 - Fevereiro', 
//             // '03 - Marco', 
//             // '04 - Abril', 
//             // '05 - Maio', 
//             // '06 - Junho', 
//             // '07 - Julho', 
//             // '08 - Agosto', 
//             // '09 - Setembro', 
//             '10 - Outubro', 
//             '11 - Novembro', 
//             '12 - Dezembro'];
//         this.state = { displayText:this.dropdownOptions[0] };
//     }

//     setDisplayText(newText){
//         this.setState({ displayText: newText });
//     }

//     generateDropdownItem(month) {
//         return <Dropdown.Item onClick={()=>this.setDisplayText(month)}>{month}</Dropdown.Item>;
//     }

//     onRequestImport(){
//         return !this.disabled() ? this.onRequestImportParent(this.state.displayText): null;
//     }

//     onRequestExport(){
//         return !this.disabled() ? this.onRequestExportParent(this.state.displayText) : null;
//     }

//     onRequestGenerateDescription(){
//         return !this.disabled() ?  requestGenerateDescription(this.state.displayText, "Conta Conjunta NL") : null; 
//     }

//     render() {
//         return (
//             <Card style={{ width: '28em' }}>
//                 <Card.Body>
//                     <Card.Title>Atualizar descricao da conta conjunta NL</Card.Title>
//                     <Card.Text>
//                     Selecione o mes, e depois decida o que fazer com ele!
//                     </Card.Text>
//                     <Stack direction="horizontal" style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'}}>
//                         <h3>Mês:</h3>
//                         <DropdownButton id="dropdown-basic-button" title={this.state.displayText}>
//                             {this.dropdownOptions.map(this.generateDropdownItem)}
//                         </DropdownButton>                   
//                     </Stack>
//                     <ButtonGroup style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'}}>
//                         <LoadingButton variant="primary" loadingMessage="Importando..." defaultMessage="Importar" onClickRequest={this.onRequestImport}/>
//                         <LoadingButton variant="primary" loadingMessage="Exportando..." defaultMessage="Exportar"onClickRequest={this.onRequestExport}/>
//                         <LoadingButton variant="primary" loadingMessage="Gerando descricoes..." defaultMessage="Gerar descricoes" onClickRequest={this.onRequestGenerateDescription}/>
//                     </ButtonGroup>
//                 </Card.Body>
//             </Card>
//         );
//       }
// }

// class FolderSelection extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = { displayText:"Unselected" };
//         this.updateFolderCallback=props.updateFolderCallback
//         this.setDisplayText = this.setDisplayText.bind(this);
//         this.generateDropdownItem = this.generateDropdownItem.bind(this);
//         this.dropdownOptions = ["Pessoal/Minhas Planilhas/Vida na Holanda/Financeiro/2021/", "Financeiro/2021/"];
//     }

//     setDisplayText(newText){
//         this.setState({ displayText: newText });
//         this.updateFolderCallback(newText);
//     }

//     generateDropdownItem(dropdownText) {
//         return <Dropdown.Item onClick={()=>this.setDisplayText(dropdownText)}>{dropdownText}</Dropdown.Item>;
//     }

//     render() {
//         return (
//             <Stack direction="horizontal" style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'}}>
//                 <h3>Folder: </h3>
//                 <DropdownButton id="dropdown-basic-button" title={this.state.displayText}>
//                     {this.dropdownOptions.map(this.generateDropdownItem)}
//                 </DropdownButton>
//             </Stack>
//         );
//       }  
// } 
    
// function serverAddress(){
//     return 'lorde.dosgatos:5000';
//     // return '127.0.0.1:5000';
// } 

//   function requestAux(handle){
//     return fetch('http://'+serverAddress()+'/import_spreadsheet_from_google_drive_with_auth', {
//             method: 'POST',
//             body: JSON.stringify({"handle":handle, "path":"Pessoal/Minhas Planilhas/Vida na Holanda/Financeiro/2021/Aux"}),
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
// }

// function requestImport(handle, path, name){
//     return fetch('http://'+serverAddress()+'/import_spreadsheet_from_google_drive_with_auth', {
//             method: 'POST',
//             body: JSON.stringify({"handle":handle, "path":path+name}),
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
// }

// function requestExport(handle, path, name){
//     return fetch('http://'+serverAddress()+'/export_spreadsheet_to_google_drive_with_auth', {
//             method: 'POST',
//             body: JSON.stringify({
//                     "handle": handle,
//                     "month":name,
//                     "export path": path+name
//                 }),
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
// }

// function requestGenerateDescription(month, account){
//         return fetch('http://'+serverAddress()+'/update_descriptions', {
//             method: 'POST',
//             body: JSON.stringify(
//             {
//                 "month": month,
//                 "account": account
//             }),
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
// }