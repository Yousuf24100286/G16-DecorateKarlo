import "./App.css";
import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import{Cart} from "./pages/cart/cart"
import{Home} from "./pages/home/home"
import {HomeContextProvider} from "./context/home-context"
function App() {
  return (
    <div className="App">
      <HomeContextProvider>
      <Router>
      <Navbar />
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/cart"  element = {<Cart/>}/>
          </Routes>
        </Router>
      </HomeContextProvider>
    </div>
  );
}

export default App;
