import React, { Component } from 'react';
import axios from 'axios';
//import logo from '../logo.svg';
/*import Footer from "./Footer";
import Header from "./Header";*/
import UserHeader from "./UserHeader";
import UserDetails from "./UserDetails";
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/fontawesome/css/all.min.css';
import '../assets/css/resume.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Welcome",
      csrf_token: "",
    };
    this.baseurl = "http://" + process.env.REACT_APP_DRUPAL_SERVICE;
  }

  async componentDidMount() {
    const token_url = this.baseurl + '/rest/session/token';
    // first request is to fetch csrf token
    await axios.get(token_url, {
      withCredentials: true // required to send auth cookie
    }).then(async(response) => {
      this.setState({
        csrf_token: response.data,
      });
    });

    const api_url = this.baseurl + '/jsonapi/user/user/4e4a3423-b54b-4f9b-9302-86bf36670234';
    await axios.get(api_url, {
      withCredentials: true, // include auth cookie
      headers: {
        'X-CSRF-Token': this.state.csrf_token,
      },
    }).then((response) => {
      this.setState({
        user: response.data,
      });
    });

    const user_pic_url = this.state.user.data.relationships.user_picture.links.related.href;
    await axios.get(user_pic_url, {
      withCredentials: true, // include auth cookie
      headers: {
        'X-CSRF-Token': this.state.csrf_token,
      },
    }).then((response) => {
      this.setState({
        user_picture: response.data,
      });
    });
  }

  render() {
    setTimeout(() => {
      this.setState({title: "Welcome Ashish!"})
    }, 2000);
    if (this.state.user && this.state.user_picture) {
      const { attributes } = this.state.user_picture.data;
      return (
        <div>
          <UserHeader token={ this.state.csrf_token } user={ this.state.user.data } user_picture_attributes={ attributes } />
          <UserDetails token={ this.state.csrf_token } user={ this.state.user.data } />
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

export default App;
