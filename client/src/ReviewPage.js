import { React, useEffect } from "react";

import "./App.css";
import { useState } from "react";
import Item from './Item';
import { Card, Button} from "react-bootstrap";
import {useScript} from "./PayButtonUtils";
import APICard from './APICard';

function ReviewPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState("");
  const search = window.location?.search;
  const params = new URLSearchParams(search);
  const checkoutSessionId = params.get('amazonCheckoutSessionId');
  console.log(checkoutSessionId);
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const scriptState = useScript("https://static-na.payments-amazon.com/checkout.js");
  useEffect(() => {
    console.log("/getCheckoutSession"+ new URLSearchParams({CheckoutSessionId: checkoutSessionId}).toString());
    fetch("/getCheckoutSession?" + new URLSearchParams({
      CheckoutSessionId: checkoutSessionId,
  }).toString())
      .then((res) => res.json())
      .then((res) => {
        console.log("result", res.shippingAddress);
        // setAddress(res.shippingAddress);
        // setPaymentMethod(res.paymentDetails);
        if(scriptState === "ready"){
          changeAddressButton(checkoutSessionId);
        changePaymentButton(checkoutSessionId);
        console.log(res);
        setApiResponse(JSON.stringify(res, null, 3));
        setIsLoading(false);
        setAddress(res.shippingAddress);
        setPaymentMethod(res.paymentPreferences[0].paymentDescriptor);
        console.log("getCheckoutSession complete");
        }
        
      })
  }, [scriptState]);

  const updateCheckout =() => {
    console.log("button pressed");
    fetch("/updateCheckoutSession?" + new URLSearchParams({checkoutSessionId}), {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
    .then((res) =>res.json())
    .then((res) => {
      console.log(res);
      window.location.href = res.webCheckoutDetails.amazonPayRedirectUrl;
    })
    .catch((err) => {
      console.error(err);
    })
  }

  // if (typeof window != "undefined") { // needed if SSR
  //   window.gapiInit = () => {
  //     console.log({ gapiInit: true })

  // }
  //}
  // set state, what ever you need

  const changeAddressButton = (CheckoutSessionId) => {
    console.log("ChxId", CheckoutSessionId);
    window.amazon.Pay.bindChangeAction(
      '#changeButton1',
      {
        amazonCheckoutSessionId: CheckoutSessionId,
        changeAction: 'changeAddress'

      });
  }

  const changePaymentButton = (CheckoutSessionId) => {
    console.log("ChxId", CheckoutSessionId);
    window.amazon.Pay.bindChangeAction(
      '#changeButton2',
      {
        amazonCheckoutSessionId: CheckoutSessionId,
        changeAction: 'changePayment'

      });
  }

  return (
    <div className="App">


      <body className="App-body">
        <Item />
        <div style={{ padding: "3em" }}>
          <Card>
            <Card.Body>
                    <Card.Title>Shipping Address</Card.Title>
                    <Card.Text>
                        {isLoading?<div><p>loading...</p></div>:
                        <div>
                          {(address)?
                          Object.keys(address).map(key => {
                          return(
                            <div>{address[key]}</div>
                            )
                            
                      }):"No address available"}
                        </div>}
                    </Card.Text>
                    <div id="changeButton1">

                      <Button variant="secondary">Change Address</Button>
                    </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
                    <Card.Title>Payment Method</Card.Title>
                    <Card.Text>
                        {isLoading?<div><p>loading...</p></div>:
                        <div>
                          {JSON.stringify(paymentMethod)}
                          <br/>
                         
                        </div>}
                    </Card.Text>
                    <div id="changeButton2">

                      <Button variant="secondary">Change Payment Method</Button>
                    </div>
            </Card.Body>
          </Card>
          {/* <p>{JSON.stringify(address)}</p> */}
          
          {/* <p>{isLoading?"loading...":JSON.stringify(paymentMethod)}</p>
          <div id="changeButton2">Change Payment Method</div> */}
          <Card>
            <Card.Body>
              <Button style={{ backgroundColor:"purple", align:"center" }} onClick={updateCheckout}>Confirm Checkout</Button>
            </Card.Body>
          </Card>
          <div style={{ justifyContent:"center", padding:"1em"}}>

          </div>
        </div>
        <APICard text={apiResponse} />
      </body>



    </div>
  );
}

export default ReviewPage;