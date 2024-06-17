import React, { useEffect, useState } from 'react';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignUP from './components/registration/SignUP';
import Sign_in from './components/registration/Sign_in';
import { Routes, Route } from 'react-router-dom';
//import Cart from './components/cart/Cart';

import Buynow from './components/buynow/Buynow';
import Cart1 from './components/cart/Cart';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';

const App = () => {

  const [data, setData] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setData(true);

    }, 2000)
  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            <Routes>
              <Route path="/" element={<Maincomp />} />
              <Route path="/login" element={<Sign_in />} />
              <Route path="/register" element={<SignUP />} />
              <Route path="/getproductsone/:id" element={<Cart1 />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>

            <Footer />
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )
      }

    </>
  )
}

export default App
