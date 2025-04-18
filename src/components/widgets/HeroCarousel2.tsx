import { component$ } from '@builder.io/qwik'
import { Carousel } from 'flowbite-qwik'

export default component$(() => {
  return (
    <Carousel pauseOnHover slideInterval={3500} class="mb-2">
      
           <Carousel.Slide>
           <img class="object-cover h-full w-full" src="/images/wizard1.png" alt="..." />
           </Carousel.Slide>

      <Carousel.Slide>
        <img class="object-cover h-full w-full" src="/images/elf1.jpg" alt="..." width={902} height={902}/>
      </Carousel.Slide>

      <Carousel.Slide>
        <img class="object-cover h-full w-full" src="/images/warrior1.png" alt="..." width={902} height={902}/>
      </Carousel.Slide>

      <Carousel.Slide>
        <img class="object-cover h-full w-full" src="/images/darklord1.png" alt="..." width={902} height={902}/>
      </Carousel.Slide>
       

      <Carousel.Slide>
        <img class="object-cover h-full w-full" src="/images/orc1.png" alt="..." width={902} height={902}/>
      </Carousel.Slide>
       

   
       

       


      <Carousel.Slide>
  <video
    class="h-full w-full object-cover"
    src="/images/dragon.mp4"
    autoplay
    loop
    muted
    playsInline
  />
</Carousel.Slide>
 
    </Carousel>
  )
})