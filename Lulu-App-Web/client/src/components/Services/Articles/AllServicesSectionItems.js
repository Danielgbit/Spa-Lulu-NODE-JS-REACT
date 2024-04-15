import CardServicesComponent from "../Cards/CardServices";

const AllServicesSectionItems = (props) => {

    const { allServices } = props;

    return(
        <div className="articles-services-container-max" >
            <span className="articles-services-title">TRATAMIENTOS</span>
            <div className="articles-services-container-cards">
                <CardServicesComponent allServices={allServices} />
            </div>
        </div>
    );
};


export default AllServicesSectionItems;