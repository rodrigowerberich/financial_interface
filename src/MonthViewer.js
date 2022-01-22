import LoadingButton from './LoadingButton.js';
import React from 'react';
import { Card } from 'react-bootstrap';

export class MonthViewerController {
    constructor(month, description) {
        this.month = month;
        this.description = description;
        this.generateDescription = this.generateDescription.bind(this);
    }

    getMonth() {
        return this.month;
    }

    getDescription() {
        return this.description;
    }

    getGenerateDescriptionsButtonDescription() {
        return "Gerar descricoes";
    }

    getGenerateDescriptionsButtonLoadingMessage() {
        return "Importando...";
    }

    generateDescription() {
        console.log(this.month);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }
}

export class MonthViewer extends React.Component{
    constructor(props) {
        super(props);
        this.controller = props.controller;
     }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.controller.getMonth()}</Card.Title>
                    <Card.Text>
                    {this.controller.getDescription()}
                    </Card.Text>
                </Card.Body>
                <LoadingButton variant="primary" 
                    loadingMessage={this.controller.getGenerateDescriptionsButtonLoadingMessage()} 
                    defaultMessage={this.controller.getGenerateDescriptionsButtonDescription()} 
                    onClickRequest={this.controller.generateDescription}/>
            </Card>
        );
      }
}