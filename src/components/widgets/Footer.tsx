import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuTwitter, LuSend } from '@qwikest/icons/lucide';

export default component$(() => {
  const links = [
    {
      title: "About",
      items: [
        { title: "Story", href: "#about" },
        { title: "What We Do", href: "#services" },
        { title: "Roadmap", href: "#roadmap" },
        { title: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Rarity Guide", href: "#rarity" },
        { title: "Collections", href: "#collections" },

        { title: "KaspaCom", href: "https://www.kaspa.com/nft/collections/KasKritter" },
        { title: "KRCscan", href: "https://krcscan.io/nft/kaskritter" },
      ],
    },
  ];

  const social = [
    { label: "Twitter", icon: LuTwitter, href: "https://x.com/KasKritterz" },
    { label: "Telegram", icon: LuSend, href: "https://t.me/KasKritterzOfficial" },
  ];

  return (
    <footer class="bg-[url('/images/background.jpg')] bg-cover bg-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
          <div class="col-span-12 lg:col-span-5 pr-4">
            <div class="flex flex-col">
              <div class="flex items-center justify-between mb-2 md:mb-2">
                <Link class="inline-block font-bold text-xl text-white" href="/">
                  KasKritterz
                </Link>
            
              </div>
              <div class="text-sm text-gray-200 mb-4 dark:text-gray-400">
                A fun and collectible NFT series built on the Kaspa blockchain. KasKritterz started with 250
                hand-crafted Mice, each one unique, full of character, and ready to explore a world where Kaspa
                has already won.
              </div>
              <div class="flex gap-2">
                <a
                  href="https://www.kaspa.com/nft/collections/KasKritter"
                  class="px-4 py-2 btn-primary text-white font-semibold rounded-md transition-colors"
                >
                  Mint Now
                </a>
                <a
                  href="https://t.me/KasKritterzOfficial"
                  class="btn-secondary px-4 py-2 text-white font-semibold rounded-md transition-colors"
                >
                  Join Telegram
                </a>
              </div>
            </div>
          </div>

          {links.map(({ title, items }, index) => (
            <div key={index} class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="text-white dark:text-gray-300 font-bold mb-2">{title}</div>
              {Array.isArray(items) && items.length > 0 && (
                <ul class="text-sm">
                  {items.map(({ title, href }, index2) => (
                    <li key={index2} class="mb-2">
                      <Link
                        class="text-gray-300 hover:text-white hover:underline dark:text-gray-400 transition duration-150 ease-in-out"
                        href={href}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div class="md:flex md:items-center dark:border-gray-700 md:justify-between pb-6 pt-0 md:pb-8">
          <ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0"> {/* Removed hidden md:flex */}
            {social.map(({ label, href, icon: Icon }, index) => (
              <li key={index}>
                <Link
                  class="text-white dark:text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                  aria-label={label}
                  title={label}
                  href={href}
                >
                  {typeof Icon !== "undefined" && <Icon class="w-6 h-6" />}
                </Link>
              </li>
            ))}
          </ul>

          <div class="text-sm text-gray-200 mr-4 dark:text-slate-400">
            © {new Date().getFullYear()} KasKritterz · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
});