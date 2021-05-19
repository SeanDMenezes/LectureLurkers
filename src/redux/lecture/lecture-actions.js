import { LECTURE_ACTION_TYPES } from "./lecture-types";

import { getUser } from "../../api/user-api";

export const setLecture = (lectureID, courseID) => {
    return (
    {
        type: LECTURE_ACTION_TYPES.SET_LECTURE,
        payload: { lectureID, courseID }
    }
)}

export const resetLecture = () => (
    {
        type: LECTURE_ACTION_TYPES.RESET_LECTURE,
    }
)
