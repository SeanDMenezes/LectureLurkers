import { USER_ACTION_TYPES } from "./user-types";

export const setUser = (user) => (
    {
        type: USER_ACTION_TYPES.SET_USER,
        payload: user
    }
)

export const resetUser = () => (
    {
        type: USER_ACTION_TYPES.RESET_USER,
    }
)
