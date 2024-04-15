import Carousel from 'react-bootstrap/Carousel';

const Carrousel = () => {
  return (
    <div className='carrousel-container-div'>   
    <Carousel>
      <Carousel.Item>
      <img className='carrousel-imgs' src="/img/carrousel/carrousel-1.jpg" alt=""/>
        <Carousel.Caption>
          <h3>Un lugar para disfrutar</h3>
          <p>Relajate en nuestra zona de spa.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='carrousel-imgs' src="/img/carrousel/carrousel-2.jpg" alt=""/>
        <Carousel.Caption>
          <h3>Productos que embellecen</h3>
          <p>Contamos con los mejores Productos del mercado.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='carrousel-imgs' src="/img/carrousel/carrousel-3.jpg" alt=""/>
        <Carousel.Caption>
          <h3>Spa relajante</h3>
          <p>
            Contamos con zona de masajes para que te regales un momento de calma.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Carrousel;