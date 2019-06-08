import React, { Component } from "react";
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Loading from "./Loading";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csrf_token: "",
    };

    document.body.setAttribute('class', 'blogs-detail blogs-landing no-margin');
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

    let blog_id = '';

    if (this.props.match.params.blog_id) {
      blog_id = this.props.match.params.blog_id;
    }

    const api_url = this.baseurl + '/jsonapi/node/blog/' + blog_id;
    await axios.get(api_url, {
      withCredentials: true, // include auth cookie
      headers: {
        'X-CSRF-Token': this.state.csrf_token,
      },
    }).then((response) => {
      this.setState({
        blog: response.data,
      });
    });
  }

  /**
   * Function to format experience datetime
   * @param {string} datetime - Valid datetime string
   */
  convertDateTime(datetime) {
    let timestamp = new Date(datetime).getTime();
    let formatted_date = new Intl.DateTimeFormat('en-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(timestamp);

    return formatted_date;
  }

  render() {
    const { blog } = this.state;

    if (blog) {
      return (
        <div className="negative-margin">
          <header className="masthead">
            <div className="overlay"></div>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="site-heading">
                    <h1 className="color-white">Loved Writeups!</h1>
                    <span className="subheading">{ blog.data.attributes.field_tagline }</span>
                  </div>
                </div>
              </Row>
            </Container>
          </header>
          <Container>
            <Row>
              <div className="col-lg-8 col-md-10 mx-auto">
              </div>
            </Row>
          </Container>
        </div>
      );
    }

    return (
      <Loading />
    );
  }
}
