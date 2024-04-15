import ProductCreateForm from "./ProductCreateForm";
import { getCategories, postProductCreate } from "../../../services/ProductService";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const ProductCreateContainer = () => {

    const [ categories, setCategories ] = useState(null);
    const [ isLoadingCategories, setIsLoadingCategories ] = useState(true);
    const [ errors, setErrors ] = useState([] || null);
    const navigate = useNavigate();


    const loadCategories = async () => {
        const response = await getCategories();
        if (response.status === 200) {
            setCategories(response.data.allCategories);
        };

        setIsLoadingCategories(false);
    };


    useEffect(() => {
        loadCategories();
    }, []);

    const createProduct = async (body) => {
        const response = await postProductCreate(body);
        if (response.status !== 200) {
            setErrors(response.data.errors);
        };
        
        if (response.status === 201) {
            navigate('/admin/product');
        };
    };

    useEffect(() => {
        if (errors.length > 0) {
            const time = setTimeout(() => {
                setErrors([]);
            }, 8000);
            return () => clearTimeout(time);
        }
    }, [errors, setErrors]);

    
    return(
        <>
            { isLoadingCategories ? ( <Spinner/> ) : (
                <ProductCreateForm 
                    categories={categories}
                    createProduct={createProduct}
                    errorsBack={errors}
                />        
            )}
        </>
    )
};

export default ProductCreateContainer;