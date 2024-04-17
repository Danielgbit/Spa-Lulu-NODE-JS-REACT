import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ProductDetail from "./ProductDetail";
import { getProductDetail, getProductImages } from "../../../services/ProductService";



const ProductDetailContainer = () => {

    const { id } = useParams()
    const [ productDetail, setProductDetail ] = useState([]);
    const [ isLoadingDetail, setIsLoadingDetail ] = useState(true);
    const [ images, setImages ] = useState([]);




    const loadProductDetail = async () => {
        const response = await getProductDetail(id);
        if (response.status === 200) {
            setProductDetail(response.data.productDetail);
        };
        setIsLoadingDetail(false);
    };
    
    const loadImages = async () => {
        const res = await getProductImages(id);
        if(res?.status === 200) { setImages(res.data.images); };
    };

    useEffect(() => {
        loadProductDetail();
        loadImages();
    }, [id]);


    return (
        <ProductDetail
            productDetail={productDetail}
            isLoadingDetail={isLoadingDetail}
            images={images}
        />
    );

};

export default ProductDetailContainer;