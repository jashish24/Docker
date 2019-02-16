import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.baseurl = "http://" + process.env.REACT_APP_DRUPAL_SERVICE;
    this.state = {
      field_education_summary: '',
      field_experience_summary: '',
      field_skills: '',
      field_social_links: '',
      field_social_icons: {},
    };
  }

  /**
   * Function to make ajax call for relationships
   * @param {string} url - Valid replation url
   * @param {string} key - State key which will hold the return value
   */
  getRelatedDetails(url, key) {
    axios.get(url, {
      withCredentials: true, // include auth cookie
      headers: {
        'X-CSRF-Token': this.props.csrf_token,
      },
    }).then((response) => {
      this.setState({
        [key]: response.data,
      });

      if (key === 'field_social_links') {
        let csrf_token = this.props.csrf_token;
        let field_social_icons = this.state.field_social_icons;
        this.state.field_social_links.data.forEach(function(value, index) {
          let social_link_url = value.relationships.field_social_icon.links.related.href;
          axios.get(social_link_url, {
            withCredentials: true, // include auth cookie
            headers: {
              'X-CSRF-Token': csrf_token,
            },
          }).then((response) => {
            field_social_icons[index] = response.data.data.attributes.field_class_name;
          });
        });

        this.setState({field_social_icons: field_social_icons});
      }

    });
  }

  async componentDidMount() {
    const { relationships } = this.props.user;
    this.getRelatedDetails(relationships.field_education_summary.links.related.href, 'field_education_summary');
    this.getRelatedDetails(relationships.field_experience_summary.links.related.href, 'field_experience_summary');
    this.getRelatedDetails(relationships.field_skills.links.related.href, 'field_skills');
    this.getRelatedDetails(relationships.field_social_links.links.related.href, 'field_social_links');
  }

  render() {
    const { user } = this.props;
    const { attributes } = user;
    const { field_social_icons } = this.state;
    let social_links = '';

    if (this.state.field_social_links.data) {
      social_links = this.state.field_social_links.data.map((value, index) =>
        <a rel="noopener noreferrer" target="_blank" key={ index } href={ value.attributes.field_link.uri }><i className={"fab " + field_social_icons[index] }></i></a>
      );
    }

    return (
      <Container fluid className="p-0">
        <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
          <div className="w-100">
            <h1 className="mb-0">{ attributes.field_first_name } <span className="text-primary">{ attributes.field_last_name }</span>
            </h1>
            <div className="subheading mb-5">{ attributes.field_address } · <a href="mailto:{ attributes.mail }">{ attributes.mail }</a>
            </div>
            <p className="lead mb-5">{ attributes.field_about }</p>
            <div className="social-icons">{ social_links }</div>
          </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="experience">
          <div className="w-100">
            <h2 className="mb-5">Experience</h2>
          </div>
        </section>
      </Container>
    );
  }
}
