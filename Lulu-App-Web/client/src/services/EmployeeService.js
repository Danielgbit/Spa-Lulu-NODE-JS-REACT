import axios from 'axios';


export async function getEmployees() {
    try {
        const url = 'http://localhost:4000/employee/all';
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export async function getEmployeeDetail(id) {
    try {
        const url = `http://localhost:4000/employee/detail/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};



export async function postCreateEmployee(body) {
    try {
        const url = 'http://localhost:4000/employee/create';
        const response = await axios.post(url, body);
        return response;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};


export async function deleteEmployee(id) {
    try {
        const url = `http://localhost:4000/employee/destroy/${id}`;
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};


export async function putUpdateEmployee(id, body) {
    try {
        const url = `http://localhost:4000/employee/update/${id}`;
        const response = await axios.put(url, body);
        return response;
    } catch (error) {
        console.error(error);
    }
};
