import React from 'react';


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
