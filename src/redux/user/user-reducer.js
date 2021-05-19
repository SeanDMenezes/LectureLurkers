import { USER_ACTION_TYPES } from "./user-types";

const INITIAL_STATE = {
    _id: 0,
    username: "",
    role: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_ACTION_TYPES.RESET_USER:
            return {
                ...INITIAL_STATE
            }

        case USER_ACTION_TYPES.SET_USER:
            return {
                ...state,
                _id: action.payload._id,
                username: action.payload.username,
                role: action.payload.role,
            }

        default:
            return state;
    }
}

export default userReducer;