import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .carousel-root {
      height: 100%;
      width: 100%;
      position: relative;
    }
    .carousel-slide {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .carousel-slide img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .carousel-buttons {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      display: flex;
      gap: 10px;
    }
    .carousel-conditional {
      height: 100%;
      width: 100%;
    }
  `);

  // Array of slide objects
  const slides = [
    { src: '/images/slide1.jpg', alt: 'Locksmith Service 1' },
    { src: '/images/slide2.jpg', alt: 'Security Installation' },
    { src: '/images/slide3.jpg', alt: 'Emergency Lockout Assistance' },
    { src: '/images/placeholder.png', alt: 'Placeholder Slide' }, // Fallback or additional slide
  ];

  return (
    <Carousel.Root class="carousel-root" gap={30}>
      <div class="carousel-buttons">
        <Carousel.Previous>Prev</Carousel.Previous>
        <Carousel.Next>Next</Carousel.Next>
      </div>
      <div class="carousel-conditional">
        {slides.map((slide, index) => (
          <Carousel.Slide key={index} class="carousel-slide">
            <img src={slide.src} alt={slide.alt} />
          </Carousel.Slide>
        ))}
      </div>
    </Carousel.Root>
  );
});