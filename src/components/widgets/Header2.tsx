import { $, component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useContent, useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import { Logo2 } from "../common/Logo2";
import MenuModal from "./MenuModal";
import IconBrandTailwind from "../icons/IconBrandTailwind";
import IconBrandGoogle from "../icons/IconBrandGoogle";
import IconGithub from "../icons/IconGithub";
import IconPause from "../icons/IconPause";
import IconPlay from "../icons/IconPlay";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
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

  
  // Toggle play/pause based on current state
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

  // Reset isPlaying when audio ends
  const handleAudioEnded = $(() => {
    isPlaying.value = false;
  });

  const { menu } = useContent();
  const location = useLocation();

  return (
    <header
      id="header"
      class={`sticky top-0 z-40 flex-none mx-auto bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-950 dark:to-gray-800  w-full border-b border-gray-300 dark:border-gray-800 transition-[opacity] ease-in-out ${store.isScrolling
          ? "    "
          : ""
        }`}
      window:onScroll$={() => {
        if (!store.isScrolling && window.scrollY >= 10) {
          store.isScrolling = true;
        } else if (store.isScrolling && window.scrollY < 10) {
          store.isScrolling = false;
        }
      }}
    >



 

      <div class="relative text-default py-2 px-2 md:px-6 mx-auto w-full md:flex md:justify-between max-w-7xl">
        <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
          <Link class="flex items-center" href={"/"}>
            {/* <Logo /> */}
            <Logo2 />
          </Link>
          <div class="flex items-center md:hidden">
            <a
              href="/contact"
              class="btn bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm ml-2 mr-1.5 h-12 py-2.5 px-4 md:px-4 font-semibold shadow-none text-md w-auto"
            >
              Contact Us
            </a>

            <button
                type="button"
                class="p-2 bg-blue-50 rounded-sm flex items-center h-full dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconPause /> : <IconPlay />}
              </button>
              <audio
                ref={audioRef}
                src="/images/hero.mp3"
                preload="auto"
                onEnded$={handleAudioEnded}
              />


            <MenuModal />
          </div>
        </div>
        <nav
          class="items-center w-full md:w-auto hidden md:flex dark:text-white overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5 group"
          aria-label="Main navigation"
        >
          {menu && menu.items ? (
            <ul class="flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[0.9375rem] tracking-[0.01rem] font-medium">
              {menu.items.map(({ text, href, items }, key) => {
                const isActive = location.url.pathname === href; // Assuming `location` is available for active state
                return (
                  <li key={key} class={items?.length ? "dropdown" : ""}>
                    {items?.length ? (
                      <>
                        <button
                          class={`
                      hover:text-primary-800
                      px-4 py-3 
                      flex items-center 
                      transition-all duration-200
                      relative
                      after:content-[''] 
                      after:absolute 
                      after:bottom-[6px] 
                      after:left-1/2 
                      after:h-[2px] 
                      after:bg-primary-800 
                      after:transition-all 
                      after:duration-200 
                      ${isActive
                              ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                              : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                            }
                    `}
                          onClick$={() => {
                            if (location.url.pathname !== "/") {
                              // Navigate to root and scroll to #services
                              window.location.href = "/#services";
                            } else {
                              // Already on root, just scroll to #services
                              const servicesSection = document.getElementById("services");
                              if (servicesSection) {
                                servicesSection.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                        >
                          {text}{" "}
                          <IconChevronDown
                            class="
                        w-3.5 h-3.5 
                        ml-0.5 rtl:ml-0 rtl:mr-0.5 
                        hidden md:inline 
                      "
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
                            const isDropdownActive = location.url.pathname === href2;
                            return (
                              <li key={key2}>
                                <a
                                  class={`
                              first:rounded-t last:rounded-b 
                              hover:text-primary-800 dark:hover:text-primary-800 
                              py-2 px-5 
                              block whitespace-no-wrap 
                              transition-all duration-200 
                              relative
                              after:content-[''] 
                              after:absolute 
                              after:bottom-[4px] 
                              after:left-1/2 
                              after:h-[2px] 
                              after:bg-primary-800 
                              after:transition-all 
                              after:duration-200 
                              ${isDropdownActive
                                      ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                      : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                                    }
                            `}
                                  href={href2}
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
                    hover:text-primary-800 dark:hover:text-primary-800 
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
                    after:bg-primary-800 
                    after:transition-all 
                    after:duration-200 
                    ${isActive
                            ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                            : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                          }
                  `}
                        href={href}
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
            <div class="flex">
            </div>
            <span class="ml-4 rtl:ml-0 rtl:mr-4">
            <button
                type="button"
                class="p-2 bg-blue-50 rounded-sm flex items-center h-full dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconGithub /> : <IconGithub />}
              </button>
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
                <IconBrandGoogle class="mr-1" /> Join Clan
              </a>
              <a
                href="tel:+16132188063"
                class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-4 font-semibold shadow-none text-sm w-auto"
              >
                <IconBrandTailwind class="mr-1" /> Mint KasLords
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});