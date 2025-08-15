import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { twMerge } from "tailwind-merge";
import IconStar from "~/components/icons/IconStar";
import { Headline } from "../ui/Headline";

const sideImg = "/images/roadmap.jpg";

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
        title: "Phase 1: Awakening of Kasparion",
        description:
          "Initial launch of the KasLords.",
        icon: IconStar,
      },
      {
        title: "Phase 2: Fellowship of the Block",
        description:
          "Launch minting incentives for holders of all six KasLord character types.",
        icon: IconStar,
      },
      {
        title: "Phase 3: Strongholds and Legends",
        description:
          "Foster fan-fiction and meme culture around KasLords, for fans of fantasy RPG's.",
        icon: IconStar,
      },
      {
        title: "Phase 4: The Lore Deepens",
        description:
          "What lies ahead will not be forged in silence or secrecy, but in open scrolls and shared vision.",
        icon: IconStar,
      },
    ],
    image: {
      src: sideImg,
     
    },
  };

  const { items, image } = stepsData;

  return (
    <div class="max-w-7xl">
        <section
          id="roadmap"
          class="mx-auto max-w-6xl scroll-mt-16 px-4 pb-6 pt-10 md:py-12 lg:py-12 sm:px-6 lg:px-8"
        >
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />

          <div class="row-gap-10 grid gap-6 md:grid-cols-2">
            <div class="mb-4 md:mb-0 md:py-4 md:pr-16">
              {Array.isArray(items) &&
                items.length &&
                items.map(({ title, description, icon: Icon }, index) => (
                  <div key={`item-steps-${index}`} class={twMerge("flex")}>
                    <div class="mr-4 flex flex-col items-center">
                      <div>
                        {index !== items.length - 1 ? (
                          <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-900">
                            {typeof Icon !== "undefined" ? (
                              <Icon class="h-6 w-6 text-secondary-800 dark:text-slate-200" />
                            ) : (
                              <IconStar class="h-6 w-6 text-secondary-800 dark:text-slate-200" />
                            )}
                          </div>
                        ) : (
                          <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-900 bg-secondary-900">
                            {typeof Icon !== "undefined" ? (
                              <Icon class="h-6 w-6 text-white dark:text-slate-200" />
                            ) : (
                              <IconStar class="h-6 w-6 text-white dark:text-slate-200" />
                            )}
                          </div>
                        )}
                      </div>
                      {index !== items.length - 1 && (
                        <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                      )}
                    </div>
                    <div class={`pt-1 ${index !== items.length - 1 ? "pb-8" : ""}`}>
                      {title && (
                        <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">{title}</p>
                      )}
                      {description && <p class="text-gray-600 dark:text-slate-400">{description}</p>}
                    </div>
                  </div>
                ))}
            </div>
            <div class="relative">
              {typeof image !== "undefined" && (
                <Image
                  layout="constrained"
                  src={image.src}
                  width={532}
                  height={704}
                 
                  class="inset-0 w-full rounded-md bg-gray-500 hidden sm:block object-cover object-top shadow-lg dark:bg-slate-700 md:absolute md:h-full"
                  breakpoints={[320, 480, 640, 1024]}
                />
              )}
              {typeof image !== "undefined" && (
                <Image
                  layout="constrained"
                  src={image.src}
                  width={400}
                  height={400}
                
                  class="inset-0 w-full rounded-md bg-gray-500 block sm:hidden mx-auto object-cover object-top shadow-lg dark:bg-slate-700 md:absolute md:h-full"
                  breakpoints={[320, 480, 640, 1024]}
                />
              )}
            </div>
          </div>
        </section>
    </div>
  );
});