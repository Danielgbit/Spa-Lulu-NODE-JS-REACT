import CardServicesComponent from "./CardServices";

const CardsContainerComponent = (props) => {

    const { allServicesLimit } = props;

    return(
        <div className="container-div-wrapper-max-services-container">       
            <div className="container-section-services-max">
                <h1 className="title-section-services-cards">SERVICIOS DESTACADOS</h1>
                <div className="paragraph-container-services">
                    <img src="/img/elements/plastic-gradient-lens.jpg" />
                    <p>"Descubre la comodidad de reservar tu cita desde la comodidad de tu hogar. ¡Haz clic para reservar ahora!"</p>
                </div>
                <div className="wrapper-Cards-services-component-container">
                    <CardServicesComponent allServices={allServicesLimit} />
                </div>
            </div>
            <div className="section-button-send-services-container">
                <div className="button-services-wrapper">
                    <span>SERVICIOS</span>
                    <i className="fa-solid fa-angle-right"></i>       
                </div>
            </div>
        </div>
        


    )
};

export default CardsContainerComponent;