import axios from 'axios';

const host = 'http://localhost:4000';

export async function orderCreate (data) {
    try {
        const res = await axios.post(`${host}/payment/create-order`, data);
        return res;
    } catch (e) {
        console.log(e);
        return e.response;
    };
};

export async function getOrders () {
    try {
        const res = await axios.get(`${host}/order/all`);
        return res;
    } catch (e) {
        console.log(e);
        return e.response;
    };
};

export async function getOrderDetail (id) {
    try {
        const res = await axios.get(`${host}/order/detail/${id}`);
        return res;
    } catch (e) {
        console.log(e);
        return e.response;
    };
};


export async function getOrderProducts (id) {
    try {
        const res = await axios.get(`${host}/order/products/detail/${id}`);
        return res;
    } catch (e) {
        console.log(e);
        return e.response;
    };
};

export async function deleteOrder (id) {
    try {
        const res = await axios.delete(`${host}/order/delete/${id}`);
        return res;
    } catch (e) {
        console.log(e);
        return e.response;
    };
};

