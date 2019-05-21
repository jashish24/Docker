import React, { Component } from "react";
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Loading from "./Loading";

export default class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csrf_token: "",
      blog_authors: {},
    };

    document.body.setAttribute('class', 'blogs-landing no-margin');
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

    const api_url = this.baseurl + '/jsonapi/node/blog?page[limit]=5&sort=-created&filter[uid-filter][condition][path]=uid.uid&filter[uid-filter][condition][operator]=%3E&filter[uid-filter][condition][value]=1';
    await axios.get(api_url, {
      withCredentials: true, // include auth cookie
      headers: {
        'X-CSRF-Token': this.state.csrf_token,
      },
    }).then((response) => {
      this.setState({
        blogs: response.data,
      });
      let bthis = this;

      response.data.data.forEach(function(value, index) {
        let csrf_token = bthis.state.csrf_token;
        let blog_author_link = value.relationships.revision_uid.links.related.href;
        axios.get(blog_author_link, {
          withCredentials: true, // include auth cookie
          headers: {
            'X-CSRF-Token': csrf_token,
          },
        }).then((response) => {
          let temp_blog_authors = bthis.state.blog_authors;
          temp_blog_authors[index] = response.data.data.attributes.field_first_name + " " + response.data.data.attributes.field_last_name;
          bthis.setState({
            blog_authors: temp_blog_authors
          });
        });
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

  nextPrevBlogs(event) {
    const { attributes } = event.currentTarget;
    let api_url = attributes.rel.value;
    axios.get(api_url, {
      withCredentials: true, // include auth cookie
      headers: {
        'X-CSRF-Token': this.state.csrf_token,
      },
    }).then((response) => {
      this.setState({
        blogs: response.data,
      });
      let bthis = this;

      response.data.data.forEach(function(value, index) {
        let csrf_token = bthis.state.csrf_token;
        let blog_author_link = value.relationships.uid.links.related.href;
        axios.get(blog_author_link, {
          withCredentials: true, // include auth cookie
          headers: {
            'X-CSRF-Token': csrf_token,
          },
        }).then((response) => {
          let temp_blog_authors = bthis.state.blog_authors;
          temp_blog_authors[index] = '';
          if (response.data.data.attributes.field_first_name) {
            temp_blog_authors[index] = response.data.data.attributes.field_first_name;
          }

          if (response.data.data.attributes.field_last_name) {
            temp_blog_authors[index] += ' ' + response.data.data.attributes.field_last_name;
          }

          if (temp_blog_authors[index] === '') {
            temp_blog_authors[index] = 'Anonymous';
          }

          bthis.setState({
            blog_authors: temp_blog_authors
          });
        });
      });
    });
  }

  getnextbutton() {
    const { links } = this.state.blogs;

    if (links.next) {
      return <div className="clearfix"><button rel={ links.next.href } onClick={ this.nextPrevBlogs.bind(this) } className="btn btn-primary float-right">Older Posts &rarr;</button></div>;
    }

    return '';
  }

  getprevbutton() {
    const { links } = this.state.blogs;

    if (links.prev) {
      return <div><button rel={ links.prev.href } onClick={ this.nextPrevBlogs.bind(this) } className="btn btn-primary float-left">&larr; Newer Posts</button></div>;
    }

    return '';
  }

  render() {
    const { blogs } = this.state;
    const { blog_authors } = this.state;

    if (blogs && blog_authors) {
      this.getnextbutton();
      return (
        <div className="negative-margin">
          <header className="masthead">
            <div className="overlay"></div>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="site-heading">
                    <h1 className="color-white">Loved Writeups!</h1>
                    <span className="subheading">Let's Share Some Thoughts Here</span>
                  </div>
                </div>
              </Row>
            </Container>
          </header>
          <Container>
            <Row>
              <div className="col-lg-8 col-md-10 mx-auto">
                { blogs.data.map((value, index) =>
                  <React.Fragment key={index}>
                    <div className="post-preview">
                      <a href={ "/#/blogs/" + value.id }>
                        <h2 className="post-title">{ value.attributes.title }</h2>
                        <h3 className="post-subtitle">{ value.attributes.field_tagline.substring(0, 50) }</h3>
                      </a>
                      <p className="post-meta">Posted by <a title={ blog_authors[index] } href={ "/#/users/" + value.relationships.uid.data.id }>{ blog_authors[index] }</a> on { this.convertDateTime(value.attributes.created) }</p>
                    </div>
                    <hr />
                  </React.Fragment>
                )}
                { this.getprevbutton() }
                { this.getnextbutton() }
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
