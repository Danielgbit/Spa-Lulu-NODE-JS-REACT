import axios from "axios";


export async function postClient (body) {
    try {
        const url = 'http://localhost:4000/client/create';
        const response = await axios.post(url, body);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export async function getClients () {
    try {   
        const url = 'http://localhost:4000/client/all';
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function getClient (id) {
    try {   
        const url = `http://localhost:4000/client/detail/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function deleteClient (id) {
    try {   
        const url = `http://localhost:4000/client/destroy/${id}`;
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function putClient (id, body) {
    try {   
        const url = `http://localhost:4000/client/update/${id}`;
        const response = await axios.put(url, body);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};


export async function getClientByDate (data) {
    try {   
        const url = `http://localhost:4000/client/search?date=${data}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};