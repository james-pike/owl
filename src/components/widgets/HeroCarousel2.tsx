import { component$ } from '@builder.io/qwik'
import { Carousel } from 'flowbite-qwik'

export default component$(() => {
  return (
    <Carousel pauseOnHover class="mb-2">
           <Carousel.Slide>
           <img class="object-cover h-full w-full" src="/images/wizard1.jpg" alt="..." />
           </Carousel.Slide>

      <Carousel.Slide>
        <img class="object-cover h-full w-full" src="/images/elf1.jpg" alt="..." width={902} height={902}/>
      </Carousel.Slide>
       
  
    

    
 
    </Carousel>
  )
})