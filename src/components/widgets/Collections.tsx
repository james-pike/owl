import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";
import { Carousel } from "../ui/Carousel";
import { Card } from "../ui/Card";

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
  const { id, title = "Collections", subtitle = "",  classes = {}, isDark = true } = props;
  const collections = [
    { id: 1, title: "KasKritterz", description: "Hoarders? Sure. Paper hands? Never. KAS is their forever stash.", image: "/images/101.jpeg" },
       { id: 4, title: "KasBearz", description: "Even bearish, they know KAS is the endgame.", image: "/images/KasBEARZCS.png" },
    { id: 6, title: "KasBullz", description: "Horns up, charts up, bullish on KAS 24/7.", image: "/images/KasBULLZCS.png" },

    { id: 3, title: "KasKatz", description: "Nine lives, one blockadag. Cats always land on KAS.", image: "/images/KasDOGZCS.png" },
    { id: 5, title: "KasDogz", description: "Always barking for KAS moonshots.", image: "/images/KasDOGZCS.png" },
        { id: 2, title: "KasDinoz", description: "Extinct? Nah. They evolved with KAS to lead the future.", image: "/images/KasDINOZCS.png" },

  ];

  return (
    <section class="relative scroll-mt-12 bg-[url('/images/seabeach.jpg')] bg-cover border-b border-gray-300" {...(id ? { id } : {})}>
      <div class="absolute inset-0 pointer-events-none -z-[1]" aria-hidden="true">
        <slot name="bg">
          <div class={twMerge("absolute inset-0", isDark ? "bg-gray-900 dark:bg-transparent" : "")}></div>
        </slot>
      </div>
      <div
        class={twMerge(
          "relative mx-auto max-w-7xl px-3 md:px-6 pb-6 pt-14 md:py-14 lg:py-16 text-default overflow-hidden",
          classes?.container,
          isDark ? "dark" : ""
        )}
      >
        <Headline title={title} subtitle={subtitle} classes={classes?.headline} />
        <div class="w-full">
          {/* Carousel for mobile */}
          <div class="md:hidden">
            <Carousel.Root slidesPerView={1.2} sensitivity={{ mouse: 2.5, touch: 2.8 }} class="max-w-full mx-auto overflow-hidden pb-12">
              <Carousel.Scroller class="flex overflow-x-auto snap-x snap-mandatory">
                {collections.map((collection) => (
                  <Carousel.Slide key={collection.id} class="snap-center shrink-0">
                    <div class="p-2">
                      <Card.Root class="overflow-hidden rounded-lg shadow-lg">
                        <Card.Content class="flex flex-col items-center justify-center p-2 bg-gray-100 text-center">
                          <img
                            src={collection.image}
                            alt={`${collection.title} Collection`}
                            class="w-full object-cover rounded-lg"
                          />
                          <h3 class="text-xl font-semibold text-black mt-2 w-full">{collection.title}</h3>
                          <p class="!text-sm text-black mt-1 w-full">{collection.description}</p>
                        </Card.Content>
                      </Card.Root>
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel.Scroller>
              <Carousel.Previous class="text-black bg-gray-200 p-2 rounded-full" />
              <Carousel.Next class="text-black bg-gray-200 p-2 rounded-full" />
              <Carousel.Pagination class="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-2 z-10">
                {collections.map((_, index) => (
                  <Carousel.Bullet
                    key={index}
                    class="w-3 h-3 rounded-full bg-gray-400 data-[active]:bg-teal-500 transition-colors cursor-pointer"
                    onClick$={() => console.log(`Bullet ${index} clicked`)}
                  />
                ))}
              </Carousel.Pagination>
            </Carousel.Root>
          </div>
          {/* Grid for desktop */}
          <div class="hidden md:block">
            <div class="grid grid-cols-6 gap-0">
              {collections.map((collection) => (
                <div key={collection.id} class="p-2">
                  <Card.Root class="overflow-hidden rounded-lg shadow-lg">
                    <Card.Content class="flex flex-col items-center justify-center p-1 bg-gray-200">
                      <img
                        src={collection.image}
                        alt={`${collection.title} Collection`}
                        class="w-full object-cover rounded-t-lg p-1" // Added p-1 for 4px padding
                      />
                      <h3 class="text-xl font-semibold text-black mt-2">{collection.title}</h3>
                      <p class="!text-sm px-2 text-center text-black mt-1">{collection.description}</p>
                    </Card.Content>
                  </Card.Root>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});