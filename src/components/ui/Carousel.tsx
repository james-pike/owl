import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

const slides = [

  { src: '/images/wizard1.png', alt: 'Wizard', type: 'image' },
  { src: '/images/elf1.jpg', alt: 'Elf', type: 'image' },
  { src: '/images/dragon.mp4', alt: 'Dragon', type: 'video' },

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
    .carousel-slide img,
    .carousel-slide video {
      height: 100%;
      width: 100%;
      object-fit: cover; /* or use object-fit: contain if distortion occurs */
    }
    .carousel-buttons {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
    }
    .carousel-button {
      pointer-events: auto;
      width: 50px;
      height: 50px;
      background: rgba(128, 128, 128, 0.7);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.3s ease;
    }
    .carousel-button:hover {
      background: rgba(128, 128, 128, 1);
    }
    .carousel-button i {
      font-size: 24px;
    }
    .carousel-prev {
      margin-left: 10px;
    }
    .carousel-next {
      margin-right: 10px;
    }
    .carousel-conditional {
      height: 100%;
      width: 100%;
    }
  `);

  const isPlaying = useSignal<boolean>(false);

  useVisibleTask$(() => {
    isPlaying.value = true;
  });

  return (
    <Carousel.Root class="carousel-root" gap={30} autoPlayIntervalMs={4000} bind:autoplay={isPlaying}>
      <div class="carousel-buttons">
        <Carousel.Previous class="carousel-button carousel-prev">
          <i class="fas fa-arrow-left" />
        </Carousel.Previous>
        <Carousel.Next class="carousel-button carousel-next">
          <i class="fas fa-arrow-right" />
        </Carousel.Next>
      </div>
      <div class="carousel-conditional">
        {slides.map((slide, index) => (
          <Carousel.Slide key={index} class="carousel-slide">
            {slide.type === 'video' ? (
              <video
                src={slide.src}
                autoplay
                loop
                muted
                playsInline
              />
            ) : (
              <img src={slide.src} alt={slide.alt} loading="eager" />
            )}
          </Carousel.Slide>
        ))}
      </div>
    </Carousel.Root>
  );
});