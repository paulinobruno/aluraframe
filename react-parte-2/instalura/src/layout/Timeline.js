import React, { Component } from 'react';
import Photo from '../componentes/Photo';

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/public/fotos/rafael')
      .then(resp => resp.json())
      .then(photos => this.setState({ photos }));
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(p =>
            (<Photo key={p.id} data={p}></Photo>)
          )
        }
      </div>
    );
  }
}
