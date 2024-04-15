import ProductAdmin from "./ProductAdmin";
import { getProducts, deleteProduct } from "../../../services/ProductService";
import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react';

const ProductAdminContainer = () => {

    const [ products, setProducts ] = useState(null);
    const [ isLoadingProducts, setIsLoadingProducts ] = useState(true);


    const loadProducts = async () => {
        const response = await getProducts();
        if (response.status === 200) {
            setProducts(response.data.allProducts);
        };

        setIsLoadingProducts(false);
    };

    const destroyProduct = async (id) => {
        const response = await deleteProduct(id);
        if (response.status === 200) {
            loadProducts();
        };
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return(
        <>
            {isLoadingProducts ? (
                <div className='spinner-container'>
                    <Spinner
                    thickness='4px'
                    speed='350ms'
                    emptyColor='gray.200'
                    color='violet.200'
                    size='xl'
                    />
                </div>
            ) : (
                <ProductAdmin
                    products={products}
                    destroyProduct={destroyProduct}
                />
            )}
        </>
    )
};

export default ProductAdminContainer;