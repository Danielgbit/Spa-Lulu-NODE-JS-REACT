import { useContext, useEffect, useState } from "react";
import { formatNumber } from "../../../utils/numberFormat";
import { InputNumber, Tag } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";
import { UserContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { toast, ToastContainer } from 'react-toastify';


const ProductDetail = ({ productDetail, images }) => {

  const { isAutenticated } = useContext(UserContext);
  const { addProductInCart, loadCart, userId, setMessage, message } = useContext(CartContext);
  
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);

  const increment = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onClickProductInCart = async (productId, stock) => {
    if (userId?.length > 0 && productId?.toString.length > 0) {
        await addProductInCart(productId, stock, quantity);
        loadCart();
    };
  };


  useEffect(() => {
    if (message.length > 0) {
        toast.success(message);
    }
    return () => setMessage('');
  }, [message]);


  return (
    <div id="product-detail-body">
        <div className="product-detail-container-max" >
        <ToastContainer  className='toast-container-style'/>
          <div className="product-images-container-max">
            <div className="container-image-product-detail">
              <Carousel className="productDetail-imagePrimary-container">
                  <Image className='productDetail-imagePrimary' src={product && product.image} />
              </Carousel>

              <div className="product-carrousel-container">
                <Image.PreviewGroup>
                    {images.map((image, index) => (
                    <Image className="images-carrousel" key={index} src={`data:image/jpeg;base64,${image.data}`} />
                    ))}
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
          <div className="product-detail-container-content">
            <span className="product-detail-name">{product.name}</span>
            <p className="product-detail-description">{product.description}</p>
            <div className="productDetail-priceDiscount-container">
              <span className="product-detail-price">
                {formatNumber(product.price)}
              </span>
              { product.discount > 0 && 
                <div >
                  <Tag
                    className="tag"
                  >
                    {product.discount} %
                  </Tag>
                </div>
              }
            </div>
            <div className="productDetail-quantity-container">
              <div className="product-detail-quantity-wrapper">
                  { quantity > 1 ? 
                  <div className="custom-input-number-button" onClick={decrement}>
                    <MinusOutlined style={{ cursor: 'pointer', fontSize: '14px'}}/> 
                  </div> : 
                  <div className="custom-input-number-button-stopOutline">
                    <MinusOutlined className="productDetail-stopOutline"/> 
                  </div>
                  }
                <InputNumber
                  min={1}
                  defaultValue={1}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  size="large"
                  className="custom-input-number"
                />
                <div className="custom-input-number-button" onClick={increment}>
                  <PlusOutlined style={{ cursor: quantity === product.stock ? 'no-drop' : 'pointer', fontSize: '14px'}}/>
                </div>
              </div>
                {quantity === product.stock && <p className="productDetail-stock-limit">Limite de stock</p>}
            </div>
            { isAutenticated ? (
              <span onClick={() => onClickProductInCart(product.productId, product.stock)} style={{ width: "300px", gap: "10px" }} className="Button-Explorar productDetail-add-cart">
                <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
              </span>
            ) : (
              <Link to='/ingreso' style={{ width: "300px", gap: "10px" }} className="Button-Explorar productDetail-add-cart">
                <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
              </Link>
            )}
          </div>
        </div>
    </div>
  );
};

export default ProductDetail;
