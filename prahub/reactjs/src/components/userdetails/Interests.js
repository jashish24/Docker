import React, { Component } from 'react';

export default class Interests extends Component {
  render() {
    const { user_interests } = this.props;

    return (
      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="interests">
        <div className="w-100">
          <h2 className="mb-5">Interests</h2>
          <p>{ user_interests }</p>
        </div>
      </section>
    );
  }
}
