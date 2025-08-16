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
  const { id, title = "Collections", subtitle = "", highlight = "", classes = {}, isDark = true } = props;
  const collections = [
    { id: 1, title: "KasKritterz", image: "/images/77.jpeg" },
    { id: 2, title: "KasDinoz", image: "/images/dinoz.jpg" },
    { id: 3, title: "KasKats", image: "/images/katz.jpg" },
    { id: 4, title: "KasBears", image: "/images/dogz.jpg" },
    { id: 5, title: "KasDogs", image: "/images/birdz.jpg" },
    { id: 6, title: "KasBullz", image: "/images/frogz.jpg" },
  ];

  return (
    <section class="relative scroll-mt-12 bg-purple-100" {...(id ? { id } : {})}>
      <div class="absolute inset-0 pointer-events-none -z-[1]" aria-hidden="true">
        <slot name="bg">
          <div class={twMerge("absolute inset-0", isDark ? "bg-gray-900 dark:bg-transparent" : "")}></div>
        </slot>
      </div>
      <div
        class={twMerge(
          "relative mx-auto max-w-7xl px-2 md:px-6 pb-4 pt-10 md:py-12 lg:py-12 text-default overflow-hidden",
          classes?.container,
          isDark ? "dark" : ""
        )}
      >
        <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
        <div class="w-full">
          {/* Carousel for mobile */}
          <div class="md:hidden">
            <Carousel.Root slidesPerView={1.2} class="max-w-full mx-auto overflow-hidden pb-12">
              <Carousel.Scroller class="flex overflow-x-auto snap-x snap-mandatory">
                {collections.map((collection) => (
                  <Carousel.Slide key={collection.id} class="snap-center shrink-0">
                    <div class="p-2">
                      <Card.Root class="overflow-hidden rounded-lg shadow-lg">
                        <Card.Content class="flex flex-col items-center justify-center p-2 bg-gray-800 text-center">
                          <img
                            src={collection.image}
                            alt={`${collection.title} Collection`}
                            class="w-full object-cover rounded-lg"
                          />
                          <h3 class="text-xl font-semibold text-white mt-2 w-full">{collection.title}</h3>
                        </Card.Content>
                      </Card.Root>
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel.Scroller>
              <Carousel.Previous class="text-white bg-gray-800 p-2 rounded-full" />
              <Carousel.Next class="text-white bg-gray-800 p-2 rounded-full" />
              <Carousel.Pagination class="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-2 z-10">
                {collections.map((_, index) => (
                  <Carousel.Bullet
                    key={index}
                    class="w-3 h-3 rounded-full bg-gray-400 data-[active]:bg-white transition-colors cursor-pointer"
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
                <div key={collection.id} class="p-4">
                  <Card.Root class="overflow-hidden rounded-lg shadow-lg">
                    <Card.Content class="flex flex-col items-center justify-center bg-gray-800">
                      <img
                        src={collection.image}
                        alt={`${collection.title} Collection`}
                        class="w-full object-cover rounded-t-lg"
                      />
                      <h3 class="text-xl font-semibold text-white mt-2">{collection.title}</h3>
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