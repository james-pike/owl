import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

const slides = [
  { src: '/images/wizard.jpg', alt: 'Locksmith Service 1', width: 800, height: 600 },
  { src: '/images/wixard.png', alt: 'Security Installation', width: 800, height: 600 },
  // Fallback or additional slide
];

export default component$(() => {
  useStyles$(`
    .carousel-root1 {
      width: 100%;
      height: 50vh; /* Keep viewport-based height for desktop */
      min-height: 300px; /* Ensure a minimum height */
      position: relative;
    }
    .carousel-slide1 {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .carousel-slide1 img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      aspect-ratio: 4/3; /* Adjust based on your images' aspect ratio */
    }
    .carousel-buttons1 {
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
    .carousel-button1 {
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
    .carousel-button1:hover {
      background: rgba(128, 128, 128, 1);
    }
    .carousel-button1 i {
      font-size: 24px;
    }
    .carousel-prev1 {
      margin-left: 10px;
    }
    .carousel-next1 {
      margin-right: 10px;
    }
      
   
    /* Responsive adjustments */
    @media (max-width: 640px) {
      .carousel-root1 {
        height: 250px; /* Fixed height on mobile to prevent CLS */
        min-height: 250px; /* Consistent height */
      }
      .carousel-button1 {
        width: 40px; /* Smaller buttons on mobile */
        height: 40px;
      }
      .carousel-button1 i {
        font-size: 20px; /* Smaller arrows on mobile */
      }
    }
  `);

  const isPlaying = useSignal<boolean>(false);

  useVisibleTask$(() => {
    isPlaying.value = true;
  });

  return (
    <Carousel.Root class="carousel-root1" gap={30} autoPlayIntervalMs={3500} bind:autoplay={isPlaying}>
      <div class="carousel-buttons1">
        <Carousel.Previous class="carousel-button1  carousel-prev1">
          <i class="fas fa-arrow-left" />
        </Carousel.Previous>
        <Carousel.Next class="carousel-button1 carousel-next1">
          <i class="fas fa-arrow-right" />
        </Carousel.Next>
      </div>
      <div class="carousel-conditional1 rounded-sm">
        {slides.map((slide, index) => (
          <Carousel.Slide key={index} class="carousel-slide1">
            <img
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
            />
          </Carousel.Slide>
        ))}
      </div>
    </Carousel.Root>
  );
});