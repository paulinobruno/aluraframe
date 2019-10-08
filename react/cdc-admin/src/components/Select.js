import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Select extends Component {
  constructor() {
    super();

    this.state = {
      msgErro: ''
    };
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select {...this.props}>
          <option value="">Selectione...</option>
          {
            this.props.options.map(({ id, nome }) =>
              <option value={id} key={id}>{nome}</option>
            )
          }
        </select>
        <span className="erro">{this.state.msgErro}</span>
      </div>
    );
  }

  componentDidMount() {
    PubSub.subscribe('erro-validacao', (_, { field, defaultMessage: msgErro }) => {
      if (field === this.props.name) {
        this.setState({ msgErro });
      }
    });

    PubSub.subscribe('limpa-erros', () => this.setState({ msgErro: '' }));
  }
}
