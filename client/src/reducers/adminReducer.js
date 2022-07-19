export function adminReducer(state = false, action) {
    switch (action.type) {
      case "ADMIN_LOGIN":
        return action.payload;
      default:
        return state;
    }
  }
  