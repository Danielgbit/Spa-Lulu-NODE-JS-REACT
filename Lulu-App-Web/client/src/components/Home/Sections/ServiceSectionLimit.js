import { Link } from "react-router-dom";
import CardServices from "../../Services/Cards/CardServices";


const ServiceSectionLimit = ({ servicesLimit  }) => {
    return(
        <div className="serviceSection-limit">
            <h1 className="serviceSection-limit-title">Servicios que ofrecemos</h1>
            <div className='serviceSection-limit-cards-container'>
                <CardServices servicesLimit={servicesLimit} />
            </div>
                <span className="Button-Explorar">
                    <i class="fa-brands fa-wpexplorer"></i>
                    Explorar
                </span>
        </div>
    )
};

export default ServiceSectionLimit;