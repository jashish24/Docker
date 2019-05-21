import React, { Component } from 'react';
import { Navbar, Image } from 'react-bootstrap';
import Scrollspy from 'react-scrollspy';

export default class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.baseurl = "http://" + process.env.REACT_APP_DRUPAL_SERVICE;
  }

  handleScroll(event) {
    event.preventDefault();

    const { attributes } = event.currentTarget;
    const element = document.getElementById(attributes.href.value.replace('#', ''));

    window.scrollTo({top: element.offsetTop, behavior: 'smooth'});
  }

  componentDidMount() {
    this.setState({
      about: false,
    });
  }

  render() {
    const { user } = this.props;
    const { user_picture_attributes } = this.props;
    let pic_url = this.baseurl + user_picture_attributes.uri.url;

    return (
      <Navbar fixed="top" variant="dark" bg="primary" id="sideNav">
        <Navbar.Brand onClick={ this.handleScroll.bind(this) } className="js-scroll-trigger" href="#page-top">
          <span className="d-block d-lg-none">
            { user.field_first_name } { user.field_last_name }
          </span>
          <span className="d-none d-lg-block">
            <Image fluid roundedCircle mb="2" className="img-profile mx-auto mb-2" src={ pic_url } alt="" />
          </span>
        </Navbar.Brand>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Scrollspy items={ ['about', 'experience', 'education', 'skills', 'interests', 'awards'] } currentClassName="active" className="navbar-nav">
            <li className="nav-item">
              <a onClick={ this.handleScroll.bind(this) } className="nav-link js-scroll-trigger" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a onClick={ this.handleScroll.bind(this) } className="nav-link js-scroll-trigger" href="#experience">Experience</a>
            </li>
            <li className="nav-item">
              <a onClick={ this.handleScroll.bind(this) } className="nav-link js-scroll-trigger" href="#education">Education</a>
            </li>
            <li className="nav-item">
              <a onClick={ this.handleScroll.bind(this) } className="nav-link js-scroll-trigger" href="#skills">Skills</a>
            </li>
            <li className="nav-item">
              <a onClick={ this.handleScroll.bind(this) } className="nav-link js-scroll-trigger" href="#interests">Interests</a>
            </li>
            <li className="nav-item">
              <a onClick={ this.handleScroll.bind(this) } className="nav-link js-scroll-trigger" href="#awards">Awards</a>
            </li>
          </Scrollspy>
        </div>
      </Navbar>
    );
  }
}
