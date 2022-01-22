import { LoadingButton, LoadingButtonController } from './LoadingButton.js';
import React from 'react';
import { Card } from 'react-bootstrap';

export class MonthViewerController {
    constructor(month, description, generateDescriptionHandler) {
        this.month = month;
        this.description = description;
        this.generateDescription = this.generateDescription.bind(this);
        this.loadingButtonController = new LoadingButtonController(
            "Importando...",
            "Gerar descricoes",
            this.generateDescription
        );
        this.disabledStatus = true;
        this.loadingButtonController.disabledStatus = this.disabled;
        this.generateDescriptionHandler = generateDescriptionHandler;
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

    getMonth() {
        return this.month;
    }

    getDescription() {
        return this.disabled?"Desabilitado":this.description;
    }

    generateDescription() {
        return this.generateDescriptionHandler(this.getMonth());
    }
}

export class MonthViewer extends React.Component{
    constructor(props) {
        super(props);
        this.controller = props.controller;
        this.controller.view = this;
        this.state = { 
            textDescription:this.controller.getDescription()
        };
    }

    updateView(){
        this.controller.loadingButtonController.updateView();
        this.setState(()=>({ 
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
                <LoadingButton variant="primary" 
                    controller= {this.controller.loadingButtonController}
                    onClickRequest={this.controller.generateDescription}/>
            </Card>
        );
      }
}