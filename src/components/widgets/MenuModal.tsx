import { component$, useSignal } from "@builder.io/qwik";
import { LuX,  LuUsers, LuStar, LuSend } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";
import { Link } from "@builder.io/qwik-city";

// Custom SVG component for the Twitter icon
export const CustomTwitterIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      class="w-6 h-6"
      fill="currentColor"
    >
      <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z" />
    </svg>
  );
});

export default component$(() => {
  const show = useSignal(false);
  const isServicesSection = useSignal(false);

  const menuItems = [
    { title: "About", href: "#about" },
    { title: "Roadmap", href: "#roadmap" },
    { title: "Collections", href: "#collections" },
    { title: "Traits", href: "#items" },
    { title: "Rarity", href: "#rarity" },
    { title: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <Modal.Root bind:show={show}>
        <div class="flex items-center hover:bg-primary-100 dark:hover:bg-gray-700">
          <Modal.Trigger class="rounded-sm p-1 bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-900">
            <IconHamburger class="w-8 h-8 md:w-5 md:h-5 md:inline-block" />
          </Modal.Trigger>
        </div>
        <Modal.Panel position="left" class="border-0 bg-gray-900/50 backdrop-blur-sm">
          {/* Header */}
          <div class="bg-gray-900/50 p-1">
            <Modal.Title class="pt-1">
              <img src="/images/logo2.png" alt="KasKritterz Logo" class="h-8 rounded-full mr-2 mt-1 mb-2" />
            </Modal.Title>
          </div>

          {/* Menu */}
          <nav class="mt-0 space-y-4 bg-gray-900/50">
            {!isServicesSection.value && (
              <ul class="flex flex-col gap-0 text-xl">
                {menuItems.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      class="block text-white p-2 px-3 hover:text-teal-300 hover:bg-teal-900/50 font-medium transition-all duration-200"
                      onClick$={() => (show.value = false)}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {/* Buttons */}
          <div class="pb-3 bg-gray-900/50">
            <div class="mx-2 pt-3 flex flex-col w-4/5 sm:flex-row gap-3">
              <a
                href="https://www.kaspa.com/nft/collections/OGMice"
                class="border-2 border-black text-black text-xl px-5 py-3 rounded-lg bg-white/90 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <LuStar class="w-6 h-6" /> Mint OG Mice
              </a>
              <a
                href="https://www.kaspa.com/nft/collections/KasKritter"
                class="bg-teal-400 text-white text-xl px-5 py-3 rounded-lg hover:bg-white hover:text-teal-400 flex items-center justify-center gap-2"
              >
                <LuStar class="w-6 h-6" /> Mint Bullz vs Bearz
              </a>
              <a
                href="https://t.me/KasKritterzOfficial"
                class="bg-blue-300 text-white text-xl px-5 py-3 rounded-lg hover:bg-white hover:text-blue-300 flex items-center justify-center gap-2"
              >
                <LuUsers class="w-6 h-6" /> Join Community
              </a>
            </div>

            {/* Social Icons */}
            <div class="flex pl-1 space-x-2 mt-4">
              <Link
                class="text-white dark:text-gray-400 hover:text-teal-300 rounded-lg text-sm p-2.5 inline-flex items-center relative transition-all duration-200 after:content-[''] after:absolute after:bottom-[4px] after:left-1/2 after:h-[2px] after:bg-teal-300 after:transition-all after:duration-200 after:w-0 hover:after:w-1/2 hover:after:left-1/4"
                aria-label="Telegram"
                href="https://t.me/KasKritterzOfficial"
              >
                <LuSend class="w-6 h-6" />
              </Link>
              <Link
                class="text-white dark:text-gray-400 hover:text-teal-300 rounded-lg text-sm p-2.5 inline-flex items-center relative transition-all duration-200 after:content-[''] after:absolute after:bottom-[4px] after:left-1/2 after:h-[2px] after:bg-teal-300 after:transition-all after:duration-200 after:w-0 hover:after:w-1/2 hover:after:left-1/4"
                aria-label="Twitter"
                href="https://x.com/KasKritterz"
              >
                <CustomTwitterIcon />
              </Link>
            </div>
          </div>

          {/* Close */}
          <Modal.Close
            class={cn(buttonVariants({ size: "icon", look: "link" }), "absolute right-4 top-4 hover:bg-teal-900/50 text-white hover:text-teal-300")}
          >
            <LuX class="h-6 w-6" />
          </Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});
