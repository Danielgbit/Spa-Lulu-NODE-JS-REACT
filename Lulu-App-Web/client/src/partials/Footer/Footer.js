import { Link } from "react-router-dom";

const FooterComponent = () => {
    return(
        <div className="footer-container-div-max">
            <article className="footer-container-article">
                <div className="footer-container-title">
                    <h6>LULÚ</h6>
                </div>
                <div className="footer-container-sections-info">
                    <section className="footer-container-info-childrens">
                        <span className="footer-titles-info" >Secciones</span>
                        <ul className="footer-wrapper-sections-info-1">
                            <li>PRODUCTOS</li>
                            <li>SERVICIOS</li>
                            <li>INICIO DE SESION</li>
                            <li>REDES SOCIALES</li>
                        </ul>
                    </section>
                    <section className="footer-container-info-childrens">
                        <span className="footer-titles-info" >Contacto</span>
                        <ul className="footer-wrapper-contact-info-2">
                            <li>
                                <i class="fa-solid fa-at"></i>
                                <span className="footer-contact-text">centrodeesteticalulu@hotmail.com</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-phone"></i>
                                <span>2882168</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-map-pin"></i>
                                <span className="footer-contact-text">Calle-78 C Sur #46-101</span>
                            </li>
                        </ul>
                    </section>
 {/*                    <section className="footer-container-send-subscribe" >
                        <span>Suscribete</span>
                        <div className="footer-container-input-suscribe">
                            <input type="text" placeholder="Ingresa tu email" />
                            <i class="fa-solid fa-right-long"></i>    
                        </div>
                    </section> */}
                </div>
                <div className="footer-container-social-redes">
                    <i class="fa-brands fa-whatsapp"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <Link to={'/admin/login'}>
                        <i class="fa-solid fa-user-tie"></i>
                    </Link>
                </div>
            </article>
            <p className="footer-copyright">&copy; 2023 LULU. Todos los derechos reservados.</p>
        </div>
    );
};

export default FooterComponent;