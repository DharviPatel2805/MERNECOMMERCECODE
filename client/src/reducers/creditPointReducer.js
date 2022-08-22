export function creditPointReducer(state = false, action) {
    switch (action.type) {
      case "CREDIT_POINT_APPLIED":
        return action.payload;
      default:
        return state;
    }
  }
  