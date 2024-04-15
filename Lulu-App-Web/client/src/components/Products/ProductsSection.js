import React, { useEffect, useState } from 'react';
import ProductCard from "./Card/ProductCard";

const ProductsSection = ({ products, productsCategoryDetail }) => {

    return(
        <>
        <div className="articles-products-container-max" >
            <div className="articles-products-container-cards">
                <ProductCard products={products} productsCategoryDetail={productsCategoryDetail}/>
            </div>
        </div>
        </>
    );
};

export default ProductsSection;