import { post } from "./api-helper";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const getCourse = async (courseID) => {
    let values = { courseID };
    let response = await fetch(BASE_URL + '/api/lurkers/getcourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
    });
    return JSON.parse(await response.text());
}

export const getCourseUsers = async (courseID) => {
    let values = { courseID };
    return post(values, 'api/lurkers/getcourseusers');
}

export const addNewCourse = async (userID, courseName) => {
    let values = { userID, courseName };
    return post(values, 'api/lurkers/createcourse');
}

export const deleteCourse = async (courseID) => {
    let values = { courseID };
    return post(values, 'api/lurkers/deletecourse');
}
