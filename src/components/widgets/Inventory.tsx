import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";


import { Card } from "../ui/Card";
import NewTabs from "./NewTabs";

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
            "relative mx-auto px-4 max-w-4xl sm:px-6 pt-10 pb-6 md:py-12 lg:py-12 text-default",
            classes?.container,
            isDark ? "dark" : ""
          )}
        >
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
         <NewTabs/>

        </div>
      </Card.Root>
    </section>
  );
});