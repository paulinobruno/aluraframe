import { List } from 'immutable';

function trocaFoto(fotos, fotoId, fnNovasProps) {
  const fotoAchada = fotos.find(foto => foto.id === fotoId);
  const novasProps = fnNovasProps(fotoAchada);
  const novaFoto = { ...fotoAchada, ...novasProps };
  const currIndex = fotos.findIndex(foto => foto.id === fotoId);

  return fotos.set(currIndex, novaFoto);
}

export const timeline = (state = new List(), action) => {
  if (action.type === 'LISTAGEM') {
    return new List(action.fotos);
  }

  if (action.type === 'COMENTARIO') {
    const { fotoId, novoComentario } = action;

    return trocaFoto(state, fotoId, fotoAchada => (
      { comentarios: [ ...fotoAchada.comentarios, novoComentario ] }
    ));
  }

  if (action.type === 'LIKE') {
    const { fotoId, liker } = action;

    return trocaFoto(state, fotoId, fotoAchada => {
      const likeada = !fotoAchada.likeada;

      let likers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
      if (likers.length === fotoAchada.likers.length) {
        likers = [ ...likers, liker ];
      }

      return { likeada, likers };
    });
  }

  return state;
};
