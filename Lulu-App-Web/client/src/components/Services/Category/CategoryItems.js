import { Link } from "react-router-dom";

const CategoriesNavItems = (props) => {

    const { allCategories } = props;

    return(
        <div className="categories-buttons-container-max" >
            <ul className="categories-buttons-ul-wrapper">
                {allCategories && allCategories.map((category) => (
                    <Link to={`/services/category/${category.category_id}`} key={category.category_id}> 
                        <li>{category.category_name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesNavItems;