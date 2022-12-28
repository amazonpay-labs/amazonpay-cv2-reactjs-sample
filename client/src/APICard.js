import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function APICard(props) {

    return (
        <div style={{ padding: '3em' }}>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>API Resoponse</Card.Title>
                    <Card.Text>
                        <pre>
                            {props.text}
                        </pre>
                    </Card.Text>
                    {/* <Button variant="primary">Add to Cart</Button> */}
                </Card.Body>
            </Card>
        </div>
    );

}

export default APICard;