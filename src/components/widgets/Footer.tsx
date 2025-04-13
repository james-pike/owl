import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuTwitter, LuSend } from '@qwikest/icons/lucide';

import { Card } from "../ui/Card";

export default component$(() => {
  const links = [
    {
      title: "About",
      items: [
        { title: "Story", href: "#story" },
        { title: "Roadmap", href: "#roadmap" },
        { title: "Team", href: "#team" },
    
      ],
    },

    {
      title: "Tools",
      items: [
        { title: "Rarity Guide", href: "#rarity" },
        { title: "Inventory Items", href: "#inventory" },
       
   
      ],
    },
  
    {
      title: "Resources",
      items: [
        { title: "KaspaCom", href: "https://www.kaspa.com/nft/mint" },
        { title: "KRCscan", href: "https://krcscan.io/nft/kaslords" },
    
   
     
      ],
    },
  ];

  const social = [
    { label: "Twitter", icon: LuTwitter, href: "https://x.com/kaslords" },
    { label: "Telegram", icon: LuSend, href: "https://t.me/+pHZ9UA7XIDA2YmIx" },
   
    // {
    //   label: "Github",
    //   icon: IconGithub,
    //   href: "https://github.com/onwidget/qwind",
    // },
  ];

  return (
    <Card.Root>
    <footer class=" ">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
          <div class="col-span-12 lg:col-span-4 pr-4">
            <div class="mb-2">
              <Link class="inline-block font-bold text-xl" href={"/"}>
                KasLords Of The BlockDag
              </Link>
            </div>
            <div class="text-sm text-gray-600 mb-4 dark:text-gray-400">
            Own a piece of this legendary saga, forged in the fires of creativity and secured on the BlockDag—join the KasLords and claim your dominion today!

            </div>
            <div class="flex gap-2">
              <a
                  href="https://www.kaspa.com/nft/mint"
                class=" px-2 py-2 btn-primary text-white font-semibold rounded-md transition-colors"
              >
                Mint KasLords
              </a>
              <a
                   href="https://t.me/+pHZ9UA7XIDA2YmIx"
                class=" btn-secondary px-2 py-2 dark:text-white font-semibold rounded-md transition-colors"
              >
                Join The Clan
              </a>


           </div>
           </div>


           
          {links.map(({ title, items }, index) => (
            <div key={index} class="col-span-6 md:col-span-3 lg:col-span-2">
              <div class="text-gray-800 dark:text-gray-300 font-medium mb-2">{title}</div>
              {Array.isArray(items) && items.length > 0 && (
                <ul class="text-sm">
                  {items.map(({ title, href }, index2) => (
                    <li key={index2} class="mb-2">
                      <Link
                        class="text-gray-600 hover:text-gray-700 hover:underline dark:text-gray-400 transition duration-150 ease-in-out"
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
        <div class="md:flex md:items-center  dark:border-gray-700 md:justify-between pb-6 pt-0 md:py-8">
          <ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0">
        
          {social.map(({ label, href, icon: Icon }, index) => (
  <li key={index}>
    <Link
      class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
      aria-label={label}
      title={label}
      href={href}
    >
      {typeof Icon !== "undefined" && <Icon class="w-5 h-5" />}
    </Link>
  </li>
))}
          </ul>
       
          <div class="text-sm text-gray-700 mr-4 dark:text-slate-400">
            {/* <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
            Made by{" "}
            <a class="text-secondary-800 underline dark:text-gray-200" href="https://onwidget.com/">
              {" "}
              onWidget
            </a>{" "}· All rights reserved. */}
               © {new Date().getFullYear()} KasLords Of The BlockDag · All rights reserved
            
          </div>
        </div>
      </div>
    </footer>
    </Card.Root>
  );
});
