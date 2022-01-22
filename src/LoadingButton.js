import React from 'react';
import Button from 'react-bootstrap/Button';

export default class LoadingButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading:false };
        this.loadingMessage = props.loadingMessage;
        this.defaultMessage = props.defaultMessage
        this.onClickRequest = props.onClickRequest
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.isLoading) {
            this.onClickRequest().then(() => {
                this.setState(() => ({
                    isLoading: false
                }));
            });
        }
    }

    componentDidUpdate() {
        if (this.state.isLoading) {
            this.onClickRequest().then(() => {
                this.setState(() => ({
                    isLoading: false
                }));
            });
        }
    }

    handleClick(){
        this.setState(() => ({
            isLoading: true
        }));
    }

    render() {
        return (
            <Button onClick={!this.state.isLoading ? this.handleClick : null} {...this.props}>{this.state.isLoading ? this.loadingMessage : this.defaultMessage}</Button>
          );
    }
}