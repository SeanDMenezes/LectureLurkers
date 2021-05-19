const { post } = require("./api-helper");
const { getUser } = require("./user-api");

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || "https://lecture-lurkers.herokuapp.com";

export const addNewLecture = async (courseID, lectureName) => {
    let values = { courseID, lectureName };
    return post(values, 'api/lurkers/createlecture');
}

export const getLecture = async (lectureID) => {
    let values = { lectureID };
    let response = await fetch(BASE_URL + '/api/lurkers/getlecture', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
    });
    let parsedLectures = JSON.parse(await response.text());
    let newPosts;
    if (parsedLectures && parsedLectures.posts) {
        newPosts = await Promise.all(parsedLectures.posts.map(async (post) => {
            const newAuthor = post && await getUser(post.author);
            return { ...post, author: newAuthor };
        }));
    }
    return { ...parsedLectures, posts: newPosts };
}

export const resumeLecture = async (lectureID) => {
    let values = { lectureID };
    return post(values, 'api/lurkers/resumeLecture');
}

export const endLecture = async (lectureID) => {
    let values = { lectureID };
    return post(values, 'api/lurkers/endlecture');
}

export const deleteLecture = async (lectureID) => {
    let values = { lectureID };
    return post(values, 'api/lurkers/deletelecture');
}
