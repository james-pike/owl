import { component$ } from "@builder.io/qwik";
import { Card } from "../ui/Card";
import { LuTwitter, LuSend } from '@qwikest/icons/lucide';

const teamMembers = [
  {
    name: "CryptoNinja",
    role: "Flamebearer of First Spark",
    bio: "Originator of the KasLords prophecy, guardian of the Guilded Gate, and bearer of vision and vigilance.",
    image: "/images/ninja.jpg",
    alt: "Aria Windwalker portrait",
    twitter: "https://twitter.com/cninja75788",
    telegram: "https://t.me/ariawindwalker",
  },
  {
    name: "zooJersey",
    role: "Forger of Aetheric Realms",
    bio: "Master of rune and logic, engineer of scared form, and crafter of visual soul through enchanted design.",
    image: "/images/zoo.jpg",
    alt: "Lyra Moonshadow portrait",
    twitter: "https://x.com/njFloater",
    telegram: "https://t.me/zoojersey",
  },
  {
    name: "NolaGirl",
    role: "Sentinel of the Silent Star",
    bio: "Quillwarden of the realm, vessel of insight, keeper of the scrolls, and compass to the Council’s course.",
    image: "/images/nola.jpg",
    alt: "Dorian Flame portrait",
    twitter: "https://twitter.com/nolagirl_73",
    telegram: "https://t.me/nolagirl73",
  },

  {
    name: "NFTCX",
    role: "Warden Of The Web",
    bio: "Architect of the digital frontier with web wizardry and ux magic.",
    image: "/images/nftcx.jpg",
    alt: "Kael Storm portrait",
    twitter: "https://twitter.com/nftcx_",
    telegram: "https://t.me/nft_cx",
  },
];

export default component$(() => {
  return (
    <div 
      id="team-grid"
      class="grid mx-auto max-w-screen-xl mt-2 md:mb-12 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      {teamMembers.map(({ name, role, bio, image, alt, twitter, telegram }, index) => (
        <div
          key={index}
          class="group relative overflow-hidden rounded-lg shadow-md"
        >
          <Card.Content class="p-1">
            <div class="relative aspect-[2/2.2]">
              <img
                width={500}
                height={600}
                src={image}
                alt={alt}
                loading="eager"
                class="w-full h-full object-cover rounded-sm transition-transform bg-primary-50 duration-300"
              />
            </div>
            <div class="px-4 py-3 bg-gray-100 dark:bg-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
              <p class="text-sm text-secondary-700 dark:text-secondary-600">{role}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{bio}</p>

              <div class="flex space-x-4">
                {twitter && (
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 dark:text-secondary-700 hover:text-secondary-600 transition-colors"
                    aria-label={`${name} on Twitter`}
                  >
                    <LuTwitter class="w-5 h-5" />
                  </a>
                )}
                {telegram && (
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 dark:text-secondary-700 hover:text-secondary-600 transition-colors"
                    aria-label={`${name} on Telegram`}
                  >
                    <LuSend class="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </Card.Content>
        </div>
      ))}
    </div>
  );
});