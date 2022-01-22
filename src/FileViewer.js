import { FolderSelection } from './FolderSelection.js';
import {MonthViewer} from './MonthViewer.js';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


export class FileViewerController {
    constructor(monthControllers, logoutHandler, folderSelectionController) {
        this.monthControllers = monthControllers;
        this.logoutHandler = logoutHandler;
        this.onLogoutButtonClick = this.onLogoutButtonClick.bind(this);
        this.folderSelectionController = folderSelectionController;
    }

    getJanuaryController(){
        return this.monthControllers[0];
    }
    getFebruaryController(){
        return this.monthControllers[1];
    }
    getMarchController(){
        return this.monthControllers[2];
    }
    getAprilController(){
        return this.monthControllers[3];
    }
    getMayController(){
        return this.monthControllers[4];
    }
    getJuneController(){
        return this.monthControllers[5];
    }
    getJulyController(){
        return this.monthControllers[6];
    }
    getAugustController(){
        return this.monthControllers[7];
    }
    getSeptemberController(){
        return this.monthControllers[8];
    }
    getOctoberController(){
        return this.monthControllers[9];
    }
    getNovemberController(){
        return this.monthControllers[10];
    }
    getDecemberController(){
        return this.monthControllers[11];
    }
    getLogoutButtonText(){
        return "Log out";
    }

    onLogoutButtonClick(){
        this.logoutHandler();
    }

    getFolderSelectionController() {
        return this.folderSelectionController;
    }

}

export class FileViewer extends React.Component {
    constructor(props) {
        super(props); 
        this.controller = props.controller;
    }

    render() {
      return (
        <Container>
        <Row>
            <Col className="text-center">
                <FolderSelection controller={this.controller.getFolderSelectionController()} />
            </Col>
        </Row>
        <Row xs={1} sm={2} md={3} lg={6}>
            <Col ><MonthViewer controller={this.controller.getJanuaryController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getFebruaryController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getMarchController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getAprilController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getMayController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getJuneController()}/></Col>
        </Row>
        <Row xs={1} sm={2} md={3} lg={6}>
            <Col ><MonthViewer controller={this.controller.getJulyController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getAugustController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getSeptemberController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getOctoberController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getNovemberController()}/></Col>
            <Col ><MonthViewer controller={this.controller.getDecemberController()}/></Col>
        </Row>
        <Row>
            <Col className="text-center"><Button onClick={this.controller.onLogoutButtonClick}>{this.controller.getLogoutButtonText()}</Button></Col>
        </Row>
    </Container>
      );
    }  
}