import { component$ } from "@builder.io/qwik";
import IconBrandTailwind from "../icons/IconBrandTailwind";
import IconBrandGoogle from "../icons/IconBrandGoogle";
import { Card } from "../ui/Card";
import HeroCarousel from "./HeroCarousel";

export default component$(() => {
  return (
    <Card.Root class="">
      <HeroCarousel/>
    <section class="px-4 py-8 text-center">
      
            <div>
                       <h1 class="text-4.5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200 animate-hero-text">
                         <span class="text-secondary-800">KasLords</span> <br class="hidden lg:block" />Of The <span class="text-secondary-800">BlockDag</span> <br class="hidden lg:block" />{" "}
                       </h1>
                       <div class="max-w-3xl mx-auto lg:max-w-none">
                         <p class="text-xl text-muted mb-5 dark:text-slate-300 animate-hero-subtitle">
                         Own a piece of this legendary saga, forged in the fires of creativity and secured on the blockchain—join the Kaslords and claim your dominion today!
                         </p>
                         <div class="max-w-xs sm:max-w-md animate-hero-buttons m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-3 lg:justify-start lg:m-0 lg:max-w-7xl">
                           <div class="flex w-full sm:w-auto">
                             <a class="btn btn-primary sm:mb-0 w-full" href="tel:+16132188063">
                               <IconBrandTailwind class="mr-1" /> Mint KasLords
                             </a>
                           </div>
                           <div class="flex w-full sm:w-auto">
                             <a class="btn btn-secondary sm:mb-0 w-full" href="/contact">
                               <IconBrandGoogle class="mr-1" /> Join The Clan
                             </a>
                           </div>
                         </div>
                       </div>
                     </div>
    </section>
    </Card.Root>
  );
});