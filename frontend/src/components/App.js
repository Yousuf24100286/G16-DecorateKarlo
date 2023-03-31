import React from 'react';
import {  ChakraProvider } from '@chakra-ui/react';
import theme from './Theme/theme';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Home/Home.jsx';
import Signup from './SignUp/SignUp.jsx';
import SignIn from './SignIn/SignIn.jsx';

import Admin from './Admin/admin.jsx'
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx' ;

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
            </Routes>
          </Router>
        </div>
        <Footer />
      </ChakraProvider>
    );
  }
}

export default App;
