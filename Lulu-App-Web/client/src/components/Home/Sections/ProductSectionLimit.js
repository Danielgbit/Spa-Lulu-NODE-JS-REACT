import { Link } from "react-router-dom";
import ProductCard from "../../Products/Card/ProductCard";



const ProductSectionLimit = ({ productsLimit }) => {

    return (
        <>
        <div className="articles-products-container-max" >
            <h1 className="articles-products-title">Productos destacados</h1>
            <div className="articles-products-container-cards">
                <ProductCard productsLimit={productsLimit} />
            </div>
            <Link className="articles-products-button-container" to={'/products'}>
                <span className="Button-Explorar"><i class="fa-solid fa-store"></i>Tienda</span>
            </Link>
        </div>
        </>
    );
};

export default ProductSectionLimit;