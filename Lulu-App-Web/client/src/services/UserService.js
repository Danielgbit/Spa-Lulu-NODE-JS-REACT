import axios from "axios";

const host = 'http://localhost:4000';

export async function postLogin (data) {
    try {
        const url = `${host}/user/login`;
        const body = {
            email: data.email,
            password: data.password,
        };
        const response = await axios.post(url, body, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function postLoginAdmin (data) {
    try {
        const url = `${host}/user/login/admin`;
        const body = {
            email: data.email,
            password: data.password,
        };
        const response = await axios.post(url, body, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function getUser () {
    try {
        const response = await axios.get(`http://localhost:4000/user/profile`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
    };
};

export async function postLogout (userId) {
    try {
        const response = await axios.post(
            `http://localhost:4000/user/logout/${userId}`
        );
        return response;
    } catch (error) {
        console.error(error);
    };
};


export async function postRegister (body) {
    try {
        const formData = new FormData();
        
        formData.append('firstName', body.firstName);
        formData.append('middleName', body.middleName);
        formData.append('lastName', body.lastName);
        formData.append('phoneNumber', body.phoneNumber);
        formData.append('email', body.email);
        formData.append('city', body.city);
        formData.append('avatar', body.avatar);
        formData.append('password', body.password);
        formData.append('address', body.address);
        formData.append('district', body.district);
        formData.append('avatarDefault', body.avatarDefault);


        const url = 'http://localhost:4000/user/register';
        const response = await axios.post(url, formData);
        return response
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export async function verifyToken () {
    try {
        const  response = await axios.get(`http://localhost:4000/user/verify`, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function putUpdateUser (body) {
    const formData = new FormData();

    formData.append('firstName', body.firstName);
    formData.append('middleName', body.middleName);
    formData.append('lastName', body.lastName);
    formData.append('phoneNumber', body.phoneNumber);
    formData.append('email', body.email);
    formData.append('city', body.city);
    formData.append('avatar', body.avatar);
    formData.append('password', body.password);
    formData.append('address', body.address);
    formData.append('district', body.district);
    formData.append('avatarDefault', body.avatarDefault);

    try {
        const  response = await axios.put(`${host}/user/update`, formData ,{ withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function putPasswordUpdate (body) {
    try {
        const  response = await axios.put(`${host}/user/update/password`, body ,{ withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function deleteUser (body) {
    try {
        const  response = await axios.post(`${host}/user/delete`, body, { withCredentials: true });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};


export async function getLengthUsers () {
    try {
        const response = await axios.get(`http://localhost:4000/user/length/all`);
        return response;
    } catch (error) {
        console.error(error);
    };
};


export async function getShoppingHistory (id) {
    try {
        const response = await axios.get(`http://localhost:4000/user/shopping/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};


export async function getShoppingDetail (id) {
    try {
        const response = await axios.get(`http://localhost:4000/order/detail/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function postForgotPassword (data) {
    try {
        const response = await axios.post(`http://localhost:4000/user/forgot-password`, { email: data.email });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};

export async function getResetPassword (token) {
    try {
        const response = await axios.get(`http://localhost:4000/user/reset-password?token=${token}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    };
};