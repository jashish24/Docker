import React, { Component } from 'react';

export default class Education extends Component {
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
    const { user_education } = this.props;
    let education_summary = '';

    if (user_education.data) {
      education_summary = user_education.data.map((value, index) =>
      <div key={ index } className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
        <div className="resume-content">
          <h3 className="mb-0">{ value.attributes.field_college_university_name }</h3>
          <div className="subheading mb-3">{ value.attributes.field_degree_name }</div>
          <div>{ value.attributes.field_degree_major }</div>
          <p>{ value.attributes.field_gpa }</p>
        </div>
        <div className="resume-date text-md-right">
          <span className="text-primary">{ this.convertDateTime(value.attributes.field_duration.value ) } - { this.convertDateTime(value.attributes.field_duration.end_value ) }</span>
        </div>
      </div>
      );
    }

    return (
      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
        <div className="w-100">
          <h2 className="mb-5">Education</h2>
          { education_summary }
        </div>
      </section>
    );
  }
}
