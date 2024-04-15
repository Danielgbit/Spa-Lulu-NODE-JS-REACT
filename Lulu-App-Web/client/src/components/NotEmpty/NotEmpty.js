import { Link } from "react-router-dom";

const NotEmpty = ({ image, message, redirect, redirectMessage, colorBody, heigthBody }) => {


    return(
            <div className="notEmpty-body" style={{height: heigthBody ? heigthBody : '', backgroundColor: colorBody ? colorBody : ''  }}>
                <div className="notEmpty-container-info">
                    <div className="notEmpty-info-image">
                        <img src={image} alt=""/>
                    </div>
                    <div className="notEmpty-info-paragraph-wrapper">
                        <p className="notEmpty-info-paragraph">{message}</p>
                        <Link to={redirect}>{redirectMessage}</Link>
                    </div>
                </div>
            </div>
    );
};


export default NotEmpty;