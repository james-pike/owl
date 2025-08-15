import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Steps from "~/components/widgets/Steps";
import { SITE } from "~/config.mjs";
import Services from "~/components/widgets/Services";
import About from "~/components/widgets/About";
import Rarity from "~/components/widgets/Rarity";
import Hero2 from "~/components/widgets/Hero2";
import FAQ from "~/components/widgets/FAQ";


export default component$(() => {
  return (
    <>
    <div class="">
      <Hero2/>
      </div>
    
  
    <About
  highlight="About"
  title="WHAT IS KASKRITTERZ?"
  subtitle="KasKritterz is a fun and collectible NFT series built on the Kaspa blockchain. It started with 250 hand-crafted Mice, each one unique, full of character, and ready to explore a world where Kaspa has already won. But this is just the beginning…"
  items={[]}
/>
      <Services
      id="classes"
  highlight="classes"
  title="Character Classes"
  subtitle="Mint one of six legendary KasLord character types."
  items={[]}/>
 
      {/* <Inventory
      id="inventory"
        highlight="inventory"
        title="Item Inventory"
        // subtitle="Browse inventory items and rarities."
        items={[]}
      /> */}

      <Steps id="roadmap"  
       highlight="Roadmap"
      title="Journey Of The KasLords"
      subtitle="In the realm of Kasparion, where the blockchain skies shimmer with infinite possibility." 
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
