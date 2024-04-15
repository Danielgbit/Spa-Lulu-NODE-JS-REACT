import { Link } from "react-router-dom";

const ArticleTwoHome = () => {
    return(
        <article className="article-two-container-max">
            <div className="article-two-img-container">
                <img src="/img/articles/article-1.jpg" alt="" />
            </div>
            <div className="article-two-container-info-wrapper">
                <h4>RESERVA Y COMPRA EN LINEA</h4>
                <p>"Entra en un mundo de belleza personalizada al iniciar sesión con nosotros. Te invitamos a disfrutar de una experiencia única y adaptada a tus necesidades. Desde la comodidad de tu hogar, podrás reservar tu cita preferida con nuestros talentosos estilistas, asegurándote de recibir la atención que te mereces.</p>
                <Link to={'/ingreso'} className="article-two-button-container">
                    <span>INGRESA</span>
                    <i className="fa-solid fa-chevron-right"></i>
                </Link>
            </div>
        </article>
    )
};

export default ArticleTwoHome;