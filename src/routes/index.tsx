import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Steps from "~/components/widgets/Steps";
import { SITE } from "~/config.mjs";
import About from "~/components/widgets/About";
import Rarity from "~/components/widgets/Rarity";
import Hero from "~/components/widgets/Hero";
import FAQ from "~/components/widgets/FAQ";
import Collections from "~/components/widgets/Collections";
import Items from "~/components/widgets/Items";


export default component$(() => {
  return (
    <>
      <Hero/>
    
  
    <About
  highlight="About"
  title="What is KasKritterz?"
  subtitle="KasKritterz blends cuteness, storytelling, and hand-crafted digital art to create a fresh NFT experience that rewards holders and connects the Kaspa community."
  items={[]}
/>
      
<div class="w-full md:h-80 h-28 bg-[url('/images/mintbullz.jpg')] bg-no-repeat bg-cover md:bg-[length:100%_100%] border-b border-gray-300"></div>

   <Steps id="roadmap"  
       highlight="Roadmap"
      title="KasKritterz Roadmap"
      items={[]}/>

  <Collections
  id="collections"
  highlight="Collections"
  title="Explore Our Collections"
  items={[]}
  />
 
    
      

     

        <Items id="items"
      highlight="Items"
      title="Traits & Accessories"
     
      items={[]}/>
    
       <Rarity
       id="rarity"
      highlight="Rarity"
      title="Rarity Guide"
     
     
      items={[]}/>
      
   

        <FAQ
       id="faq"
      highlight="FAQs"
      title="Frequently Asked Questions"
     
     
      items={[]}/>


      
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};
