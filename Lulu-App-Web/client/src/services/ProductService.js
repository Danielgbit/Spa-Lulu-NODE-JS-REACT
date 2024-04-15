import axios from "axios";

export async function getCategories () {
    try {
        const url = 'http://localhost:4000/product/categories/all'
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};


export async function getProducts () {
    try {
        const response = await axios.get('http://localhost:4000/product/all');
        return response;
    } catch (error) {
        console.error(error);
    }
};


export async function getProductsCategory (id) {
    try {   
        const response = await axios.get(`http://localhost:4000/product/category/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    };
};

export async function getProductDetail (id) {
    try {   
        const response = await axios.get(`http://localhost:4000/product/detail/${id}`);
        return response;
    } catch(e){
        console.error(e);
    };
};

export async function postProductCreate (body) {
    try {

        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('price', body.price);
        formData.append('categoryId', body.categoryId);
        formData.append('stock', body.stock);
        formData.append('discount', body.discount);
        formData.append('image', body.image);
        body.images.forEach((file) => {
            formData.append('images', file.originFileObj);
        });

        const url = 'http://localhost:4000/product/create';
        const response = await axios.post(url, formData);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export async function deleteProduct (id) {
    try {
        const url = `http://localhost:4000/product/destroy/${id}`;
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};


export async function putProduct (id, body) {
    try {

        console.log(id, body);
/*         const formData = new FormData();

        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('price', body.price);
        formData.append('stock', body.stock);
        formData.append('discount', body.discount);
        formData.append('categoryId', body.categoryId);
        body.images.forEach((file) => {
            formData.append('images', file.originFileObj);
        });

        const url = `http://localhost:4000/product/update/${id}`;
        const response = await axios.put(url, formData);
        return response; */
    } catch (error) {
        console.error(error);
        return error.response;
    }
};


export async function getImage (id) {
    try {
        const url = `http://localhost:4000/product/image/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function getProductsByPriceDescending () {
    try {
        const url = `http://localhost:4000/product/price/descending`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function getProductsByPriceAscending () {
    try {
        const url = `http://localhost:4000/product/price/ascending`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function getProductsBySearch (value) {
    try {
        const url = `http://localhost:4000/product/search?name=${value}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};


export async function getProductImages (id) {
    try {
        const url = `http://localhost:4000/product/images/${id}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};