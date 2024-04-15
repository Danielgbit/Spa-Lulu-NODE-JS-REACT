import axios from "axios";

const host = 'http://localhost:4000';

export async function postLoginAdmin (body) {
    try {
        const res = await axios.post(`${host}/user/login/admin`, body, {withCredentials: true});
        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};


export async function getAuthToken () {
    try {
        const res = await axios.get(`${host}/user/verify/admin`, {withCredentials: true});
        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};