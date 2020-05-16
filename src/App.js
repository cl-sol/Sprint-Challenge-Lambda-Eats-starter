import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Homepage from "./Components/Homepage";
import OrderForm from "./Components/OrderForm";

const App = () => {
  return (
    <Router>
        <nav>
        <h1>Lambda Eats</h1>
        <div className = "navbar">
          <Link to = "/">Home</Link>
          <Link to = "/order">Order</Link>
        </div>
      </nav>
      
      <Route exact path = "/">
        <Homepage />
      </Route>

      <Route exact path = "/order">
        <OrderForm />
      </Route>
    </Router>
  );
};
export default App;
