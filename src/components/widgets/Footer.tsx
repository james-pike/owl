import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuSend, LuStar, LuUsers } from "@qwikest/icons/lucide";

export default component$(() => {
  const links = [
    {
      title: "About",
      items: [
        { title: "About", href: "#about" },
        { title: "Roadmap", href: "#roadmap" },
        { title: "Collections", href: "#collections" },
        { title: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Rarity Guide", href: "#rarity" },
        { title: "Item Traits", href: "#items" },
        { title: "KaspaCom", href: "https://www.kaspa.com/nft/collections/KasKritter" },
      ],
    },
  ];

  const social = [
    { label: "Telegram", icon: LuSend, href: "https://t.me/KasKritterzOfficial" },
        { label: "Telegram", icon: LuSend, href: "https://t.me/KasKritterzOfficial" },

  ];

  return (
    <footer class="bg-[url('/images/background.jpg')] bg-cover bg-center border-gray-300 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 pt-8 pb-6 md:pt-12 md:py-12">
          <div class="col-span-12 lg:col-span-5 pr-4">
            <div class="flex flex-col">
             <div class="flex flex-row items-center justify-between mb-2 md:mb-2">
  <img
    src="/images/logo2.png"
    alt="KasKritterz Logo"
    class="h-8 rounded-full mr-2 -mt-1"
  />
  <ul class="flex flex-row flex-nowrap items-center space-x-2">
    {social.map(({ label, href, icon: Icon }, index) => (
      <li key={index}>
        <Link
          class="text-white dark:text-gray-400 hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
          aria-label={label}
          title={label}
          href={href}
        >
          {typeof Icon !== "undefined" && <Icon class="w-6 h-6" />}
        </Link>
      </li>
    ))}
  </ul>
</div>

              <div class="text-md text-gray-200 mb-4 dark:text-gray-400">
                KasKritterz is a community-powered NFT universe, built in a world where Kaspa leads the future.
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.kaspa.com/nft/collections/OGMice"
                  class="border-2 border-black w-2/3 text-black text-xl px-5 py-3 rounded-lg bg-white/80 transition-colors flex items-center justify-center gap-2"
                >
                  <LuStar class="w-6 h-6" /> Mint OG Mice
                </a>
                <a
                  href="https://www.kaspa.com/nft/collections/KasKritter"
                  class="bg-teal-400 text-white w-2/3 text-xl px-5 py-3 rounded-lg hover:bg-teal-300 transition-colors flex items-center justify-center gap-2"
                >
                  <LuStar class="w-6 h-6" /> Mint KasKritterz
                </a>
                <a
                  href="https://t.me/KasKritterzOfficial"
                  class="bg-blue-300 text-white w-2/3 text-xl px-3 md:px-5 py-3 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <LuUsers class="w-6 h-6" /> Join Community
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
                        class="!text-md text-gray-300 hover:text-teal-400 hover:underline dark:text-gray-400 transition duration-150 ease-in-out"
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
          <div class="!text-sm text-gray-200 mr-4 dark:text-slate-400">
            © {new Date().getFullYear()} KasKritterz · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
});