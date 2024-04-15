import axios from "axios";

const host = 'http://localhost:4000';

export async function getGains () {
    try {
        const res = await axios.get(`${host}/gain/all`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function getGain (id) {
    try {
        const res = await axios.get(`${host}/gain/detail/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function putUpdateGain (id, body) {
    try {
        const res = await axios.put(`${host}/gain/update/${id}`, body);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function postCreateGain (body) {
    try {
        const res = await axios.post(`${host}/gain/create`, body);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function deleteGain (id) {
    try {
        const res = await axios.delete(`${host}/gain/delete/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function searchGainByDate (start, end) {
    try {
        const res = await axios.get(`${host}/gain/date?start=${start}&end=${end}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function searchGainByDay (day) {
    try {
        const res = await axios.get(`${host}/gain/day?date=${day}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};


export async function searchGainByEmployee (id) {
    try {
        const res = await axios.get(`${host}/gain/employee/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function searchGainByCategory (category) {
    try {
        const res = await axios.get(`${host}/gain/category/?name=${category}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};

export async function searchGainByMethodCheckout (method) {
    try {
        const res = await axios.get(`${host}/gain/type/?method=${method}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};