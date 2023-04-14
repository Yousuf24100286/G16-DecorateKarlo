import React from 'react';
import {  ChakraProvider } from '@chakra-ui/react';
import theme from './Theme/theme';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Home/Home.jsx';
import Signup from './SignUp/SignUp.jsx';
import SignIn from './SignIn/SignIn.jsx';
import Account from './Account/Account';
import Cart from './Cart/Cart';

import Admin from './Admin/admin.jsx'
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx' ;

import AllProduct from './Product/AllProduct';
import SingleProduct from './Product/SingleProduct';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: localStorage.jwtToken
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <ChakraProvider theme={theme}>
        <div className="App">
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path='/admin' element={<Admin />} />
              <Route path="product/" element={<AllProduct />} />
              <Route path="product/:id" element={<SingleProduct  />} />
              <Route path='/account' element={<Account />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </ChakraProvider>
    );
  }
}

export default App;
