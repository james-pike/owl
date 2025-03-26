import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import { Headline } from "../ui/Headline";
import { Card } from "../ui/Card";


const sideImg =
  "/images/wizard.jpg";

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

  // Intersection Observer to trigger animation


  return (
    <div class="max-w-7xl bg-gray-100 dark:bg-gray-900 mx-auto">
     
      <div class="max-w-6xl bg-gray-800 mx-auto">
      <Card.Root>
    <section
      id="story"
      class="mx-auto scroll-mt-16 max-w-5xl px-4 py-10 md:py-12 lg:py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
    >
        <Headline title={title} subtitle={"Chapter 1: Dawn Of The KasLords"} highlight={highlight} classes={classes?.headline} />
        
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
    </Card.Root>
    </div>
  
    </div>
  );
});