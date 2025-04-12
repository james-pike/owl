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

export default component$((props: Props) => {
  const { id, title = "", subtitle = "", highlight = "", classes = {}, isDark = false } = props;

  const selectedClass = useSignal('Wizard'); // Default class


  return (
    <section class="relative scroll-mt-16 mx-auto max-w-7xlmb-6 " {...(id ? { id } : {})}>
      <Card.Root class="bg-gray-900">
        <div class="absolute inset-0 max-w-7xl pointer-events-none -z-[1]" aria-hidden="true">
          <slot name="bg">
            <div class={twMerge("absolute inset-0  max-w-6xl dark:bg-gray-800", isDark ? "bg-dark dark:bg-transparent" : "")}></div>
          </slot>
        </div>
        <div
          class={twMerge(
            "relative mx-auto max-w-3xl px-2 md:px-6 pt-10 pb-6 md:py-12   lg:py-12 text-default",
            classes?.container,
            isDark ? "dark" : ""
          )}
        >
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <Card.Content>
          <div class="grid md:grid-cols-1">
          
              <div class="md:mr-4 flex justify-end">
               
                <ClassSelect  selectedClass={selectedClass} />
              </div>

              <div></div>

          </div>
          </Card.Content>
          <Card.Content>

          <Items selectedClass={selectedClass.value} />

          </Card.Content>
     
        </div>
      </Card.Root>
    </section>
  );
});
