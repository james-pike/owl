import { component$ } from "@builder.io/qwik";
import { Card } from "../ui/Card";

const innerRealm = [
  {
    name: "Crypto_Dutchmen",
    role: "Founding Realm Member",
    image: "/images/dutchman.jpg",
    alt: "CryptoDutchman portrait",
    badge: null,
  },
  {
    name: "Kaspa Queen",
    role: "Queen of the Realm",
    image: "/images/queen.jpg",
    alt: "Kaspa Queen portrait",
    badge: null,
  },
  {
    name: "bc1q",
    role: "Realm Legendary",
    image: "/images/dragon.mp4",
    alt: "bc portrait",
    badge: "/images/dragonmaster.webp",
    badgeText: "Dragon Master", // Added badgeText
  },
  {
    name: "Andrew",
    role: "Realm Commander",
    image: "/images/andrew.png",
    alt: "Andrew portrait",
    badge: null,
  },
  {
    name: "Bob",
    role: "Realm Master Wizard",
    image: "/images/Bob.jpg",
    alt: "Bob portrait",
    badge: "/images/ironwill.png",
    badgeText: "Iron Will Crest", // Added badgeText
  },
  {
    name: "Bellroc𐤊",
    role: "Realm Zoolander",
    image: "/images/belroc.png",
    alt: "Belroc portrait",
 // Added badgeText
  },
  {
    name: "Jeff",
    role: "Realm Admiral",
    image: "/images/admiral.jpg",
    alt: " portrait",
// Added badgeText
  },
  {
    name: "Damian Z",
    role: "Realm Dragon Rider",
    image: "/images/damian.jpg",
    alt: "Damian portrait",
 
  },
 

  {
    name: "JP",
    role: "Realm Legendary",
    image: "/images/dl.png",
    alt: "JP portrait",
    // badge: "/images/ironwill.png",
    // badgeText: "Iron Will Crest", // Added badgeText
  },
];

export default component$(() => {
  return (
    <div
      id="team-grid"
      class="grid mx-auto max-w-screen-xl mt-2 md:mb-12 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5"
    >
      {innerRealm.map(({ name, role, image, alt, badge, badgeText }, index) => (
        <div
          key={index}
          class="group relative overflow-hidden rounded-lg shadow-md"
        >
          <Card.Content class="p-1">
            <div class="relative aspect-[2/2.2]">
              {image.endsWith(".mp4") ? (
                <video
                  width={500}
                  height={600}
                  src={image}
                  autoplay
                  loop
                  muted
                  playsInline
                  class="w-full h-full object-cover rounded-sm transition-transform bg-primary-50 duration-300"
                />
              ) : (
                <img
                  width={500}
                  height={600}
                  src={image}
                  alt={alt}
                  loading="eager"
                  class="w-full h-full object-cover rounded-sm transition-transform bg-primary-50 duration-300"
                />
              )}
            </div>
            <div class="px-4 py-3 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
              <div class="flex flex-col">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p class="text-sm text-secondary-700 dark:text-secondary-600">{role}</p>
              </div>
              {badge && (
                <div class="relative group">
                  <img
                    src={badge}
                    alt={`${name} badge`}
                    class="w-12 h-12 object-contain"
                  />
                  {/* Dynamic tooltip based on badgeText */}
                  <div
                    class="absolute right-0 bottom-full mb-2 px-3 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md transition-opacity duration-200 whitespace-nowrap opacity-0 group-hover:opacity-100 z-10"
                  >
                    {badgeText}
                  </div>
                </div>
              )}
            </div>
          </Card.Content>
        </div>
      ))}
    </div>
  );
});