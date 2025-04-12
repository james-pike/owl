import { component$, useSignal } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";

import ClassSelect from "./ClassSelect";
import Items from "./Items";
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

const classImages = [
  { name: 'Wizard', image: '/images/wizard.jpg' },
  { name: 'Elf', image: '/images/elf.jpg' },
  { name: 'Rogue', image: '/images/rogue.png' },
  { name: 'Cleric', image: '/images/cleric.png' },
  { name: 'Ranger', image: '/images/ranger.png' },
  { name: 'Paladin', image: '/images/paladin.png' },
];

export default component$((props: Props) => {
  const { id, title = "", subtitle = "", highlight = "", classes = {}, isDark = false } = props;

  const selectedClass = useSignal('Wizard'); // Default class

  const selectedImage = classImages.find(
    (c) => c.name === selectedClass.value
  )?.image;

  return (
    <section class="relative scroll-mt-16 mx-auto max-w-7xl mb-6" {...(id ? { id } : {})}>
      <Card.Root class="bg-gray-900">
        <div class="absolute inset-0 max-w-7xl pointer-events-none -z-[1]" aria-hidden="true">
          <slot name="bg">
            <div class={twMerge("absolute inset-0 max-w-6xl dark:bg-gray-800", isDark ? "bg-dark dark:bg-transparent" : "")}></div>
          </slot>
        </div>
        <div
          class={twMerge(
            "relative mx-auto px-4 max-w-5xl sm:px-6 pt-10 pb-6 md:py-12 lg:py-12 text-default",
            classes?.container,
            isDark ? "dark" : ""
          )}
        >
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <div class="md:grid md:grid-cols-3 md:gap-2">
            <div class="hidden md:block">
              <Card.Content class="h-full">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={selectedClass.value}
                    class=" w-full h-full object-cover"
                  />
                ) : (
                  <div class="text-gray-500">No image available</div>
                )}
              </Card.Content>
            </div>
            {/* Left 2/3: stacked Card.Contents */}
            <div class="md:col-span-2 flex flex-col gap-2">
              <Card.Content>
                <div class="w-full">
                  <ClassSelect selectedClass={selectedClass} />
                </div>
              </Card.Content>
              <Card.Content>
                <Items selectedClass={selectedClass.value} />
              </Card.Content>
            </div>

            {/* Right 1/3: full-height Card.Content */}

          </div>

        </div>
      </Card.Root>
    </section>
  );
});