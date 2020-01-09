export default function playerReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_PLAYER':
      return [...state, {...action.name}];
    default:
      return state;
  }
}
