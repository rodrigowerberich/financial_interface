import { LoadingButton, LoadingButtonController } from './LoadingButton.js';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export class MonthViewerController {
    constructor(month, description, generateDescriptionHandler, openSpreadsheetHandler) {
        this.month = month;
        this.description = description;
        this._openSpreadsheetButtonText = "Abrir planilha";
        this.generateDescription = this.generateDescription.bind(this);
        this.openSpreadsheet = this.openSpreadsheet.bind(this);
        this.loadingButtonController = new LoadingButtonController(
            "Importando...",
            "Gerar descricoes",
            this.generateDescription
        );
        this.disabledStatus = true;
        this.loadingButtonController.disabledStatus = this.disabled;
        this.generateDescriptionHandler = generateDescriptionHandler;
        this.openSpreadsheetHandler = openSpreadsheetHandler;
    }

    get disabled(){
        return this.disabledStatus;
    }

    set disabled(newStatus){
        this.loadingButtonController.disabled = newStatus;
        this.disabledStatus = newStatus;
        this.updateView();        
    }

    updateView(){
        this.view.updateView();
    }

    get view(){
        return this.myView;
    }

    set view(view){
        this.myView = view;
    }

    get openSpreadsheetButtonText(){
        return this._openSpreadsheetButtonText;
    }

    set openSpreadsheetButtonText(newOpenSpreadsheetButtonText){
        this._openSpreadsheetButtonText = newOpenSpreadsheetButtonText;
        this.updateView();
    }

    getMonth() {
        return this.month;
    }

    getDescription() {
        return this.disabled?"Desabilitado":this.description;
    }

    generateDescription() {
        return this.generateDescriptionHandler(this.getMonth());
    }

    openSpreadsheet() {
        console.log("Hello?")
        return this.openSpreadsheetHandler(this.getMonth());
    }
    
}

export class MonthViewer extends React.Component{
    constructor(props) {
        super(props);
        this.controller = props.controller;
        this.controller.view = this;
        this.state = { 
            openSpreadsheetButtonText: this.controller.openSpreadsheetButtonText,
            textDescription:this.controller.getDescription()
        };
    }

    updateView(){
        this.controller.loadingButtonController.updateView();
        this.setState(()=>({ 
            openSpreadsheetButtonText:this.controller.openSpreadsheetButtonText,
            textDescription:this.controller.getDescription()
        }));
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.controller.getMonth()}</Card.Title>
                    <Card.Text>
                    {this.state.textDescription}
                    </Card.Text>
                </Card.Body>
                <Button onClick={this.controller.openSpreadsheet}>{this.state.openSpreadsheetButtonText}</Button>
                <LoadingButton variant="primary" 
                    controller= {this.controller.loadingButtonController}
                    onClickRequest={this.controller.generateDescription}/>
            </Card>
        );
      }
}