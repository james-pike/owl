import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { LuCheck, LuExpand, LuBook, LuInfinity } from "@qwikest/icons/lucide";
import { Headline } from "../ui/Headline";

interface Item {
  title?: string;
  description?: string;
  icon?: any;
  classes?: Record<string, string>;
}

interface Props {
  id?: string;
  title?: any;
  subtitle?: any;
  highlight?: any;
  items: Array<Item>;
  isDark?: boolean;
  classes?: any;
}

export default component$((props: Props) => {
  const { title = "", subtitle = "", highlight = "", classes = {} } = props;

  const stepsData = {
    items: [
      {
        title: "Phase 1 - Genesis Drop",
        description:
          "• Launch of 250 unique Kaspa-powered NFTs\n• Built 100% by us (artist/dev duo)\n• Kaspa rewards, rare traits, community-first",
        icon: LuCheck,
      },
      {
        title: "Phase 2 - Expansion & Utility",
        description:
          "• Release remaining collections: Katz, Dogz, Bearz\n• Holder-only perks & airdrops\n• Integrate community suggestions on comics",
        icon: LuExpand,
      },
      {
        title: "Phase 3 - Kaspa Comics",
        description:
          "• Launch comic strips featuring Kritterz\n• Kaspa vs other chains, crypto culture, adoption \n• Share weekly episodes on X\n• Collabs with other Kaspa projects\n• Merch, lore expansion, events",
        icon: LuBook,
      },
      {
        title: "Ongoing",
        description:
          "• More art, more fun, more Kaspa\n• Always building. Always rewarding.",
        icon: LuInfinity,
      },
    ],
  };

  const { items } = stepsData;

  return (
    <div class="max-w-6xl bg-[url('/images/steps.jpg')] border-b border-gray-300 dark:border-slate-700 overflow-x-hidden">
      <section
        id="roadmap"
        class="mx-auto max-w-7xl scroll-mt-16 px-3 py-10 md:py-12 lg:py-16 sm:px-6 lg:px-8"
      >
        <div class="md:bg-white/85 bg-white/95 px-3 py-6 md:p-6 rounded-lg shadow-lg">
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <div class="container text-sm">
            <div class="flex">
              <div class="w-full">
                {/* First Roadmap (Curling Circle) - Desktop Only */}
                <div class="road-map-main lg:block hidden !text-lg">
                  {items.map(({ title, description, icon: Icon }, index) => (
                    <div
                      key={`roadmap-item-${index}`}
                      class={twMerge(
                        "road-map-wrapper relative flex !text-lg flex-col h-[175px]",
                        "md:mb-0 mb-6",
                        index % 2 === 0 ? "md:pr-0 md:pl-auto" : "md:pl-0 md:pr-auto"
                      )}
                    >
                      <div
                        class={twMerge(
                          "road-map-circle w-[200px] h-[200px]  rounded-full border-4 border-transparent max-w-full mx-auto",
                          index % 2 === 0
                            ? "border-t-teal-400 border-r-teal-400 rotate-45"
                            : "border-b-teal-400 border-l-teal-400 -rotate-45",
                          "md:static",
                          "md:border-8",
                          "relative after:content-[''] after:absolute after:w-2 after:bg-teal-400 after:h-[calc(48px/4)] after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:rotate-0 after:z-0 md:after:hidden"
                        )}
                      >
                        <span
                          class={twMerge(
                            "road-map-circle-text w-[110px] h-[110px] rounded-full !bg-blue-400 flex items-center justify-center",
                            index === 0 && "!bg-teal-400 border-0", // Completed node
                            "shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] -rotate-45"
                          )}
                        >
                          {typeof Icon !== "undefined" ? (
                            <Icon class="h-6 w-6 text-white dark:text-slate-200" />
                          ) : (
                            index + 1
                          )}
                        </span>
                      </div>
                      <div
                        class={twMerge(
                          "road-map-card w-full max-w-[35%] md:max-w-[35%] !bg-teal-400/90 p-5 z-10 rounded-md",
                          index % 2 === 0 ? "md:float-right md:right-0" : "md:float-left md:left-0",
                          "md:absolute",
                          "md:pr-5 md:pl-5",
                          "md:before:content-[''] md:before:w-1/4 md:before:h-5 md:before:bg-teal-700 md:before:absolute md:before:top-1/2 md:before:-translate-y-1/2 md:before:left-[-23%] md:before:z-[-1]",
                          "sm:pr-5 sm:pl-5",
                          "md:before:pr-0 md:before:pl-0",
                          "md:w-1/3",
                          "md:mt-0 mt-12",
                          "md:static",
                          "md:before:w-5 md:before:h-[30%] md:before:top-1/2 md:before:left-1/2 md:before:-translate-x-1/2 md:before:right-auto",
                          "sm:before:w-5 sm:before:h-[30%] sm:before:top-1/2 sm:before:left-1/2 sm:before:-translate-x-1/2 sm:before:right-auto",
                          "md:pt-[20px] md:pb-[20px]"
                        )}
                      >
                        <h4 class="card-head !font-bold !text-xl capitalize mb-3.5 text-white">
                          {title}
                        </h4>
                        <p class="card-text !text-md text-white">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second Roadmap (6 Lorem Ipsums) - Mobile Only */}
                <div class="roadmap !px-4 !py-0 lg:hidden block !text-lg">
                  <div class="point !pr-0 !pl-10 flex items-start mb-6">
                    <div class="point-index w-[110px] h-[110px] rounded-full bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] mr-6">1</div>
                    <div class="point-content flex-1">
                      <div class="point-label text-teal-400  !text-xl !font-bold">Phase 1 - Genesis Drop</div>
                      <div class="point-text text-gray-700 !text-lg">
                        • Launch of 250 unique Kaspa-powered NFTs<br />• Built 100% by us (artist/dev duo)<br />• Kaspa rewards, rare traits, community-first
                      </div>
                    </div>
                  </div>
                  <div class="point !pl-2 flex items-start mb-6">
                    <div class="point-index w-[110px] h-[110px] rounded-full bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] mr-6">2</div>
                    <div class="point-content flex-1">
                      <div class="point-label text-teal-400 !text-xl !font-bold">Phase 2 - Expansion & Utility</div>
                      <div class="point-text text-gray-700 !text-lg">
                        • Release remaining collections: Katz, Dogz, Bearz<br />• Holder-only perks & airdrops<br />• Integrate community suggestions on comics
                      </div>
                    </div>
                  </div>
                  <div class="point !pr-2 !pl-8 flex items-start mb-6">
                    <div class="point-index w-[110px] h-[110px] rounded-full bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] mr-6">3</div>
                    <div class="point-content flex-1">
                      <div class="point-label text-teal-400  !text-xl !font-bold">Phase 3 - Kaspa Comics</div>
                      <div class="point-text text-gray-700 !text-lg">
                        • Launch comic strips featuring Kritterz<br />• Explore themes: Kaspa vs other chains, crypto culture, adoption dreams<br />• Share weekly episodes on X<br />• Collabs with other Kaspa projects<br />• Fun merch, lore expansion, events
                      </div>
                    </div>
                  </div>
                  <div class="point flex !pl-2 items-start mb-6">
                    <div class="point-index w-[110px] h-[110px] rounded-full bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] mr-6">4</div>
                    <div class="point-content flex-1">
                      <div class="point-label text-teal-400 !text-xl !font-bold">Ongoing</div>
                      <div class="point-text text-gray-700 !text-lg">
                        • More art, more fun, more Kaspa<br />• Always building. Always rewarding.
                      </div>
                    </div>
                  </div>
                  {/* <div class="point flex items-start mb-6">
                    <div class="point-index w-[110px] h-[110px] rounded-full bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] mr-6">5</div>
                    <div class="point-content flex-1">
                      <div class="point-label text-teal-400 font-semibold text-lg">Phase 5 - Future Vision</div>
                      <div class="point-text text-gray-700">
                        • Expansion into new blockchain ecosystems<br />• Enhanced community governance<br />• Innovative NFT utilities
                      </div>
                    </div>
                  </div>
                  <div class="point flex items-start mb-6">
                    <div class="point-index w-[110px] h-[110px] rounded-full bg-blue-400 flex items-center justify-center text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.129)] mr-6">6</div>
                    <div class="point-content flex-1">
                      <div class="point-label text-teal-400 font-semibold text-lg">Phase 6 - Global Reach</div>
                      <div class="point-text text-gray-700">
                        • International collaborations<br />• Localized content creation<br />• Global adoption initiatives
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});