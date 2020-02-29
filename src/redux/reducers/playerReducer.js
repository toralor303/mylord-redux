export default function playerReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_PLAYER':
      return [...state, { ...action.player }];
    case 'DELETE_PLAYER':
      return state.filter(player => player.id !== action.id);
    default:
      return state;
  }
}
