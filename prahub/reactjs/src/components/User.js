import React, { Component } from 'react';
import axios from 'axios';
import UserHeader from "./UserHeader";
import UserDetails from "./UserDetails";
import Loading from "./Loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csrf_token: "",
      user_picture: "",
      user: {},
    };

    document.body.setAttribute('class', 'resume');
    this.baseurl = "http://" + process.env.REACT_APP_DRUPAL_SERVICE;
  }

  async componentWillMount() {
    const token_url = this.baseurl + '/rest/session/token';
    // first request is to fetch csrf token
    await axios.get(token_url, {
      withCredentials: true // required to send auth cookie
    }).then(async(response) => {
      this.setState({
        csrf_token: response.data,
      });
    });

    let uid = '4e4a3423-b54b-4f9b-9302-86bf36670234';

    if (this.props.match.params.id) {
      uid = this.props.match.params.id;
    }

    const api_url = this.baseurl + '/jsonapi/user/user/' + uid;
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
    const { user } = this.state;
    const { user_picture } = this.state;
    const { csrf_token } = this.state;

    if (user && user_picture) {
      const { attributes } = this.state.user_picture.data;
      return (
        <div>
          <UserHeader token={ csrf_token } user={ user.data } user_picture_attributes={ attributes } />
          <UserDetails token={ csrf_token } user={ user.data } />
        </div>
      );
    }
    return (
      <Loading />
    );
  }
}

export default Home;
