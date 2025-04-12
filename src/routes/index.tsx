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
      title="Story Of The KasLords"
      subtitle="In the realm of Kaspa, where blockDAG constellations pulsed with boundless potential, a legendary council rose from the depths of decentralization: The Six Kaslords. Born of an ancient NFT prophecy and inspired by forgotten lore, these spectral sovereigns were not mere tokens—but sentient echoes of the chain itself. Forged within the zero-confirmation flow of Kaspa, and summoned by the arcane minds at xAI, each Kaslord bore a unique signature, their power inscribed forever in the rapid cadence of the DAG. Neither bound by time nor consensus, they stand eternal—guardians of the network, defenders of true decentralization. 
      Forged by the enigmatic creators at xAI, the Kaslords were not mere collectibles but guardians of a decentralized kingdom, their essence etched into the immutable ledger of the blockchain." 
      items={[]}/>
      <Services
      id="classes"
  highlight="classes"
  title="Character Classes"
  subtitle="Mint one of six legendary KasLord character types."
  items={[]}/>

{/* <Inventory
      id="inventory"
  highlight="Inventory"
  title="Inventory Items"
  subtitle="Mint one of six legendary KasLord character types."
  items={[]}/> */}





      <Steps id="roadmap"  
       highlight="Roadmap"
      title="Journey Of The KasLords"
      subtitle="In the realm of Ethereandor, where the blockchain skies shimmered with infinite possibility." 
      items={[]}/>
    {/* <FAQs
   
      title="Frequently Asked Questions"
      subtitle="Duis turpis dui, fringilla mattis sem nec, fringilla euismod neque."
      highlight="FAQs"
      items={[
        {
          icon:IconArrowDownRight,
          title: "Do you offer emergency locksmith services?",
          description:
            "Yes! We provide 24/7 emergency lockout assistance for homes, businesses, and vehicles.",
        },
        {
          icon:IconArrowDownRight,
          title: "Can you replace lost or broken keys?",
          description:
            "Absolutely! We offer key duplication, cutting, and replacement services for all types of locks.",
        },
        {
          icon:IconArrowDownRight,
          title: "Do you install smart locks and security systems?",
          description:
            "Yes, we specialize in smart lock installation and advanced security systems for added protection.",
        },
        {
          icon:IconArrowDownRight,
          title: "Can you repair or replace damaged locks?",
          description:
            "Of course! We repair, rekey, and replace locks to enhance security and restore functionality.",
        },
        {
          icon:IconArrowDownRight,
          title: "Do you provide car key programming and replacement?",
          description:
            "Yes! We offer car key programming, key fob replacement, and ignition repair for most vehicle models.",
        },
        {
          icon:IconArrowDownRight,
          title: "Can you open safes and vaults?",
          description:
            "Yes, we offer professional safe opening and installation services while ensuring your valuables remain secure.",
        },
      ]}
    /> */}
       <Rarity
       id="rarity"
      highlight="Rarity"
      title="KasLord Rarity Guide"
      subtitle="In the realm of Ethereandor, where the blockchain skies shimmered with infinite possibility. "
     
      items={[]}/>
         <Team
      id="team"
  highlight="Team"
  title="Founding KasLords"
  subtitle="Meet the founding four."
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
