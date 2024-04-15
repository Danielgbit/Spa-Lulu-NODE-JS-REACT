import axios from "axios";

const host = 'http://localhost:4000';

export async function postCreateExpense (body) {
    try {
        const res = await axios.post(`${host}/expense/create`, body);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};


export async function getExpenses () {
    try {
        const res = await axios.get(`${host}/expense/all`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};


export async function deleteExpense (id) {
    try {
        const res = await axios.delete(`${host}/expense/delete/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};


export async function getExpense (id) {
    try {
        const res = await axios.get(`${host}/expense/detail/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};


export async function putUpdateExpense (id, body) {
    try {
        const res = await axios.put(`${host}/expense/update/${id}`, body);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};