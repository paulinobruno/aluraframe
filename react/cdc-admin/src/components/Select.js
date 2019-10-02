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
        <label for={this.props.id}>{this.props.label}</label>
        <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
          <option value="">Selectione...</option>
          {
            this.props.options.map(({ id, nome }) =>
              <option value={id}>{nome}</option>
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
