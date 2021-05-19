import { LECTURE_ACTION_TYPES } from "./lecture-types";

const INITIAL_STATE = {
    courseID: 0,
    lectureID: 0,
};

const lectureReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LECTURE_ACTION_TYPES.RESET_LECTURE:
            return {
                ...INITIAL_STATE
            }

        case LECTURE_ACTION_TYPES.SET_LECTURE:
            return {
                ...state,
                courseID: action.payload.courseID,
                lectureID: action.payload.lectureID,
            }

        default:
            return state;
    }
}

export default lectureReducer;
