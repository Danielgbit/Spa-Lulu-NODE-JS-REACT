import ArticleOneHome from "../../components/Home/Articles/ArticleOneHome";
import ArticleTwoHome from "../../components/Home/Articles/ArticleTwoHome";
import ArticleThreeHome from "../../components/Home/Articles/ArticleThreeHome";
import Carrousel from "../../components/Home/Carrousel/CarrouselComponent";
import ProductsSectionLimit from "../../components/Home/Sections/ProductSectionLimit";
import Footer from "../../partials/Footer/Footer";
import { Spinner } from "@chakra-ui/react";
import ServiceSectionLimit from "../../components/Home/Sections/ServiceSectionLimit";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { ToastContainer, toast } from 'react-toastify';

const Home = ({ productsLimit, isLoadingProducts, servicesLimit, isLoadingServices }) => {

    const { 
        messageToast, 
        setMessageToast, 
        setMessageLogoutToast, 
        messageLogoutToast,
    } = useContext(UserContext);


    useEffect(() => {
        if (messageToast?.length > 0) {
            toast.success(messageToast);
            setMessageToast('');
        };
    }, [messageToast]);

    useEffect(() => {
        if (messageLogoutToast?.length > 0) {
            toast.success(messageLogoutToast);
            setMessageLogoutToast('');
        };
    }, [messageLogoutToast]);


    return(
        <div id="body-home">
            <ToastContainer className='toast-container-style'/>
            <Carrousel/>
            <br/>
            <div className="home-render-section-productsLimit">
                { isLoadingProducts ? ( <Spinner/> ) : ( 
                    <ProductsSectionLimit productsLimit={productsLimit}/>
                )}
            </div>
            <br/>
            <ArticleOneHome/>
            <br/>
            <br/>
            <div>
                {isLoadingServices ? ( <Spinner/> ) : ( 
                    <ServiceSectionLimit
                        servicesLimit={servicesLimit}
                    />
                )}
            </div>
            <br/>
            <ArticleTwoHome/>
            <br/>
            <ArticleThreeHome/>
            <br/>
            <Footer/>
        </div>
    )
};

export default Home;