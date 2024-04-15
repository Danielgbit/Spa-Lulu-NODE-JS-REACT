import { useState } from "react";
import NotEmpty from "../../NotEmpty/NotEmpty";
import Search from "../../Search/Search";
import CardServices from "../Cards/CardServices";
import CategoryItemsProductContainer from "../Category/CategoryContainer";


const ServiceList = (props) => {

    const { servicesCategory } = props;


    if (servicesCategory.categoryServices && servicesCategory.categoryServices[0].serviceId === null) {
        return(
            <div className="articles-products-container-max" >
                <h1>SERVICIOS</h1>
                <CategoryItemsProductContainer/>
            <span className="articles-products-title">{servicesCategory.categoryName}</span>
            <div className="articles-products-container-cards">
            </div>
                <NotEmpty
                    image='/img/ilustrations/notEmpty/notEmptyProducts.svg'
                    message='No hay servicios disponibles en esta categoria'
                />
            </div>
        );
    };

    return(
        <>
        <div className="articles-products-container-max" >
            <h1>SERVICIOS</h1>
            <CategoryItemsProductContainer/>
            <span className="articles-products-title">{servicesCategory.categoryName}</span>
            <div className="articles-products-container-cards">
                    <CardServices allServices={servicesCategory.categoryServices}/>
            </div>
        </div>
        </>
    );
};

export default ServiceList;