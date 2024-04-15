const ServiceDetail = (props) => {

    const { serviceDetail } = props;

    return(
        <>
            <h1>DETALLE DE SERVICIO</h1>
            <div className="service-detail-container-max">
                    <div className="container-image-service-detail">
                        <img src={serviceDetail.image} alt=""/>
                    </div>
                <div className="service-detail-container-content">
                    <span className="service-detail-name">{serviceDetail.serviceName}</span>
                    <p className="service-detail-description">{serviceDetail.description}</p>
                    <span className="service-detail-price">${serviceDetail.price}</span>
{/*                     <div className="service-detail-quantity-wrapper">
                        <button>+</button>
                        <span>Cantidad</span>
                        <button>-</button>
                    </div> */}
                    <div className="service-detail-quantity-wrapper" style={{ padding: '10px' }}>
                        <span style={{ fontWeight: '800px' }}>Tiempo aprox:</span>
                        <span style={{ fontWeight: '800px' }}>{serviceDetail.durationMinutes} minutos</span>
                    </div>
                    <div className="service-detail-add-reserve-wrapper">
                        <i class="fa-solid fa-check"></i>
                        <button className="service-detail-add-reserve" >RESERVAR</button>     
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;