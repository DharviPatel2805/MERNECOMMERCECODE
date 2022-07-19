export function sidebarReducer(state = false, action) {
    switch (action.type) {
      case "SET_SIDEBAR":
        return action.payload;
      default:
        return state;
    }
  }
  