import { component$ } from '@builder.io/qwik'
import { Carousel } from 'flowbite-qwik'

export default component$(() => {
  return (
    <Carousel pauseOnHover class="mb-2">
           <Carousel.Slide>
           <img class="object-cover h-full w-full" src="/images/wizard.jpg" alt="..." />
           </Carousel.Slide>

      <Carousel.Slide>
        <img class="object-cover h-full w-full" src="/images/wixard.png" alt="..." />
      </Carousel.Slide>
       
  
    

    
 
    </Carousel>
  )
})