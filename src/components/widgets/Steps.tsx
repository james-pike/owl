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
          "• Launch comic strips featuring Kritterz\n• Explore themes: Kaspa vs other chains, crypto culture, adoption dreams\n• Share weekly episodes on X\n• Collabs with other Kaspa projects\n• Fun merch, lore expansion, events",
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
    <div class="max-w-7xl bg-[url('/images/steps.jpg')] border-b border-gray-300 dark:border-slate-700 overflow-x-hidden">
      <section
        id="roadmap"
        class="mx-auto max-w-5xl scroll-mt-16 px-3 py-10 md:py-12 lg:py-16 sm:px-6 lg:px-8"
      >
        <div class="bg-white/85 px-3 py-6 md:p-6 rounded-lg shadow-lg">
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <div class="container text-sm">
            <div class="flex">
              <div class="w-full">
                <div class="road-map-main">
                  {items.map(({ title, description, icon: Icon }, index) => (
                    <div
                      key={`roadmap-item-${index}`}
                      class={twMerge(
                        "road-map-wrapper relative flex flex-col h-[175px]",
                        "md:mb-0 mb-6",
                        index % 2 === 0 ? "md:pr-0 md:pl-auto" : "md:pl-0 md:pr-auto"
                      )}
                    >
                      <div
                        class={twMerge(
                          "road-map-circle w-[200px] h-[200px] rounded-full border-4 border-transparent max-w-full mx-auto",
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
                          "road-map-card w-full max-w-[35%] md:max-w-[35%] !bg-teal-400 p-5 z-10 rounded-md",
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
                        <h4 class="card-head font-semibold capitalize mb-3.5 text-white">
                          {title}
                        </h4>
                        <p class="card-text !text-sm text-white">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});