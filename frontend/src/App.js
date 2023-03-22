import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Switch, link } from 'react-router-dom';
import registration from './components/registration';
import login from './components/login';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/registration">Registration</Link>
          <Link to="/login">Login</Link>
        </div>
        <Switch>
          <Route path="/registration" component={registration} />
          <Route path="/login" component={login} />
        </Switch>
      </Router>
    </div>

  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api')
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {data ? data.message : 'Loading...'}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
