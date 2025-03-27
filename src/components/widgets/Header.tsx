import { $, component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useContent, useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import { Logo2 } from "../common/Logo2";
import MenuModal from "./MenuModal";
import IconPause from "../icons/IconPause";
import IconPlay from "../icons/IconPlay";
import { Card } from "../ui/Card";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
    activeSection: "", // Store the currently visible section
  });

  const audioRef = useSignal<HTMLAudioElement>();
  const isPlaying = useSignal(false);

  useVisibleTask$(async () => {
    const audio = audioRef.value;
    if (audio && !isPlaying.value) {
      try {
        await audio.play();
        isPlaying.value = true;
        console.log("Audio auto-started on visibility");
      } catch (error) {
        console.error("Failed to auto-play audio:", error);
      }
    }
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

  const toggleAudio = $(async () => {
    const audio = audioRef.value;
    if (audio) {
      if (isPlaying.value) {
        audio.pause();
        isPlaying.value = false;
        console.log("Audio paused");
      } else {
        try {
          await audio.play();
          isPlaying.value = true;
          console.log("Audio playing");
        } catch (error) {
          console.error("Failed to play audio:", error);
        }
      }
    } else {
      console.error("Audio element not available");
    }
  });

  const handleAudioEnded = $(() => {
    isPlaying.value = false;
  });

  const { menu } = useContent();
  const location = useLocation();

  return (

    <header
      id="header"
      class={`sticky top-0 z-40 flex-none mx-auto bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-950 dark:to-gray-900 w-full border-gray-300 dark:border-gray-800 transition-[opacity] ease-in-out ${store.isScrolling ? "" : ""
        }`}
      window:onScroll$={() => {
        if (!store.isScrolling && window.scrollY >= 10) {
          store.isScrolling = true;
        } else if (store.isScrolling && window.scrollY < 10) {
          store.isScrolling = false;
        }
      }}
    >
      <Card.Root>
        <div class="relative text-default  md:px-6 mx-auto w-full md:flex md:justify-between max-w-7xl">
          <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
            <Link class="flex items-center" href={"/"}>
              <Logo2 />
            </Link>
            <div class="flex items-center md:hidden">
              <a

                class="btn bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm ml-2 mr-1.5 h-12 py-2.5 px-4 md:px-4 font-semibold shadow-none text-md w-auto"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconPause /> : <IconPlay />}
              </a>
              <audio
                ref={audioRef}
                src="/images/hero.mp3"
                preload="auto"
                onEnded$={handleAudioEnded}
              />
              <a
                href="/contact"
                class="btn bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm mr-1.5 h-12 py-2.5 px-4 md:px-4 font-semibold shadow-none text-md w-auto"
              >
                Mint
              </a>

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
                            after:bg-secondary-800 
                            after:transition-all 
                            after:duration-200 
                            ${isActive
                                ? "text-secondary-500 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2 md:group-hover:[&:not(:hover)]:text-gray-800 dark:md:group-hover:[&:not(:hover)]:text-white"
                                : "hover:text-secondary-800 dark:hover:text-secondary-800 after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
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
                                    after:bg-secondary-800 
                                    after:transition-all 
                                    after:duration-200 
                                    ${isDropdownActive
                                        ? "text-secondary-500 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2 md:group-hover:[&:not(:hover)]:text-gray-800 dark:md:group-hover:[&:not(:hover)]:text-white"
                                        : "hover:text-secondary-800 dark:hover:text-secondary-800 after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
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
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          relative 
                          transition-all duration-200 
                          after:content-[''] 
                          after:absolute 
                          after:bottom-[6px] 
                          after:left-1/2 
                          after:h-[2px] 
                          after:bg-secondary-800 
                          after:transition-all 
                          after:duration-200 
                          ${isActive
                              ? "text-secondary-500 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2 md:group-hover:[&:not(:hover)]:text-gray-800 dark:md:group-hover:[&:not(:hover)]:text-white"
                              : "hover:text-secondary-800 dark:hover:text-secondary-800 after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
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
              <a

class="btn  border-gray-300 dark:bg-secondary-800 rounded-md bg-secondary-800 dark:border-gray-900 ml-2 h-11 py-2.5 px-4 md:px-4 font-semibold shadow-none text-md w-auto"
aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
onClick$={toggleAudio}
>
{isPlaying.value ? <IconPause /> : <IconPlay />}
</a>
<audio
ref={audioRef}
src="/images/hero.mp3"
preload="auto"
onEnded$={handleAudioEnded}
/>
              <a
                href="/contact"
                class="btn btn-secondary ml-2 py-2.5 px-5.5 md:px-4 font-semibold shadow-none text-sm w-auto"
              >
                Join Clan
              </a>
              <a
                href="tel:+16132188063"
                class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-4 font-semibold shadow-none text-sm w-auto"
              >
                Mint KasLords
              </a>
            </div>
          </div>
        </div>
      </Card.Root>
    </header>

  );
});