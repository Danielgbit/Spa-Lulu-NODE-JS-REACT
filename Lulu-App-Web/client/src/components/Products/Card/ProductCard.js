import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Context/CartContext';
import NotEmpty from '../../NotEmpty/NotEmpty';
import { formatNumber } from "../../../utils/numberFormat";

const ProductCard = ({ products, productsCategoryDetail, productsLimit }) => {

    const { addProductInCart, loadCart, userId } = useContext(CartContext);
    const [ allProducts, setAllProducts ] = useState(null);
    const [ allProductsCategory, setAllProductsCategory] = useState(null);
    const [ allProductsLimit, setAllProductLimit] = useState(null);
    const [ images, setImages] = useState([]);


    useEffect(() => {
        setAllProducts(products?.allProducts);
    }, [products]);
    
    useEffect(() => {
        setAllProductsCategory(productsCategoryDetail?.categoryProducts);
    }, [productsCategoryDetail]);

    useEffect(() => {
        setAllProductLimit(productsLimit && productsLimit);
    }, [productsLimit]);



    const onClickProductInCart = async (productId, stock) => {
        if (userId?.length > 0 && productId?.toString.length > 0) {
            await addProductInCart(productId, stock);
            loadCart();
        };
    };

    if (allProducts) {
        return(
            <>
            { allProducts?.map((product) => {

                let discountTotal = 0
                if (product.discount > 0) {
                    const discountAmount = (product.price * product.discount) / 100;
                    discountTotal = Math.abs(discountAmount - product.price);
                }

                return(
                    <article key={product.productId} style={product?.stock === 0 ? { background: '#955693' } : null} className="container-card-product-max">
                        <div className="img-container-card-product" >
                            <Link to={`/product/${product.productId}/detail`} >
                                <img src={product.image} alt={`imagen de producto ${product.productId}`} />
                            </Link>
                        </div>
                        <span className="product-name-card-product" > {product.productName} </span>
                        <p className='product-card-description'>{product.description}</p>
                        { product.stock === 0 ? ( <p className='product-card-stock' ><i  class="fa-solid fa-temperature-empty"></i></p> ) : (
                            <p className='product-card-stock' >Stock: {product.stock}</p>
                        )}
                        { product.discount > 0 ? (
                            <span className='product-card-discount'>
                                <span>Descuento: {product.discount} %</span>
                            </span>
                        ) : (null)}
                        <div className="add-product-card-section-container">
                                { product.stock === 0 ? ( 
                                    <button disabled className="add-product-card-button">
                                        <span style={{ color: '#FFE8FE'}}>Agotado</span>
                                    </button>
                                ) : (
                                    <button onClick={() => onClickProductInCart(product.productId, product.stock)} className="add-product-card-button">
                                        <span>Agregar</span>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                )}
                                { product.discount > 0 ? (
                                    <div className='product-card-discountPrice-wrapper'>
                                        <span style={{ textDecoration: "line-through", fontWeight: '400', paddingRight: '5px', fontSize: '11px' }} className="price-product-card">{formatNumber(product.price)}</span>
                                        <span className="price-product-card" >{formatNumber(discountTotal)}</span>
                                    </div>
                                ) : (
                                    <p className="price-product-card">{formatNumber(product.price)}</p>
                                )}
                        </div>
                    </article>
                )})}
            </>
        )
    }else if (allProductsCategory) {
        
        return(
            <>
                {allProductsCategory && !allProductsCategory[0].productId ? ( <NotEmpty 
                    message={'No hay productos en esta categoria'}
                    image='/img/notEmpty/notFound.svg'
                    redirect='/products'
                    redirectMessage='Volver a productos'
                    colorBody='transparent'
                    heigthBody= '100%'
                /> ) : (
                    allProductsCategory?.map((product) => {

                    let discountTotal = 0
                    if (product.discount > 0) {
                        const discountAmount = (product.price * product.discount) / 100;
                        discountTotal = Math.abs(discountAmount - product.price);
                    }

                    return (
                        <article key={product.productId} style={product?.stock === 0 ? { background: '#955693' } : null} className="container-card-product-max">
                        <div className="img-container-card-product" >
                            <Link to={`/product/${product.productId}/detail`} ><img src={product.image} alt="image product" /></Link>
                        </div>
                        <span className="product-name-card-product" > {product.productName} </span>
                        <p className='product-card-description'>{product.description}</p>
                        { product.stock === 0 ? ( <p className='product-card-stock' ><i  class="fa-solid fa-temperature-empty"></i></p> ) : (
                            <p className='product-card-stock' >Stock: {product.stock}</p>
                        )}
                        { product.discount > 0 ? (
                            <span className='product-card-discount'>Descuento: {product.discount} %</span>
                        ) : (null)}
                        <div className="add-product-card-section-container">
                                { product.stock === 0 ? ( 
                                    <button disabled className="add-product-card-button">
                                        <span style={{ color: '#FFE8FE'}}>Agotado</span>
                                    </button>
                                ) : (
                                    <button onClick={() => onClickProductInCart(product.productId, product.stock)} className="add-product-card-button">
                                        <span>Agregar</span>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                )}
                                { product.discount > 0 ? (
                                    <div className='product-card-discountPrice-wrapper'>
                                        <span style={{ textDecoration: "line-through", fontWeight: '400', paddingRight: '5px' }} className="price-product-card">{formatNumber(product.price)}</span>
                                        <span className="price-product-card" >{formatNumber(discountTotal)}</span>
                                    </div>
                                ) : (
                                    <p className="price-product-card">{formatNumber(product.price)}</p>
                                )}
                        </div>
                    </article>
                    )}
                ))}
            </>
            )
    }else if (allProductsLimit) {
        return(
            <>
                {allProductsLimit?.map((product) => {

                let discountTotal = 0
                if (product.discount > 0) {
                    const discountAmount = (product.price * product.discount) / 100;
                    discountTotal = Math.abs(discountAmount - product.price);
                }

                    return (
                        <article key={product.productId} style={product?.stock === 0 ? { background: '#955693' } : null} className="container-card-product-max">
                        <div className="img-container-card-product" >
                            <Link to={`/product/${product.productId}/detail`} ><img src={product.image} alt="image product" /></Link>
                        </div>
                        <span className="product-name-card-product" > {product.productName} </span>
                        <p className='product-card-description'>{product.description}</p>
                        { product.stock === 0 ? ( <p className='product-card-stock' ><i class="fa-solid fa-temperature-empty"></i></p> ) : (
                            <p className='product-card-stock' >Stock: {product.stock}</p>
                        )}
                        { product.discount > 0 ? (
                            <span className='product-card-discount'>Descuento: {product.discount} %</span>
                        ) : (null)}
                        <div className="add-product-card-section-container">
                                { product.stock === 0 ? ( 
                                    <button disabled className="add-product-card-button">
                                        <span style={{ color: '#FFE8FE'}}>Agotado</span>
                                    </button>
                                ) : (
                                    <button onClick={() => onClickProductInCart(product.productId, product.stock)} className="add-product-card-button">
                                        <span>Agregar</span>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                )}
                                { product.discount > 0 ? (
                                    <div className='product-card-discountPrice-wrapper'>
                                        <span style={{ textDecoration: "line-through", fontWeight: '400', paddingRight: '5px' }} className="price-product-card">{formatNumber(product.price)}</span>
                                        <span className="price-product-card" >{formatNumber(discountTotal)}</span>
                                    </div>
                                ) : (
                                    <p className="price-product-card">{formatNumber(product.price)}</p>
                                )}
                        </div>
                    </article>
                    )
                })}
            </>
            )
    }else {
        return (
            <NotEmpty message={'No se encontro ningun producto'}/>
        )
    }
};


    

export default ProductCard;