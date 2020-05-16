import React from "react";
// import Pizza from "../../Assets/Pizza.jpg"
import {Link} from "react-router-dom";

const Homepage = () => {
    return (
        <div>
            <h1>Go On, Order That Pizza. You Deserve It</h1>
            {/* <img src = {Pizza} alt = "homepage img" className = "PizzaImg" /> */}
            <Link to = "/order" className = "OrderButton">Place Your Order</Link>
        </div>
    )
}

export default Homepage;