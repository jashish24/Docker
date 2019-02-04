import React, { Component } from 'react';

import Title from "./Header/Title";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Title title={this.props.title} />
      </div>
    );
  }
}
