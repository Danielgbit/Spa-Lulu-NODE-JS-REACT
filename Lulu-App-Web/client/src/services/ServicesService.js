import axios from "axios";

export async function getServices () {
    try {
        const url = 'http://localhost:4000/service/all'
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};


export async function deleteService (id) {
    try {
        const url = `http://localhost:4000/service/destroy/${id}`
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};


export async function getCategories () {
    try {
        const url = 'http://localhost:4000/service/category/all';
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    };
};

export async function postCreateService (body) {
    try {
        const formData = new FormData();

        formData.append('categoryId', body.categoryId);
        formData.append('serviceName', body.serviceName);
        formData.append('durationMinutes', body.durationMinutes);
        formData.append('price', body.price);
        formData.append('image', body.image);
        formData.append('description', body.description);

        const url = 'http://localhost:4000/service/create';
        const response = await axios.post(url, formData);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export async function putService (id, body) {
    try {
        const formData = new FormData();

        formData.append('categoryId', body.categoryId);
        formData.append('serviceName', body.serviceName);
        formData.append('durationMinutes', body.durationMinutes);
        formData.append('price', body.price);
        formData.append('image', body.image);
        formData.append('description', body.description);

        const url = `http://localhost:4000/service/update/${id}`
        const response = await axios.put(url, formData);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};


export async function getService (id) {
    try {
        const url = `http://localhost:4000/service/detail/${id}`
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};