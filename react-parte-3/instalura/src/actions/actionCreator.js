export const like = (fotoId, liker) => ({ type: 'LIKE', fotoId, liker });

export const comentario = (fotoId, novoComentario) => ({ type: 'COMENTARIO', fotoId, novoComentario });

export const listagem = fotos => ({ type: 'LISTAGEM', fotos });

export const notifica = msg => ({ type: 'ALERT', msg });
