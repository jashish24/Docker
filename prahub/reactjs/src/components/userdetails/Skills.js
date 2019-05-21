import React, { Component } from 'react';

export default class Skills extends Component {
  render() {
    const { user_skills } = this.props;

    let skills_summary = '';

    if (user_skills.data) {
      skills_summary = user_skills.data.map((value, index) =>
        <li key={ index } className="list-inline-item">
          <i title={ value.attributes.name } className={ "fab " + value.attributes.field_class_name }></i>
        </li>
      );
    }

    return (
      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="skills">
        <div className="w-100">
          <h2 className="mb-5">Skills</h2>
          <div className="subheading mb-3">Platforms, Programming Languages &amp; Tools</div>
          <ul className="list-inline dev-icons">
            { skills_summary }
          </ul>
        </div>
      </section>
    );
  }
}
