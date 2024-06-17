import React, { useContext, useEffect, useState } from 'react'
import './navbaar.css';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import Rightheader from './Rightheader';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';




const Navbaar = () => {

    const { account, setAccount } = useContext(LoginContext);
    // console.log(account);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //for search bar
    const [text, setText] = useState("");
    console.log(text);
    const [liopen, setLiopen] = useState(true);

    const { products } = useSelector(state => state.getproductsdata);


    const [dropen, setDropen] = useState(false)

    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (res.status !== 201) {
            console.log("first login");
            alert("Login first");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data);
        }
    };
    //for drawer

    const handleopen = () => {
        setDropen(true);
    }
    const handledrclose = () => {
        setDropen(false);
    };

    //for logout
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (res2.status !== 201) {
            console.log("error");
            const error = new Error(res2.error);
            throw error;
        } else {
            console.log("data valid");
            alert("User logged out successfully");
            toast.success("user logged out", {
                position: "top-center",
            })
            setAccount(false);
            // setOpen(false)

            history("/");
        }
    };

    const getText = (items) => {
        setText(items);
        setLiopen(false);
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);


    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburgur' onClick={handleopen} >
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handledrclose}>
                        <Rightheader logclose={handledrclose} />

                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"><img src="./amazon_PNG25.png" alt="" /></NavLink>
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name=""
                            placeholder="Search products"
                            onChange={(e) => getText(e.target.value)}
                            id='' />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>
                        {/* search filter */}
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }


                    </div>

                </div>

                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login" ><span>Hello, Sign In</span></NavLink>
                        {/* <NavLink to="/login" >Returns & Orders</NavLink> */}
                    </div>
                    <div className="cart_btn">
                        {/* if user is not login redirect to login page */}
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account.carts.length} color="secondary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink> : <NavLink to="/login">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink>}
                        <p style={{ color: "white" }}>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar' style={{ background: "orange" }}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> : <Avatar className='avtar'
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}></Avatar>
                    }


                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <NavLink to="/"><MenuItem onClick={handleClose}>My account</MenuItem></NavLink>
                        {
                            account ? <MenuItem onClick={handleClose} onClick={logoutuser}><LogoutIcon style={{ fontSize: "16", marginRight: "3" }} />Logout</MenuItem> : ""
                        }

                    </Menu>
                    <ToastContainer />







                </div>
            </nav>
        </header>
    )
}

export default Navbaar;
