import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

const slides = [
  { src: '/images/wizard.jpg', alt: 'Locksmith Service 1' },
  { src: '/images/wixard.png', alt: 'Security Installation' },
// Fallback or additional slide
];

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


  const isPlaying = useSignal<boolean>(false);

  useVisibleTask$(() => {
    isPlaying.value = true;
  })

  return (
    <Carousel.Root class="carousel-root" gap={30}   autoPlayIntervalMs={3500}
    bind:autoplay={isPlaying}
    >
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