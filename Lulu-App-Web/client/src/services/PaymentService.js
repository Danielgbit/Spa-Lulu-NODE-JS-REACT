import axios from "axios";

const host = 'http://localhost:4000';

export async function getPayments () {
    try {
        const res = await axios.get(`${host}/payment/all`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};