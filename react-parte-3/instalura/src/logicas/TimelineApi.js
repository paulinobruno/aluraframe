import { like, comentario, listagem, notifica } from '../actions/actionCreator';

export default class TimelineApi {
  static like(fotoId) {
    return dispatch =>
      fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("não foi possível realizar o like da foto");
          }
        })
        .then(liker => {
          dispatch(like(fotoId, liker));
          return liker;
        });
  }

  static comenta(fotoId, textoComentario) {
    return dispatch => {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({ texto: textoComentario }),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      };

      fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("não foi possível comentar");
          }
        })
        .then(novoComentario => {
          dispatch(comentario(fotoId, novoComentario));
        });
    };
  }

  static lista(urlPerfil) {
    return dispatch =>
      fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {
          dispatch(listagem(fotos));

          return fotos;
        });
  }

  static pesquisa(login) {
    return dispatch =>
      fetch(`http://localhost:8080/api/public/fotos/${login}`)
        .then(response => response.json())
        .then(fotos => {
          if (fotos.length === 0) {
            dispatch(notifica('usuário não encontrado'));
          } else {
            dispatch(notifica(''));
          }

          dispatch(listagem(fotos))
          return fotos;
        });
  }
}
