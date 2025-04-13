import { component$ } from "@builder.io/qwik";
import { Card } from "../ui/Card";

const services = [
  {
    title: "Wizard Lord",
    description: "A mysterious sorcerer who channels ancient Kaspa energy to maintain balance—or disrupt it.",
    details: "Regain access to your property quickly with our professional lockout solutions.",
    image: "/images/wizard.jpg",
    alt: "Emergency Lockout Assistance",
    
  },
  {
    title: "Dark Lord",
    description: "A tyrant born of shadow, wielding corrupted Kaspa to bend the realm to his will.",
    details: "Get spare keys for your home, office, or vehicle with accuracy and efficiency.",
    image: "/images/darklord.jpg",
    alt: "Key Duplication & Replacement",
    
  },
  {
    title: "Elf Lord",
    description: "A radiant forest goddess whose beauty rivals starlight, yet her arrows strike with divine precision.",
    details: "We install and fix all types of locks to keep your property secure.",
    image: "/images/elf.jpg",
    alt: "Lock Installation & Repair",
   
  },
  {
    title: "Orc Lord",
    description: "A savage warlord driven by fury and ambition, feared for both brawn and cunning.",
    details: "We install high-tech security solutions for homes and businesses.",
    image: "/images/orc.jpg",
    alt: "Smart Lock & Security Systems",
   
  },
  {
    title: "Warrior Lord",
    description: "A wandering warrior seeking redemption with a rune-forged blade and a haunted past.",
    details: "We provide expert automotive locksmith solutions, including key fob replacement.",
    image: "/images/warrior.jpg",
    alt: "Automotive Locksmith Services",
   
  },
  {
    title: "Dragon Lord",
    description: "A molten-scaled dragon born in fire, untamed by gods or kings.",
    details: "We install, repair, and unlock safes while maintaining their integrity.",
    image: "/images/dragon.jpg",
    alt: "Safe Opening & Installation",
   
  },
];

export default component$(() => {
  return (
    <div 
      id="services-grid"
      class="grid mx-auto max-w-screen-xl mt-2 mb-2 md:mb-16 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {services.map(({ title, description, image, alt }, index) => (
        <div
          key={index}
          class="group relative overflow-hidden rounded-lg shadow-md"
        >
          <Card.Content class="p-1">
            <div class="relative">
              <img
                width={700}
                height={350}
                src={image}
                alt={alt}
                loading="eager"
                class="w-full h-full object-cover rounded-sm transition-transform bg-primary-50 duration-300"
              />
            </div>
            <div class="px-4 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          </Card.Content>
        </div>
      ))}
    </div>
  );
});