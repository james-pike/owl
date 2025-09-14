import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useContent, useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import MenuModal from "./MenuModal";
import { LuSend } from "@qwikest/icons/lucide";

// Custom SVG component for the Twitter icon
export const CustomTwitterIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      class="w-6 h-6"
      fill="currentColor" // Inherit color from parent Link
    >
      <path
        d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"
      />
    </svg>
  );
});

export default component$(() => {
  const store = useStore({
    isScrolling: false,
    activeSection: "", // Store the currently visible section
  });

  // Intersection Observer to track visible sections
  useVisibleTask$(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            store.activeSection = `#${sectionId}`; // Update active section
            // Optionally update URL hash (uncomment if desired):
            // window.history.replaceState(null, "", `#${sectionId}`);
          }
        });
      },
      {
        root: null, // Use viewport as root
        threshold: 0.5, // Trigger when 50% of section is visible
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  });

  const { menu } = useContent();
  const location = useLocation();

  return (
    <header
      id="header"
      class={`sticky top-0 z-40 flex-none mx-auto bg-black bg-cover dark:from-gray-950 dark:to-gray-900 w-full border-gray-300 dark:border-gray-800 transition-[opacity] ease-in-out ${store.isScrolling ? "" : ""}`}
      window:onScroll$={() => {
        if (!store.isScrolling && window.scrollY >= 10) {
          store.isScrolling = true;
        } else if (store.isScrolling && window.scrollY < 10) {
          store.isScrolling = false;
        }
      }}
    >
      <div class="relative text-default md:px-2 px-3 pt-3 mx-auto w-full md:flex md:justify-between max-w-7xl">
        <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
          <Link class="flex items-center" href="/">
            <img
              src="/images/owl.jpg"
              alt="KasKritterz Logo"
              class="w-12 h-10 rounded-full md:mr-1"
            />
            {/* <img
              src="/images/logo2.png"
              alt="KasKritterz Logo"
              class="h-8 rounded-full mr-2 -mt-1"
            /> */}
          </Link>
          <div class="flex items-center md:hidden">
            {/* <a
              href="https://www.kaspa.com/nft/collections/KasKritter"
              class="btn btn-primary dark:bg-secondary-800 dark:border-gray-900 rounded-sm mr-2 h-10 py-2 px-3 md:px-4 font-semibold shadow-none text-md w-auto"
            >
              Mint
            </a> */}
            <MenuModal />
          </div>
        </div>
        <nav
          class="items-center w-full md:w-auto hidden md:flex dark:text-white overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5 group"
          aria-label="Main navigation"
        >
          {menu && menu.items ? (
            <ul class="flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[1.25rem] tracking-[0.01rem] font-medium">
              {menu.items.map(({ text, href, items }, key) => {
                const isActive =
                  (href?.startsWith("#") && store.activeSection === href) ||
                  (location.url.pathname === href) ||
                  (href === "/" && location.url.pathname === "/" && store.activeSection === "");

                return (
                  <li key={key} class={items?.length ? "dropdown" : ""}>
                    {items?.length ? (
                      <>
                        <button
                          class={`
                            px-4 py-3 
                            flex items-center 
                            transition-all duration-200
                            relative
                            after:content-[''] 
                            after:absolute 
                            after:bottom-[6px] 
                            after:left-1/2 
                            after:h-[2px] 
                            after:bg-teal-300 
                            after:transition-all 
                            after:duration-200 
                            ${isActive
                              ? "text-teal-300 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2 md:group-hover:[&:not(:hover)]:text-white"
                              : "text-white hover:text-teal-300 after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                            }
                          `}
                          onClick$={() => {
                            if (location.url.pathname !== "/") {
                              window.location.href = "/#services";
                            } else {
                              const servicesSection = document.getElementById("services");
                              if (servicesSection) {
                                servicesSection.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                        >
                          {text}{" "}
                          <IconChevronDown
                            class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline"
                          />
                        </button>
                        <ul
                          class="
                            dropdown-menu 
                            md:backdrop-blur-md 
                            dark:md:bg-slate-800 
                            rounded md:absolute 
                            pl-4 md:pl-0 
                            md:hidden 
                            font-medium 
                            md:bg-white/90 
                            md:min-w-[200px] 
                            drop-shadow-xl
                            py-2
                          "
                        >
                          {items.map(({ text: text2, href: href2 }, key2) => {
                            const isDropdownActive =
                              href2 && store.activeSection === href2;

                            return (
                              <li key={key2}>
                                <a
                                  class={`
                                    first:rounded-t last:rounded-b 
                                    py-2 px-5 
                                    block whitespace-no-wrap 
                                    transition-all duration-200 
                                    relative
                                    after:content-[''] 
                                    after:absolute 
                                    after:bottom-[4px] 
                                    after:left-1/2 
                                    after:h-[2px] 
                                    after:bg-teal-300 
                                    after:transition-all 
                                    after:duration-200 
                                    ${isDropdownActive
                                      ? "text-teal-300 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2 md:group-hover:[&:not(:hover)]:text-white"
                                      : "text-white hover:text-teal-300 after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                                    }
                                  `}
                                  href={href2 ?? "#"}
                                >
                                  {text2}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <a
                        class={`
                          px-4 py-3 
                          flex items-center 
                          relative 
                          transition-all duration-200 
                          after:content-[''] 
                          after:absolute 
                          after:bottom-[6px] 
                          after:left-1/2 
                          after:h-[2px] 
                          after:bg-teal-300 
                          after:transition-all 
                          after:duration-200 
                          ${isActive
                            ? "text-teal-300 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2 md:group-hover:[&:not(:hover)]:text-white"
                            : "text-white hover:text-teal-300 after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                          }
                        `}
                        href={href ?? "#"}
                      >
                        {text}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </nav>
        <div class="hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0">
          <div class="items-center flex justify-between w-full md:w-auto">
            <div class="flex"></div>
            <Link
              class={`
                text-white 
                dark:text-gray-400 
                hover:text-teal-300 
                focus:outline-none 
                focus:ring-4 
                focus:ring-gray-200 
                dark:focus:ring-gray-700 
                rounded-lg 
                text-sm 
                p-2.5 
                inline-flex 
                items-center 
                relative 
                transition-all 
                duration-200 
                after:content-[''] 
                after:absolute 
                after:bottom-[6px] 
                after:left-1/2 
                after:h-[2px] 
                after:bg-teal-300 
                after:transition-all 
                after:duration-200 
                after:w-0 
                hover:after:w-1/2 
                hover:after:left-1/4
              `}
              aria-label="Telegram"
              href="https://t.me/KasKritterzOfficial"
            >
              <LuSend class="w-6 h-6" />
            </Link>
            <Link
              class={`
                text-white 
                dark:text-gray-400 
                hover:text-teal-300 
                focus:outline-none 
                focus:ring-4 
                focus:ring-gray-200 
                dark:focus:ring-gray-700 
                rounded-lg 
                text-sm 
                p-2.5 
                inline-flex 
                items-center 
                relative 
                transition-all 
                duration-200 
                after:content-[''] 
                after:absolute 
                after:bottom-[6px] 
                after:left-1/2 
                after:h-[2px] 
                after:bg-teal-300 
                after:transition-all 
                after:duration-200 
                after:w-0 
                hover:after:w-1/2 
                hover:after:left-1/4
              `}
              aria-label="Twitter"
              href="https://x.com/KasKritterz"
            >
              <CustomTwitterIcon />
            </Link>
            <a
              href="https://www.kaspa.com/nft/collections/KasKritter"
              class="btn btn-primary ml-1.5 py-2 px-4 md:px-4 font-semibold rounded-sm shadow-none text-sm w-auto"
            >
              Mint
            </a>
          </div>
        </div>
      </div>
    </header>
  );
});