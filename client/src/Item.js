import React from 'react';
import { Card } from 'react-bootstrap';
import chair from './chair_583020097_1000.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Item() {
  return (
    <div style={{ padding: '3em' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={chair} />
        <Card.Body>
          <Card.Title>Chair - JPY 1000</Card.Title>
          <Card.Text>Great comfort with great design</Card.Text>
          {/* <Button variant="primary">Add to Cart</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Item;
