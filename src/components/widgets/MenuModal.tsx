import { component$, useSignal } from "@builder.io/qwik";
import { LuX, LuArrowLeft } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import {  LogoStatic } from "../common/Logo2";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";
import IconBrandTailwind from "../icons/IconBrandTailwind";
import IconBrandGoogle from "../icons/IconBrandGoogle";
import { Card } from "../ui/Card";

export default component$(() => {
  const show = useSignal(false);
  const isServicesSection = useSignal(false);
  const location = useLocation();



  // Menu items array structure
  const menuItems = [
    { title: "Home", href: "/", badge: null },
    { title: "Story", href: "#story", badge: null },

    {
      title: "Classes",
      href: "#classes",
      // hasSubmenu: true,
      // subitems: [
      //   {
      //     title: "Wizard Lord",
      //     href: "#classes"
      //   },
      //   {
      //     title: "Dark Lord",
      //     href: "#classes"
      //   },
      //   {
      //     title: "Elf lord",
      //     href: "#classes"
      //   },
      //   {
      //     title: "Orc Lord",
      //     href: "#classes"
      //   },
      //   {
      //     title: "Warrior Lord",
      //     href: "#classes"
      //   },
      //   {
      //     title: "Dragon Lord",
      //     href: "#classes"
      //   },

      // ]
    },

    {
      title: "Inventory",
      href: "#inventory",
    },
    {
      title: "Roadmap",
      href: "#roadmap",
    },
    {
      title: "Rarity Guide",
      href: "#rarity",
    },

    
    { title: "Team", href: "#team", badge: null }
  ];

  // Get services subitems safely
  // const servicesItem = menuItems.find(item => item.hasSubmenu);
  // const servicesSubitems = servicesItem?.subitems ?? [];

  return (
    <>
      <Modal.Root bind:show={show}>
        <div class="flex items-center hover:bg-primary-100 dark:hover:bg-gray-700">
          <Modal.Trigger class=" rounded-sm p-2 bg-gray-200 dark:bg-gray-800  border-gray-300 dark:border-gray-900">
            <IconHamburger class="w-8 h-8 md:w-5 md:h-5 md:inline-block" />
          </Modal.Trigger>
        </div>
        <Modal.Panel position={"left"} class=" border-0">
          <Card.Root>
          {/* Header */}
          <div class=" border-gray-200 dark:border-gray-700  p-1">
            <Modal.Title class="pt-1">
                <Link class="flex items-center" href={"/"}>
                            <h1 class="font-bold text-3xl">KasLords</h1>
                          </Link>
            </Modal.Title>

            <Modal.Description class="text-lg font-medium px-2 py-1 text-gray-700 dark:text-gray-200">
              KasLords Of The BlockDag          </Modal.Description>
          </div>



          {/* Navigation Content */}
          <nav class="mt-0 space-y-4  border-t-0 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            {isServicesSection.value ? (
              // Services Section
              <div class="flex flex-col h-full">
                <div class="flex items-center p-2">
                  <button
                    class="text-gray-700 dark:text-gray-200 hover:text-primary-800 p-2"
                    onClick$={() => (isServicesSection.value = false)}
                  >
                    <LuArrowLeft class="h-5 w-5" />
                  </button>
                  <h2 class="text-lg font-medium dark:text-gray-200 text-gray-700">Services</h2>
                </div>
                <ul class="flex flex-col gap-0 text-lg">
         
                </ul>
              </div>
            ) : (
              // Main Menu
              <div>
                <ul class="flex flex-col gap-0 text-xl">
                  {menuItems.map((item) => (
                    <li key={item.title}>
                      {/* {item.hasSubmenu ? (
                        <button
                          class={cn(
                            "block w-full text-left text-gray-700 dark:text-gray-200  p-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-all duration-200 flex items-center justify-between",
                            location.url.pathname.startsWith("/services/") && "bg-white dark:bg-gray-700 "
                          )}
                          onClick$={() => (isServicesSection.value = true)}
                        >
                          <span>{item.title}</span>
                          <LuChevronRight class="h-5 w-5 text-gray-500 group-hover:text-primary-800" />
                        </button>
                      ) : ( */}
                        <a
                          href={item.href}
                          class={cn(
                            "block text-gray-700 dark:text-gray-200  p-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-all duration-200 relative",
                            location.url.pathname === item.href && "bg-white dark:bg-gray-700"
                          )}
                          onClick$={() => (show.value = false)}
                        >
                          {item.title}
                          {item.badge}
                        </a>
                      {/* )} */}
                    </li>
                  ))}

                </ul>


              </div>

            )}
          </nav>
          <div class="border-t-0 pb-3 border-gray-200 dark:border-gray-700 ">
          <div class=" sm:max-w-md mx-3 pt-3 flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-3 lg:justify-start lg:m-0 lg:max-w-7xl">
            <div class="flex w-full sm:w-auto">
              <a
                class="btn btn-primary sm:mb-0 w-full"
                href="tel:+16132188063"
              >
                <IconBrandTailwind class="mr-1" /> Mint KasLords
              </a>
            </div>
            <div class="flex w-full sm:w-auto">
              <a
                class="btn btn-primary btn-secondary sm:mb-0 w-full"
                href="/contact"
              >
                <IconBrandGoogle  class="mr-1"/> Join The Clan
              </a>
            </div>
          </div>
          </div>

      

          {/* Close Button */}
          <Modal.Close
            class={cn(
              buttonVariants({ size: "icon", look: "link" }),
              "absolute right-4 top-4 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
            )}
            type="submit"
          >
            <LuX class="h-6 w-6" />
          </Modal.Close>
          </Card.Root>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});