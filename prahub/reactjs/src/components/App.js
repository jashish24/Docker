import React, { Component } from "react";
import { Switch, Route, NavLink, HashRouter } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import Home from "./Home";
import User from "./User";
import Blogs from "./Blogs";
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/fontawesome/css/all.min.css';
import '../assets/css/resume.css';
import '../assets/css/clean-blog.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar bg="light" expand="lg" className="fixed-top" id="mainNav">
            <Navbar.Brand href="/">Mub N' Hub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbarResponsive">
              <Nav>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"><NavLink exact replace className="nav-link" title="Home" to="/">Home</NavLink></li>
                  <li className="nav-item"><NavLink exact replace className="nav-link" title="Blogs" to="/blogs">Blogs</NavLink></li>
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="content">
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/blogs" component={ Blogs } />
              <Route exact path="/users/:id" component={ User } />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
