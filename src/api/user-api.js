const { post } = require("./api-helper");

export const login = async (username, password) => {
    let values = { username, password };
    return post(values, 'api/lurkers/login');
}

export const signup = async (username, password, role) => {
    let values = { username, password, role };
    return post(values, 'api/lurkers/CreateUser');
}

export const getUserCourses = async (userID) => {
    let values = { userID };
    return post(values, 'api/lurkers/getusercourses');
}

export const getUser = async (userID) => {
    let values = { userID };
    return post(values, 'api/lurkers/GetUser');
}

export const joinNewCourse = async (userID, joinID) => {
    let values = { userID, joinID };
    return post(values, 'api/lurkers/JoinCourse'); 
}
