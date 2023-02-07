import { React, useEffect } from 'react';

import './App.css';
import { useState } from 'react';
import Item from './Item';
import { useScript } from './PayButtonUtils';
import APICard from './APICard';

function MainPage() {
  const scriptStaus = useScript(
    'https://static-fe.payments-amazon.com/checkout.js'
  );
  const [apiResponse, setApiResponse] = useState('');
  useEffect(() => {
    fetch('/buttonSignature')
      .then((res) => res.json())
      .then((res) => {
        if (scriptStaus === 'ready') {
          RenderPayButton(res.signature, res.payloadJSON);
          let createCheckoutSessionConfig = {
            payloadJSON: res.payloadJSON,
            signature: res.signature,
          };
          console.log(
            'CreatCheckoutConfig:',
            JSON.stringify(createCheckoutSessionConfig)
          );
        }

        setApiResponse(JSON.stringify(res, null, 3));
      });
  }, [scriptStaus]);

  const RenderPayButton = (signature, payloadJSON) => {
    window.amazon.Pay.renderButton('#AmazonPayButton', {
      // set checkout environment
      merchantId: process.env.REACT_APP_MERCHANT_ID,
      publicKeyId: process.env.REACT_APP_PUBLIC_KEY_ID,
      ledgerCurrency: 'JPY',
      // customize the buyer experience
      checkoutLanguage: 'ja_JP',
      productType: 'PayAndShip',
      placement: 'Cart',
      buttonColor: 'Gold',
      sandbox: true,
      // configure Create Checkout Session request
      createCheckoutSessionConfig: {
        payloadJSON, // string generated in step 2
        signature, // signature generated in step 3
      },
    });
  };

  return (
    <div className="App">
      <body className="App-body">
        <Item />
        <div style={{ padding: '3rem', justifyContent: 'center' }}>
          <div
            id="AmazonPayButton"
            style={{ position: 'relative', top: '50%' }}
          ></div>
        </div>
        <APICard text={apiResponse} />
      </body>
    </div>
  );
}

export default MainPage;
