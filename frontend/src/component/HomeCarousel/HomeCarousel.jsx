import Carousel from 'react-bootstrap/Carousel';
import './HomeCarousel.css'
function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Little Woman</h3>
          <p>Little Women is a 2019 American coming-of-age period drama film written and directed by Greta Gerwig.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Love Untangled</h3>
          <p>Love Untangled is a 2025 Korean romantic comedy/drama about a teen who tries to win a heartthrob, but a new transfer student changes everything.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Wicked</h3>
          <p>
            Wicked, the untold story of the witches of Oz, stars Emmy, Grammy and Tony winning powerhouse Cynthia Erivo (Harriet, Broadway's The Color Purple) as Elphaba.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;