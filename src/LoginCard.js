import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default class LoginCard extends React.Component {
    constructor(props) {
      super(props);
      this.onClick = props.onClick;
    }
    
    render() {
      return (
        <Card style={{
          width: '18rem'
      }}>
          <Card.Body>
            <Card.Title>Google Drive Login</Card.Title>
            <Card.Text>
              Please, login to your google drive.
            </Card.Text>
            <Button variant="primary" onClick={this.onClick}>Login</Button>
          </Card.Body>
        </Card>
      );
    }  
  }