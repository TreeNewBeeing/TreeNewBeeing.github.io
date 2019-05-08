import { combineReducers } from "redux";
import { actions } from "../action/index";

const expand = (state = false, action) => {
    switch (action.type) {
        case actions.CLICK_MENU:
            return !state;
        default:
            return state;
    }
};
export default combineReducers({ expand });
