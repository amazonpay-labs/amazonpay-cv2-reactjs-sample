import React, { useEffect } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import MainPage from './MainPage';
import ReviewPage from './ReviewPage';
import ConfirmPage from "./ConfirmPage";
import Logout from "./Logout";
function App() {

  console.log(window.location?.search);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavLink to="/" activeStyle={{
            fontWeight: "bold",
            color: "darkGray",
            textDecoration: "none"
          }}>
            Furniture <span style={{ color: "purple" }}>Store</span>
          </NavLink>

          <div className="App-right">
            <Logout/>
          </div>
          {/* <p>{isLoading ? "Loading..." : "Buy Now"}</p> */}
        </header>

        <Switch>
          <Route path={`/review/`}>
            <ReviewPage />
          </Route>
          <Route path="/checkoutReturn">
            {/* <Users /> */}
            <ConfirmPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;