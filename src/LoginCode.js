import React from 'react';
import { Button, Card, Form, CloseButton } from 'react-bootstrap';

export default class LoginCode extends React.Component {
    constructor(props) {
      super(props);
      this.onCodeSendClick = props.onCodeSendClick;
      this.onCloseClick = props.onCloseClick;
      this.onClick = this.onClick.bind(this);
      this.onCodeChange = this.onCodeChange.bind(this);
      this.value = '';
    }

    onCodeChange(event) {
      this.value = event.target.value;
    }

    onClick() {
      this.onCodeSendClick(this.value);
    }
    
    render() {
      return (
        <Card style={{
          width: '18rem'
      }}>
          <Card.Body >
            <CloseButton style={{position: 'absolute', right: 10}} onClick={this.onCloseClick}/>
            <Card.Title>Google Drive</Card.Title>
            <Card.Text>
              Please, type in the received code for login to be enabled.
            </Card.Text>
            <Form>
            <Form.Group controlId="formCode">
                <Form.Label>Code received:</Form.Label>
                <Form.Control type="text" placeholder="Enter code" onChange={this.onCodeChange}/>
                <Form.Text className="text-muted">
                  Don't share the received code with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" onClick={this.onClick}>Send Code</Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }  
  }