import { Tag } from 'antd';


const CardServices = (props) => {

    const { allServices, servicesLimit } = props;

    console.log(servicesLimit);


    if (allServices) {
        return(
            <>
            {allServices?.map((service) => (    
                <article key={service.serviceId} className="card-service-component-container-max">
                    <div key={service.serviceId} className="span-add-wrapper">
                        <span className="Comprar">Reservar</span>
                        <i class="fa-solid fa-circle-arrow-right"></i>
                    </div>
                    <span></span>
                    <span className="service-name-card-service">{service.serviceName}</span>
                    <p style={{ textTransform: 'uppercase', fontSize:'10px' }} className="paragraph-card-service">Duración aprox: {service.durationMinutes} Minutos</p>
                    <div className="img-service-container">
                            <img src={service.image} alt=""/>
                    </div>    
                </article>
            ))}
            </>
        );
    }else if (servicesLimit) {
        return(
            <>
            { servicesLimit.length === 0 || !servicesLimit ? ( <p>¡Estamos en mantenimiento!</p> ) : ( 
                servicesLimit?.map((service) => (    
                     <article key={service.serviceId} className="card-service-component-container-max">
                         <span className="service-name-card-service">{service.serviceName}</span>
                         <div className="paragraph-card-service-container">
                            <span className='service-limit-card-durarion'>Duración aprox: </span>
                            <Tag
                                color='violet'
                                className='service-limit-card-tag'
                            >
                                {service.durationMinutes} Min             
                            </Tag>
                            
                         </div>
                         <div className="service-card-description-container">
                            <p>{service.description}</p>
                         </div>
                         <div className="img-service-container">
                                 <img src={service.image} alt=""/>
                         </div>    
                     </article>
                 ))
            )}
            </>
        );
    }

};


export default CardServices;