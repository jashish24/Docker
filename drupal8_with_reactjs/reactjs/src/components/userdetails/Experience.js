import React, { Component } from 'react';

export default class Experience extends Component {
  /**
   * Function to format experience datetime
   * @param {string} datetime - Valid datetime string
   */
  convertDateTime(datetime) {
    let timestamp = new Date(datetime).getTime();
    let formatted_date = new Intl.DateTimeFormat('en-UA', {
      year: 'numeric',
      month: 'long',
    }).format(timestamp);

    return formatted_date;
  }

  render() {
    const { user_experience } = this.props;
    let experience_summary = '';

    if (user_experience.data) {
      experience_summary = user_experience.data.map((value, index) =>
        <div key={ index } className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">{ value.attributes.field_position }</h3>
            <div className="subheading mb-3">{ value.attributes.field_company }</div>
            <p>{ value.attributes.field_description }</p>
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">{ this.convertDateTime(value.attributes.field_duration.value) } - { value.attributes.field_current_company ? 'Present' : this.convertDateTime(value.attributes.field_duration.end_value) }</span>
          </div>
        </div>
      );
    }

    return (
      <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="experience">
        <div className="w-100">
          <h2 className="mb-5">Experience</h2>
          { experience_summary }
        </div>
      </section>
    );
  }
}
