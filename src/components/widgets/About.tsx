import { component$ } from "@builder.io/qwik";
import { Headline } from "../ui/Headline";

const sideImg = "/images/story.png";

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

  return (
      <div class="max-w-7xl mx-auto">
          <section
            id="story"
            class="mx-auto scroll-mt-16 max-w-5xl px-4 py-10 md:py-12 lg:py-12 sm:px-6 lg:px-8"
          >
            <Headline
              title={title}
              // subtitle={"Chapter 1: Dawn Of The KasLords"}
              highlight={highlight}
              classes={classes?.headline}
            />
            <div class="row-gap-0 grid md:gap-8 md:grid-cols-2">
              <div class="mb-4 md:mb-0 md:py-4 md:pr-0 md:order-2">
                {title && (
                  <h2 class="font-heading mb-8 text-xl lg:text-xl">{subtitle}</h2>
                )}
              </div>
              <div class="relative md:order-1">
                <img
                  
                  src={sideImg}
                  width={532} // Square base width
                  height={532} // Square base height (equal to width)
                  class="inset-0 w-full rounded-md bg-gray-500 object-cover shadow-lg dark:bg-slate-700 aspect-square md:aspect-[532/704] md:absolute md:h-full"
                 
                />
              </div>
            </div>
          </section>
      </div>
  );
});