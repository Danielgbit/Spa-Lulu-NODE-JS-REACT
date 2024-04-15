import axios from "axios";

const api = 'https://api-colombia.com/api/v1/City';

const countryName = 'Colombia';


export async function getAllContries () {
    try {
        const response = await axios.get(`${api}`);
        return response;
    } catch (e) {
        console.error(e);
        return null;
    };
};