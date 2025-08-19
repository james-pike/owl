import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Steps from "~/components/widgets/Steps";
import { SITE } from "~/config.mjs";
import About from "~/components/widgets/About";
import Rarity from "~/components/widgets/Rarity";
import Hero from "~/components/widgets/Hero";
import FAQ from "~/components/widgets/FAQ";
import Collections from "~/components/widgets/Collections";
import Services from "~/components/widgets/Services";
import Items from "~/components/widgets/Items";


export default component$(() => {
  return (
    <>
      <Hero/>
    
  
    <About
  highlight="Story"
  title="What is KasKritterz?"
  subtitle="KasKritterz is a fun and collectible NFT series built on the Kaspa blockchain. It started with 250 hand-crafted Mice, each one unique, full of character, and ready to explore a world where Kaspa has already won. But this is just the beginning…"
  items={[]}
/>
      <Services
      id="about"
  highlight="About Us"
  title="What We Do"
  subtitle="Mint one of six legendary KasLord character types."
  items={[]}/>

  <Collections
  id="collections"
  highlight="Collections"
  title="Explore Our Collections"
  subtitle="Discover the unique collections of KasKritterz, each with its own story and charm."
  items={[]}
  />
 
      <Items id="rarity"
      highlight="Items"
      title="KasKritterz Traits"
     
     
      items={[]}/>
   
      

      <Steps id="roadmap"  
       highlight="Roadmap"
      title="KasKritterz Roadmap"
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
