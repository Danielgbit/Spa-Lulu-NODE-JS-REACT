import axios from "axios";

const host = 'http://localhost:4000';

export async function postCreateInventory (body) {
    try {
        const res = await axios.post(`${host}/inventory/create`, body);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};

export async function putInventoryItem (id, body) {
    try {
        const res = await axios.put(`${host}/inventory/update/${id}`, body);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};

export async function getAllItems () {
    try {
        const res = await axios.get(`${host}/inventory/items`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};

export async function getItem (id) {
    try {
        const res = await axios.get(`${host}/inventory/item/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};

export async function destroyItem (id) {
    try {
        const res = await axios.delete(`${host}/inventory/delete/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};