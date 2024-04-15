import axios from "axios";


export async function getAppointments () {
    try {
        const url = 'http://localhost:4000/appointment/all'
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    };
};

export async function getEmployees () {
    try {
        const url = 'http://localhost:4000/employee/all'
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    };
};


export async function postAppointment (body) {
    try {
        const url = 'http://localhost:4000/appointment/create';
        const response = await axios.post(url, body);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};


export async function getAppointmentDetail (id) {
    try {
        const url = `http://localhost:4000/appointment/detail/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function getAppointmentDetailUpdate (id) {
    try {
        const url = `http://localhost:4000/appointment/detail/update/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function putAppointment (id, body) {
    try {
        const url = `http://localhost:4000/appointment/update/${id}`;
        const response = await axios.put(url, body);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    };
};

export async function deleteAppointment (id) {
    try {
        const url = `http://localhost:4000/appointment/destroy/${id}`;
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.log(error);
    };
};


export async function getAvailabilities (id) {
    try {
        const url = `http://localhost:4000/appointment/detail/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
    };
};

export async function searchAppointByDate (startDate, endDate) {
    try {
        const url = `http://localhost:4000/appointment/date?start=${startDate}&end=${endDate}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
    };
};

export async function searchAppointByDay (day) {
    try {
        const url = `http://localhost:4000/appointment/day?date=${day}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
    };
};


export async function searchAppointByEmployee (id) {
    try {
        const res = await axios.get(`http://localhost:4000/appointment/employee/${id}`);
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    };
};