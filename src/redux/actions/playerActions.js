export const createPlayer = player => {
  return { type: 'CREATE_PLAYER', player };
};

export const deletePlayer = id => {
  return { type: 'DELETE_PLAYER', id };
};
