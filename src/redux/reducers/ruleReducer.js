export default function ruleReducer(state = '', action) {
  switch (action.type) {
    case 'SET_RULE':
      return action.rule;
    default:
      return state;
  }
}
