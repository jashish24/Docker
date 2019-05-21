import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import loading from '../assets/images/loading.webp';

export default class Loading extends Component {
  render() {
    return (
      <div id="loading-page">
        <div className="loading-film">&nbsp;</div>
        <div className="loading-content">
          <Image fluid src={ loading } alt="" />
        </div>
      </div>
    );
  }
}
