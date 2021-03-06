import React from 'react';
import Button from 'react-bootstrap/Button';

export class LoadingButtonController{
    constructor(loadingMessage, defaultMessage, handleClick){
        this.loadingMessage = loadingMessage;
        this.defaultMessage = defaultMessage;
        this.onClickRequest = this.onClickRequest.bind(this);
        this.handleClick = handleClick;
        this.disabledStatus = false;
    }

    updateView(){
        this.view.updateView();
    }

    get disabled(){
        return this.disabledStatus;
    }

    set disabled(newStatus){
        this.disabledStatus = newStatus;
        this.updateView();        
    }

    get view(){
        return this.myView;
    }

    set view(view){
        this.myView = view;
    }

    setLoadingMessage(newLoadingMessage){
        this.loadingMessage = newLoadingMessage;
        this.updateView();
    }

    getLoadingMessage(){
        return this.loadingMessage;
    }

    getDefaultMessage(){
        return this.disabled?"Desabilitado":this.defaultMessage;
    }

    onClickRequest() {
        if (!this.disabled) {
            return this.handleClick();
        }
    }
}

export class LoadingButton extends React.Component {
    constructor(props) {
        super(props);
        this.controller = props.controller;
        this.state = { 
            isLoading:false,
            loadingMessage:this.controller.getLoadingMessage(),
            defaultMessage:this.controller.getDefaultMessage()
        };
        this.controller.view = this;
        this.onClickRequest = this.controller.onClickRequest
        this.handleClick = this.handleClick.bind(this);
    }

    updateView(){
        this.setState(()=>({ 
            loadingMessage:this.controller.getLoadingMessage(),
            defaultMessage:this.controller.getDefaultMessage()
        }));
    }

    async callOnClickRequest(){
        await this.onClickRequest();
        this.setState(() => ({
            isLoading: false
        }));
    }

    handleClick(){
        if (this.onClickRequest !== null){
            this.setState(() => ({
                isLoading: true
            }));
            this.callOnClickRequest();
        }
    }

    render() {
        return (
            <Button onClick={!this.state.isLoading ? this.handleClick : null} {...this.props}>{this.state.isLoading ? this.state.loadingMessage : this.state.defaultMessage}</Button>
          );
    }
}