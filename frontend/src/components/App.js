import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Home/Home.jsx';
import Signup from './SignUp/SignUp.jsx';
import SignIn from './SignIn/SignIn.jsx';

import Header from './Header/Header.jsx';

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
    const { data } = this.state;
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
