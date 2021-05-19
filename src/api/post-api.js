const { post } = require("./api-helper");

export const addNewPost = async (lectureID, author, content) => {
    let values = { lectureID, author, content };
    return post(values, 'api/lurkers/createpost');
}

export const likePost = async (postID) => {
    let values = { postID };
    return post(values, 'api/lurkers/likepost');
}
