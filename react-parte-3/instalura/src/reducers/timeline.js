export const timeline = (state = [], action) => {
  if (action.type === 'LISTAGEM') {
    return action.fotos;
  }

  return state;
};
