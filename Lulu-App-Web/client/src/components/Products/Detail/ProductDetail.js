import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/numberFormat";
import { InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";

const ProductDetail = ({ productDetail, images }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };




  return (
    <div id="product-detail-body">
        <div className="product-detail-container-max" >
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
            <span className="product-detail-price">
              {formatNumber(product.price)}
            </span>
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
                <PlusOutlined style={{ cursor: 'pointer', fontSize: '14px'}}/>
              </div>
            </div>
            <span
              style={{ width: "300px", gap: "10px" }}
              className="Button-Explorar productDetail-add-cart"
            >
              <i class="fa-solid fa-cart-plus"></i>
              Agregar al carrito
            </span>
          </div>
        </div>
    </div>
  );
};

export default ProductDetail;
