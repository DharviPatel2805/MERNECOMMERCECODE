import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { adminReducer } from "./adminReducer";
import { sidebarReducer } from "./sidebarReducer";
import { creditPointReducer } from "./creditPointReducer";
import { applyRefReducer } from "./applyRefReducer";


const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  isAdmin: adminReducer,
  sidebar: sidebarReducer,
  credit: creditPointReducer,
  refApplied: applyRefReducer,
});

export default rootReducer;
