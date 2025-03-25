import { component$, useSignal } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";

import ClassSelect from "./ClassSelect";
import Items from "./Items";
import { Label } from "../ui/Label";

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
    <section  class="relative scroll-mt-16" {...(id ? { id } : {})}>
      <div class="absolute inset-0 pointer-events-none -z-[1]" aria-hidden="true">
        <slot name="bg">
          <div class={twMerge("absolute inset-0 bg-gray-100 dark:bg-gray-900", isDark ? "bg-dark dark:bg-transparent" : "")}></div>
        </slot>
      </div>
      <div
        class={twMerge(
          "relative mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-12 lg:py-12 text-default",
          classes?.container,
          isDark ? "dark" : ""
        )}
      >
        <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
<div class="grid md:grid-cols-2">
    <div class="md:mr-4 flex justify-end">
        <Label>Select a class:</Label>
<ClassSelect selectedClass={selectedClass} />
</div>

        <div></div>

        </div>
        <Items selectedClass={selectedClass.value} />
        </div>
    </section>
  );
});
