import ProductFormUpdate from "./ProductFormUpdate";
import { useParams } from "react-router-dom";
import { getCategories, putProduct, getProductDetail } from "../../../services/ProductService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";


const ProductUpdateContainer = () => {

    const {id} = useParams();

    const [ categories, setCategories ] = useState(null);
    const [ isLoadingCategories, setIsLoadingCategories ] = useState(true);
    const [ product, setProduct ] = useState([]);

    const [ errors, setErrors ] = useState(null);
    const navigate = useNavigate();


    const loadCategories = async () => {
        const response = await getCategories();
        if (response.status === 200) {
            setCategories(response.data.allCategories);
        };

        setIsLoadingCategories(false);
    };

    const loadProduct = async () => {
        const response = await getProductDetail(id);
        setProduct(response.data.productDetail);
    };

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, []);

    useEffect(() => {
        if (errors?.length > 0) {
            const time = setTimeout(() => {
                setErrors([]);
            }, 4000);
            return () => clearTimeout(time);
        };
    }, [errors, setErrors]);


    const updateProduct = async (body) => {
        const response = await putProduct(id, body);
        if (response.status === 400) {
            setErrors(response.data.errors);
        };

        if (response.status === 200) {
            navigate('/admin/product');
        };
    };

    return(
        <>
            {isLoadingCategories ? ( <Spinner/> ) : ( 
                <ProductFormUpdate
                    categories={categories}
                    errors={errors}
                    updateProduct={updateProduct}
                    product={product}
                    id={id}
                />
            )}
        </>
    )
};

export default ProductUpdateContainer;