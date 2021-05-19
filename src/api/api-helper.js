const BASE_URL = process.env.REACT_APP_API_ENDPOINT || "https://lecture-lurkers.herokuapp.com";

export const post = async (values, endpoint) => {
    let response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
    });
    return JSON.parse(await response.text());
}
