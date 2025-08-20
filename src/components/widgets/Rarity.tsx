import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";
import RarityCheck from "./RarityCheck";

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

  return (
    <section class="relative scroll-mt-12 bg-[url('/images/steps.jpg')] bg-cover border-b border-gray-300" {...(id ? { id } : {})}>
      <div class="absolute inset-0 pointer-events-none -z-[1]" aria-hidden="true">
        <slot name="bg">
          <div class={twMerge("absolute inset-0", isDark ? "bg-dark dark:bg-transparent" : "")}></div>
        </slot>
      </div>
      <div
        class={twMerge(
          "relative mx-auto max-w-2xl px-4 py-10 md:py-14 lg:py-16 text-default",
          classes?.container,
          isDark ? "dark" : ""
        )}
      >
        <div class="bg-white/90 p-1 pt-6 md:pt-8 md:p-3 rounded-lg shadow-lg">
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <div class="-mt-6">
          <RarityCheck />
          </div>
        </div>
      </div>
    </section>
  );
});