import { component$ } from "@builder.io/qwik";
import { Card } from "../ui/Card";

const innerRealm = [
  {
    name: "Crypto_Dutchmen",
    role: "Founding Realm Member",
    image: "/images/dutchman.jpg",
    alt: "CryptoDutchman portrait",
  },
  {
    name: "Kaspa Queen",
    role: "First Queen of the Realm",
    image: "/images/queen.jpg",
    alt: "Kaspa Queen portrait",
  },
  {
    name: "bc1q",
    role: "Realm Legendary",
    image: "/images/dragon.mp4",
    alt: "bc portrait",
  },
];

export default component$(() => {
  return (
    <div
      id="team-grid"
      class="grid mx-auto max-w-screen-xl mt-2 md:mb-12 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
    >
      {innerRealm.map(({ name, role, image, alt }, index) => (
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
            <div class="px-4 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
              <p class="text-sm text-secondary-700 dark:text-secondary-600">{role}</p>
            </div>
          </Card.Content>
        </div>
      ))}
    </div>
  );
});