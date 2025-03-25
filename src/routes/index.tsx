import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Hero from "~/components/widgets/Hero";
import Steps from "~/components/widgets/Steps";
import Stats from "~/components/widgets/Stats";






import { SITE } from "~/config.mjs";
import Services from "~/components/widgets/Services";

import Hero2 from "~/components/widgets/Hero2";
import Story from "~/components/widgets/Story";

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
      subtitle="In the realm of Ethereandor, where the blockchain skies shimmered with infinite possibility, there existed a legendary council known as the Six Kaslords. Inspired by the ancient tales of Middle-earth, these digital deities were born from a visionary NFT project, each token imbued with unique powers and lore. 
      Forged by the enigmatic creators at xAI, the Kaslords were not mere collectibles but guardians of a decentralized kingdom, their essence etched into the immutable ledger of the blockchain." 
      items={[]}/>
      <Services
      id="services"
  highlight="Classes"
  title="Character Classes"
  subtitle="Mint one of six legendary KasLord character types."
  items={[]}/>





      <Steps    highlight="Roadmap"
      title="Journey Of The KasLords"
      subtitle="In the realm of Ethereandor, where the blockchain skies shimmered with infinite possibility, there existed a legendary council known as the Six Kaslords. Inspired by the ancient tales of Middle-earth, these digital deities were born from a visionary NFT project, each token imbued with unique powers and lore. 
      Forged by the enigmatic creators at xAI, the Kaslords were not mere collectibles but guardians of a decentralized kingdom, their essence etched into the immutable ledger of the blockchain." 
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
      <Stats />
      
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
