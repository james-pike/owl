import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Card } from "../ui/Card";
import { LuTwitter, LuSend } from '@qwikest/icons/lucide';

// Importing Lucide icons

const teamMembers = [
  {
    name: "Aria Windwalker",
    role: "Creative Director",
    bio: "Leads the vision and creative strategy with a focus on storytelling and aesthetics.",
    image: "/images/team-aria.jpg",
    alt: "Aria Windwalker portrait",
    twitter: "https://twitter.com/ariawindwalker",
    telegram: "https://t.me/ariawindwalker",
  },
  {
    name: "Dorian Flame",
    role: "Lead Developer",
    bio: "Architects and develops robust systems with performance and scalability in mind.",
    image: "/images/team-dorian.jpg",
    alt: "Dorian Flame portrait",
    twitter: "https://twitter.com/dorianflame",
    telegram: "https://t.me/dorianflame",
  },
  {
    name: "Lyra Moonshadow",
    role: "UX Designer",
    bio: "Designs intuitive and accessible user experiences for modern interfaces.",
    image: "/images/team-lyra.jpg",
    alt: "Lyra Moonshadow portrait",
    twitter: "https://twitter.com/lyramoon",
    telegram: "https://t.me/lyramoon",
  },
  {
    name: "NFTCX",
    role: "Warden Of The Web",
    bio: "Guards the digital frontier with web wizardry and ux magic.",
    image: "/images/nftcx.jpg",
    alt: "Kael Storm portrait",
    twitter: "https://twitter.com/nftcx",
    telegram: "https://t.me/nftcx",
  },
];

export default component$(() => {
  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#team-grid');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });

  return (
    <div 
      id="team-grid"
      class="grid mx-auto max-w-screen-xl mt-2 mb-16 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      {teamMembers.map(({ name, role, bio, image, alt, twitter, telegram }, index) => (
        <div
          key={index}
          class={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 ${
            isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
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
              <p class="text-sm text-primary-600 dark:text-primary-400">{role}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{bio}</p>

              <div class="flex space-x-4">
                {twitter && (
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 dark:text-primary-400 hover:text-blue-500 transition-colors"
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
                    class="text-primary-600 dark:text-primary-400 hover:text-blue-500 transition-colors"
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
