import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import { Headline } from "../ui/Headline";

const sideImg =
  "/images/placeholder.png";

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
    const { title = "", subtitle = "", highlight = "", classes = {}, } = props;

  


  // Signal to track visibility
  const isVisible = useSignal(false);

  // Intersection Observer to trigger animation
  useVisibleTask$(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;
          observer.disconnect(); // Disconnect after first intersection
        }
      },
      { threshold: 0.2 } // Trigger when 10% of the section is visible
    );

    const element = document.querySelector("#steps-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });

  return (
    <div class="max-w-7xl bg-gray-100 dark:bg-gray-900 mx-auto">
    <section
      id="story"
      class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
    >
                <Headline title={title} highlight={highlight} classes={classes?.headline} />
        
      <div class="row-gap-0 grid gap-0 md:grid-cols-2">
        <div class="mb-4 md:mb-0 md:py-4 md:pr-0 md:order-2">
          {title && <h2 class="font-heading mb-8 text-xl  lg:text-xl">{subtitle}</h2>}
          
        </div>
        <div class="relative md:order-1">
            <Image
              layout="constrained"
              src={sideImg}
              width={532}
              height={704}
            
              class="inset-0 w-full rounded-md bg-gray-500  object-cover object-top shadow-lg dark:bg-slate-700 md:absolute md:h-full"
              breakpoints={[320, 480, 640, 1024]}
            />
        
        </div>
      </div>
    </section>
    </div>
  );
});