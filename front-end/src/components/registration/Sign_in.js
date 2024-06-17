import React, { useState, useContext } from 'react';
import './signup.css';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { LoginContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Sign_in = () => {


    const [logdata, setData] = useState({
        email: "",
        password: ""
    });
    // console.log(logdata);
    const history = useNavigate();

    const { account, setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target; // we will get user input name and value from here!
        // console.log(e.target.value);

        setData(() => {
            return {
                ...logdata,
                [name]: value //set name's value add by user
            };
        });
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // console.log(email);
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();
            console.log(data);

            if (res.status == 400 || !data) {
                console.log("invalid data");

                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
                alert("Invalid details")
            } else {
                console.log("data valid");
                setAccount(data);
                setData({ ...logdata, email: "", passeord: "" })
                toast.success("user logged in successfully", {
                    position: "top-center",
                })

                alert("Login Successfully done !")
            }
            history("/")

        } catch (error) {
            console.log("login page ka error" + error.message);

        }
    };



    return (
        <>
            <section>
                <div className="sign_container">
                    <div className="sign_header">
                        <img src="./blacklogoamazon.png" alt="amazonlogo" />
                    </div>
                    <div className="sign_form">
                        <form >
                            <h1>Sign In</h1>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                    onChange={adddata}
                                    value={logdata.email}
                                    name='email' placeholder='Your email' id='email' />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    onChange={adddata}
                                    value={logdata.password}
                                    name='password' placeholder='Atleast 6 characters' id='password' />
                            </div>
                            <button className="signin_btn" onClick={senddata}>Continue</button>
                        </form>
                    </div>
                    <div className="create_accountinfo">
                        <p>Nwe To Amazon ?</p>
                        <NavLink to="/register"><button>Create Your Amazon Account</button></NavLink>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Sign_in
