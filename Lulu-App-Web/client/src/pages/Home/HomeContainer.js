import Home from "./Home";
import { getProducts } from "../../services/ProductService";
import { getServices } from "../../services/ServicesService";
import { useEffect, useState } from "react";



const HomeContainer = () => {

    const [productsLimit, setProductsLimit] = useState(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [servicesLimit, setServicesLimit] = useState([] || null);



    const loadProductsLimit = async () => {
        const response = await getProducts();
        if (response.status === 200) {
            setProductsLimit(response.data.allProductsLimit);
        };
        setIsLoadingProducts(false);
    };

    const loadServicesLimit = async () => {
        const response = await getServices();
        if (response?.status === 200) {
            setServicesLimit(response.data.allServicesLimit);
        };
        if (response?.status === 400) {
            setServicesLimit([] || null);
        };

        setIsLoadingServices(false);
    };
    
    useEffect(() => {
        loadProductsLimit();
        loadServicesLimit();
    }, []);

    return(
        <>  
            <Home 
                productsLimit={productsLimit} 
                isLoadingProducts={isLoadingProducts}
                isLoadingServices={isLoadingServices}
                servicesLimit={servicesLimit}
            />
        </>
    );
};

export default HomeContainer;