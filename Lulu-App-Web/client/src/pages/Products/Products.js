//Components
import { useContext, useEffect, useState } from "react";
import ProductsSection from "../../components/Products/ProductsSection";
import Search from "../../components/Search/Search";
import CategoryContainer from "../../components/Products/Category/CategoryContainer";
import { Spinner } from "@chakra-ui/react";
import { Select, Button } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import { CartContext } from "../../Context/CartContext";


const Products = ({ products, isLoading, loadProductByPriceDescending, loadProducts, loadProductByPriceAcending, loadProductBySearch }) => {

  const [valueFromSearch, setValueFromSearch] = useState([]);
  const { message, setMessage } = useContext(CartContext);

  const handleValueChange = async (newValue) => {
    setValueFromSearch(newValue);
  };

  const { Option } = Select;

    const handleFilterChange = (value) => {
        if (value === 'ascendente') {
            loadProductByPriceDescending();
        }else if( value === 'descendente') {
            loadProductByPriceAcending();
        };
    };

    const handleOnClickClearFilter = () => {
        loadProducts();
    };

    const onValueChange = (value) => {
        loadProductBySearch(value);
    };

    useEffect(() => {
      if (message.length > 0) {
          toast.success(message);
      }
      return () => setMessage('');
    }, [message]);

  
  return (
    <>
      <div className="services-container-max">
        <h1 style={{ marginTop: "50px" }} className="services-title">
          PRODUCTOS
        </h1>
        <ToastContainer  className='toast-container-style'/>
        <div className="services-container-nav-search">
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "column",
              gap: "100px",
            }}
          >
            <div className="services-div-container-search">
              <Search onValueChange={onValueChange} />
            </div>
            <div className="product-filters-container">
              <div className="product-filters-content-wrapper">
                <i className="fa-solid fa-sort filters-product-icons"></i>
                <Select
                  className="product-filter-select"
                  defaultValue={"default"}
                  onChange={handleFilterChange}
                  style={{ width: 120 }}
                >
                  <Option value="default">Filtrar por</Option>
                  <Option value="ascendente">Menor a Mayor</Option>
                  <Option value="descendente">Mayor a Menor</Option>
                </Select>
              </div>
              <div className="product-filters-content-wrapper">
                <i
                  style={{ fontSize: "11px" }}
                  className="fa-solid fa-filter-circle-xmark filters-product-icons"
                ></i>
                <Button onClick={handleOnClickClearFilter}  className="product-filter-button">limpiar</Button>
              </div>
              <div className="product-filters-content-wrapper">
                <i style={{ fontSize: "11px" }} className="fa-solid fa-layer-group"></i>
                <CategoryContainer />
              </div>
            </div>
          </div>
        </div>
        <div className="container-products-section">
          {isLoading ? (
            <div className="spinner-container">
              <Spinner
                thickness="4px"
                speed="350ms"
                emptyColor="gray.200"
                color="violet.200"
                size="xl"
              />
            </div>
          ) : (
            <ProductsSection products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
