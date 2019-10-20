import React, { Component } from 'react';
import Photo from '../componentes/Photo';
import { store } from '../security/TokenStore';

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    const authParam = `X-AUTH-TOKEN=${store.getValue()}`;
    fetch(`http://localhost:8080/api/fotos?${authParam}`)
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
