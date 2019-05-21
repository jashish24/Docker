import React, { Component } from 'react';

export default class Interests extends Component {
  render() {
    const { user_awards } = this.props;

    return (
      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="awards">
        <div className="w-100">
          <h2 className="mb-5">Awards &amp; Certifications</h2>
          <ul className="fa-ul mb-0">
            { user_awards.map((value, index) =>
              <li key={ index }>
                <i className="fa-li fa fa-trophy text-warning"></i>
                { value }
              </li>
            ) }
          </ul>
        </div>
      </section>
    );
  }
}
