import { useEffect, useState } from "react";
import axios from "axios";
import CategoriesNavItems from "../../Services/Category/CategoryItems";


const CategoryItemsServiceContainer = () => {

    const [allCategories, setAllCategories] = useState([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/service/all');
    
                if (!response) { throw new Error('Fetch categories service not found');}
    
                const data = await response.data;
                setAllCategories(data.allCategories);
    
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    return(
        <CategoriesNavItems allCategories={allCategories}/>
    );
};

export default CategoryItemsServiceContainer;