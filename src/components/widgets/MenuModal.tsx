import { component$, useSignal } from "@builder.io/qwik";
import { LuX, LuArrowLeft, LuUsers, LuStar } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";

export default component$(() => {
  const show = useSignal(false);
  const isServicesSection = useSignal(false);

  // Menu items array structure
  const menuItems = [
    { title: "About", href: "#about", badge: null },
    { title: "Roadmap", href: "#roadmap", badge: null },
    { title: "Collections", href: "#collections", badge: null },
    { title: "Traits", href: "#items", badge: null },
    { title: "Rarity ", href: "#rarity", badge: null },
    { title: "FAQ", href: "#faq", badge: null },
  ];

  return (
    <>
      <Modal.Root bind:show={show}>
        <div class="flex items-center hover:bg-primary-100 dark:hover:bg-gray-700">
          <Modal.Trigger class="rounded-sm p-1 bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-900">
            <IconHamburger class="w-8 h-8 md:w-5 md:h-5 md:inline-block" />
          </Modal.Trigger>
        </div>
        <Modal.Panel position={"left"} class="border-0 bg-gray-900/50 dark:bg-gray-900/50 backdrop-blur-sm">
          {/* Header */}
          <div class="border-gray-200 bg-gray-900/50 dark:border-gray-700 p-1">
            <Modal.Title class="pt-1">
              <img
                src="/images/logo2.png"
                alt="KasKritterz Logo"
                class="h-8 rounded-full mr-2 mt-1 mb-2"
              />
            </Modal.Title>
          </div>

          {/* Navigation Content */}
          <nav class="mt-0 space-y-4 border-t-0 border-gray-200 dark:border-gray-700 bg-gray-900/50 dark:bg-gray-900/50">
            {isServicesSection.value ? (
              // Services Section
              <div class="flex flex-col h-full">
                <div class="flex items-center p-2">
                  <button
                    class="text-white dark:text-white hover:text-teal-300 p-2"
                    onClick$={() => (isServicesSection.value = false)}
                  >
                    <LuArrowLeft class="h-5 w-5" />
                  </button>
                  <h2 class="text-lg font-medium text-white dark:text-white">Services</h2>
                </div>
                <ul class="flex flex-col gap-0 text-lg"></ul>
              </div>
            ) : (
              // Main Menu
              <div>
                <ul class="flex flex-col gap-0 text-xl">
                  {menuItems.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        class={cn(
                          "block text-white dark:text-white p-2 px-3 hover:text-teal-300 hover:bg-teal-900/50 font-medium transition-all duration-200 relative bg-gray-900/50 dark:bg-gray-900/50",
                          "focus:outline-none"
                        )}
                        onClick$={() => (show.value = false)}
                      >
                        {item.title}
                        {item.badge}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
          <div class="border-t-0 pb-3 border-gray-200 dark:border-gray-700 bg-gray-900/50 dark:bg-gray-900/50">
            <div class="sm:max-w-md mx-2 pt-3 flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-3 lg:justify-start lg:m-0 lg:max-w-7xl">
             <div class="flex w-full sm:w-auto">
    <a
      href="https://www.kaspa.com/nft/collections/OGMice"
      class="border-2 border-black text-black text-xl px-5 py-3 rounded-lg bg-white/95 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
    >
      <LuStar class="w-6 h-6" /> Mint OG Mice
    </a>
  </div>
  <div class="flex w-full sm:w-auto">
    <a
      href="https://www.kaspa.com/nft/collections/KasKritter"
      class="bg-teal-400 text-white text-xl px-5 py-3 rounded-lg hover:bg-white hover:text-teal-400 transition-colors flex items-center justify-center gap-2"
    >
      <LuStar class="w-6 h-6 group-hover:text-teal-400" /> Mint Bullz vs Bearz
    </a>
  </div>
  <div class="flex w-full sm:w-auto">
    <a
      href="https://t.me/KasKritterzOfficial"
      class="bg-blue-300 text-white text-xl px-5 py-3 rounded-lg hover:bg-white hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
    >
      <LuUsers class="w-6 h-6 group-hover:text-blue-300" /> Join Community
    </a>
  </div>
          
            </div>
          </div>

          {/* Close Button */}
          <Modal.Close
            class={cn(
              buttonVariants({ size: "icon", look: "link" }),
              "absolute right-4 top-4 hover:bg-teal-900/50 text-white dark:text-white hover:text-teal-300"
            )}
            type="submit"
          >
            <LuX class="h-6 w-6" />
          </Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});