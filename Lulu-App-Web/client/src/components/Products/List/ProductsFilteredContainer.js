import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from './ProductList';
import { getProductsCategory } from '../../../services/ProductService';

const ProductsFilteredContainer = () => {

    const { id } = useParams();

    const [productsCategory, setProductsCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadProductsCategory = async () => {
            const response = await getProductsCategory(id);
            if (response.status === 200) {
                setProductsCategory(response.data);
            }
            setIsLoading(false);
        };
        loadProductsCategory();
    }, [id]);


    return(
        <>
            {<ProductList productsCategory={productsCategory} isLoading={isLoading}/>}
        </>
    );
};

export default ProductsFilteredContainer;