const ArticleThreeHome = () => {
    return(
        <article className="article-three-container-max">
            <div className="article-three-img-container">
                <img src="/img/articles/article-3.jpg" alt="" />
            </div>
            <div className="article-three-container-info-wrapper">
                <h5>LULÚ</h5>
                <p>Lorem ipsum dolor sit amet consectetur. Eu eget etiam risus rhoncus id vitae mauris ornare. Faucibus nulla est ipsum molestie nec diam. Faucibus nulla est ipsum molestie nec diam. Faucibus nulla est ipsum molestie nec diam. Faucibus nulla est ipsum molestie nec diam. Faucibus nulla est ipsum molestie nec diam.</p>
                <div className="article-three-button-container-max-wrapper minWidth">
                    <div className="article-three-button-container">
                        <span>CONTACTO</span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
            </div>
            </div>
            <div className="article-three-button-container-max-wrapper maxWidth">
                <div className="article-three-button-container">
                    <span>CONTACTO</span>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </article>
    )
};

export default ArticleThreeHome;