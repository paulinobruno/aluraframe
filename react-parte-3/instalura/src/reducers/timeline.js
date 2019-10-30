import { List } from 'immutable';

export const timeline = (state = new List(), action) => {
  if (action.type === 'LISTAGEM') {
    return new List(action.fotos);
  }

  if (action.type === 'COMENTARIO') {
    const { fotoId, novoComentario } = action;

    const fotoAchada = state.find(foto => foto.id === fotoId);
    const novosComentarios = [...fotoAchada.comentarios, novoComentario];
    const novaFoto = { ...fotoAchada, comentarios: novosComentarios };
    const currIndex = state.findIndex(foto => foto.id === fotoId);


    return state.set(currIndex, novaFoto);
  }

  if (action.type === 'LIKE') {
    const { fotoId, liker } = action;
    const fotoAchada = state.find(foto => foto.id === fotoId);
    fotoAchada.likeada = !fotoAchada.likeada;

    const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

    if (possivelLiker === undefined) {
      fotoAchada.likers.push(liker);
    } else {
      const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
      fotoAchada.likers = novosLikers;
    }

    return state;
  }

  return state;
};
