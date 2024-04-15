import { useEffect, useState } from "react";
import CategoryContainer from "../Category/CategoryContainer";
import ProductsSection from "../ProductsSection";
import { Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ProductList = ({ productsCategory, isLoading }) => {
  const [valueFromSearch, setValueFromSearch] = useState([]);
  const [productsCategoryDetail, setProductsCategoryDetail] = useState(null);

  useEffect(() => {
    setProductsCategoryDetail(productsCategory);
  }, [productsCategory]);

  const handleValueChange = async (newValue) => {
    setValueFromSearch(newValue);
  };

  return (
    <>
      <div className="services-container-max">
        {
          <h1 className="services-title">
            {productsCategoryDetail && productsCategoryDetail.categoryName}
          </h1>
        }
        <div
          style={{ display: "flex", flexDirection: 'row', gap: '10px' }}

          className="services-container-nav-search"
        >
          <div>
            <CategoryContainer />
          </div>
          <div className="product-filters-content-wrapper">
            <Button className="product-filter-button">
              <Link to="/products">Limpiar</Link>
            </Button>
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <ProductsSection productsCategoryDetail={productsCategoryDetail} />
        )}
      </div>
    </>
  );
};

export default ProductList;
