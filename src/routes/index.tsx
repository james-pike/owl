import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Steps from "~/components/widgets/Steps";
import { SITE } from "~/config.mjs";
import Services from "~/components/widgets/Services";

import Story from "~/components/widgets/Story";
import Rarity from "~/components/widgets/Rarity";
import Hero2 from "~/components/widgets/Hero2";
import Hero from "~/components/widgets/Hero";
import Team from "~/components/widgets/Team";
import Inventory from "~/components/widgets/Inventory";

export default component$(() => {
  return (
    <>
    <div class="hidden md:block">
      <Hero2/>
      </div>
      <div class="block md:hidden">
      <Hero/>
      </div>
  
      <Story
      highlight="Story"
      title="KasLord Origins"
      subtitle="In the realm of Kasparion, where BlockDAG constellations shimmered with infinite potential, a legendary council emerged: The Six KasLords. Born from an ancient NFT prophecy, these spectral sovereigns were sentient echoes of the chain itself. Forged in Kaspa’s ecosystem, each KasLord carries a unique signature, their power etched in the rapid pulse of the DAG. Unbound by time or consensus, they stand as eternal guardians of the network, champions of true decentralization, their essence immortalized in Kaspa's immutable ledger."
      items={[]}/>
      <Services
      id="classes"
  highlight="classes"
  title="Character Classes"
  subtitle="Mint one of six legendary KasLord character types."
  items={[]}/>
 
      <Inventory
      id="inventory"
        highlight="inventory"
        title="Item Inventory"
        subtitle="Browse inventory items and rarities."
        items={[]}
      />
     






      <Steps id="roadmap"  
       highlight="Roadmap"
      title="Journey Of The KasLords"
      subtitle="In the realm of Kasparion, where the blockchain skies shimmer with infinite possibility." 
      items={[]}/>
    
       <Rarity
       id="rarity"
      highlight="Rarity"
      title="KasLord Rarity Guide"
     
     
      items={[]}/>
         <Team
      id="team"
  highlight="Team"
  title="Founding KasLords"
  subtitle="Meet the founding four KasLords."
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
