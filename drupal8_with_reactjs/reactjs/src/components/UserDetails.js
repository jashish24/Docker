import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Intro from './userdetails/Intro.js';
import Experience from './userdetails/Experience.js';
import Education from './userdetails/Education.js';
import Skills from './userdetails/Skills.js';
import Interests from './userdetails/Interests.js';
import Awards from './userdetails/Awards.js';

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
      let pthis = this;

      if (key === 'field_social_links') {
        let csrf_token = this.props.csrf_token;
        response.data.data.forEach(function(value, index) {
          let social_link_url = value.relationships.field_social_icon.links.related.href;
          axios.get(social_link_url, {
            withCredentials: true, // include auth cookie
            headers: {
              'X-CSRF-Token': csrf_token,
            },
          }).then((response) => {
            let temp_social_links = pthis.state.field_social_icons;
            temp_social_links[index] = response.data.data.attributes.field_class_name;
            pthis.setState({
              field_social_icons: temp_social_links
            });
          });
        });
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
    const { field_experience_summary } = this.state;
    const { field_education_summary } = this.state;
    const { field_skills } = this.state;

    let social_links = '';

    if (this.state.field_social_links.data) {
      social_links = this.state.field_social_links.data.map((value, index) =>
        <a rel="noopener noreferrer" target="_blank" key={ index } href={ value.attributes.field_link.uri }><i className={"fab " + field_social_icons[index] }></i></a>
      );
    }

    return (
      <Container fluid className="p-0">
        <Intro user_intro={ attributes } social_links={ social_links } />
        <hr className="m-0" />
        <Experience user_experience={ field_experience_summary } />
        <hr className="m-0" />
        <Education user_education={ field_education_summary } />
        <hr className="m-0" />
        <Skills user_skills={ field_skills } />
        <hr className="m-0" />
        <Interests user_interests={ user.attributes.field_interests } />
        <hr className="m-0" />
        <Awards user_awards={ user.attributes.field_awards_certifications } />
      </Container>
    );
  }
}
