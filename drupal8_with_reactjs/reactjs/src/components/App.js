import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Footer from "./Footer";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }
  render() {
    setTimeout(() => {
      this.setState({title: "Welcome Ashish!"})
    }, 2000)
    return (
      <div>
        <Header title={this.state.title} />
        <Header title={"Other Title"} />
        <Footer />
      </div>
    );
  }
}

export default App;
