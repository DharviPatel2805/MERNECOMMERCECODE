export function applyRefReducer(state = false, action) {
    switch (action.type) {
      case "REF_APPLIED":
        return action.payload;
      default:
        return state;
    }
  }
  