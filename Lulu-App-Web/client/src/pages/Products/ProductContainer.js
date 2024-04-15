import Products from "./Products";
import { getProducts, getProductsByPriceDescending, getProductsByPriceAscending, getProductsBySearch } from "../../services/ProductService";
import { useEffect, useState } from "react";


const ProductContainer = () => {

    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const loadProducts = async () => {
        const response = await getProducts();
        if (response.status === 200) {
            setProducts(response.data);
        };

        setIsLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProductByPriceDescending = async () => {
        const res = await getProductsByPriceDescending();
        if(res?.status === 200) { setProducts(res.data); };
    };

    const loadProductByPriceAcending = async () => {
        const res = await getProductsByPriceAscending();
        if(res?.status === 200) { setProducts(res.data); };
    };

    const loadProductBySearch = async (value) => {
        const res = await getProductsBySearch(value);
        if(res?.status === 200) { setProducts(res.data); };
    };
    

    return(
        <Products 
            products={products} 
            isLoading={isLoading}
            loadProductByPriceDescending={loadProductByPriceDescending}
            loadProductByPriceAcending={loadProductByPriceAcending}
            loadProducts={loadProducts}
            loadProductBySearch={loadProductBySearch}
            
        />
    );
};

export default ProductContainer;