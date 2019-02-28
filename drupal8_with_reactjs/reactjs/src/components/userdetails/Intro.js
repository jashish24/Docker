import React, { Component } from 'react';

export default class Intro extends Component {
  render() {
    const { user_intro } = this.props;
    const { social_links } = this.props;

    return (
      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
        <div className="w-100">
          <h1 className="mb-0">{ user_intro.field_first_name } <span className="text-primary">{ user_intro.field_last_name }</span>
          </h1>
          <div className="subheading mb-5">{ user_intro.field_address } · <a href="mailto:{ user_intro.mail }">{ user_intro.mail }</a>
          </div>
          <p className="lead mb-5">{ user_intro.field_about }</p>
          <div className="social-icons">{ social_links }</div>
        </div>
      </section>
    );
  }
}
