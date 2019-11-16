import React, { Component } from 'react';
import FotoItem from './Foto';
import TimelineApi from '../logicas/TimelineApi';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.login = this.props.login;
  }

  carregaFotos() {
    let urlPerfil;

    if (this.login === undefined) {
      urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    this.props.lista(urlPerfil);
  }

  componentDidMount() {
    this.carregaFotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.props.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta} />)
          }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}

const mapStateToPros = state => ({ fotos: state.timeline });

const mapDispatchToProps = dispatch => ({
  like: fotoId =>
    dispatch(TimelineApi.like(fotoId)),
  comenta: (fotoId, textoComentario) =>
    dispatch(TimelineApi.comenta(fotoId, textoComentario)),
  lista: urlPerfil =>
    dispatch(TimelineApi.lista(urlPerfil))
});

const TimelineContainer = connect(mapStateToPros, mapDispatchToProps)(Timeline);

export default TimelineContainer;
