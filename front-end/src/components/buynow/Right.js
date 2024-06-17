import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';

// import { getProducts } from './../redux/actions/action';


const Right = ({ iteam }) => {

    // console.log(iteam);

    const { products } = useSelector(state => state.getproductsdata);
    // console.log(products);
    const [val, setVal] = useState(false);

    const [price, setPrice] = useState(0);

    const history = useNavigate("");

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let price = 0
        iteam.map((item) => {
            price += item.price.cost
        });
        setPrice(price)
    }

    //payment integration --->stripe payment gateway

    // const makePayment = async () => {
    //     const stripe = await loadStripe(" pk_test_51PA7UzSDjQw0ajaP2vPQ7BGLEXUkfPoig7lH7Q8ikBD3ECDZgRWmJ8ZtOCnzD4EJsp1auoIENMMvnyhEdIycfd7j00VXtXgba9");

    //     const body = {
    //         products: products
    //     }
    //     const headers = {
    //         "Content-Type": "application/json"
    //     }
    //     const response = await fetch("/checkout", {
    //         method: "POST",
    //         headers: headers,
    //         body: JSON.stringify(body)
    //     });

    //     const sessions = await response.json();

    //     const result = stripe.redirectToCheckout({
    //         sessionsId: sessions.id
    //     });

    //     if (result.error) {
    //         console.log(result.error);
    // }
    const buynow = () => {
        alert("Oerder confirmed");
        history("/");
    }




    return (
        <div className="right_buy">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3>Subtotal ({iteam.length} items): <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
                <button className="rightbuy_btn" onClick={buynow} >Proceed to Buy</button>
                <div className="emi" onClick={() => setVal(!val)}>
                    Emi available
                    {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <span className={val ? "show" : "hide"}> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
    )
}

export default Right;