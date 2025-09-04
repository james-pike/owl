import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";
import { ItemTabs } from "./ItemTabs";
import { Tabs } from "../ui/Tabs";
import { BullzBearzTabs } from "./BullzBearzTabs";

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
    <section class="relative scroll-mt-12 bg-gradient-to-br from-teal-100 via-teal-200 to-teal-100 bg-cover border-b border-gray-300" {...(id ? { id } : {})}>
      <div class="absolute inset-0 pointer-events-none -z-[1]" aria-hidden="true">
        <slot name="bg">
          <div class={twMerge("absolute inset-0", isDark ? "bg-dark dark:bg-transparent" : "")}></div>
        </slot>
      </div>
      <div
        class={twMerge(
          "relative mx-auto max-w-4xl px-3 py-10 md:py-14 lg:py-16 text-default",
          classes?.container,
          isDark ? "dark" : ""
        )}
      >
        <div class="bg-white/50 p-1 pt-6 md:pt-8 md:p-2 md:py-0 rounded-lg shadow-lg">
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <div class="-mt-6">
            <Tabs.Root class="max-w-6xl">
              <Tabs.List class="flex bg-white/70 flex-row gap-1 flex-nowrap overflow-x-auto md:flex-row md:gap-2 w-full">
                <Tabs.Tab class="!text-lg data-[state=selected]:bg-teal-200 p-2 rounded-md md:p-2">
                  <div class="flex flex-row items-center gap-1 md:flex-col md:items-center md:gap-1">
                    <svg width="48px" height="48px" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M292.774 89C215.844 106.143 285.026 197.233 343 112.679"
                        stroke="#000000"
                        stroke-opacity="0.9"
                        stroke-width="16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M228.832 142.858C212.797 151.995 196.254 156.533 177.684 158.373C161.155 160.005 137.669 145.369 124.401 147.861C121.556 148.399 112.949 160.727 108.949 162.874C62.7313 187.678 83.8525 158.888 86.5698 230.433C87.2552 248.467 86.9517 266.456 86.041 284.477C85.9774 285.654 83.9896 311 84.9737 311C86.0067 311 88.5282 302.442 88.7044 301.992C96.91 280.789 116.504 247.971 141.453 240.94C205.243 222.97 230.535 305.496 233.096 305.496C240.753 305.496 234.692 291.167 234.692 283.976C234.692 270.286 241.052 250.748 249.081 239.441C261.595 221.811 277.659 208.618 299.696 202.406C305.052 200.902 313.796 198.898 319.412 200.406C320.352 200.659 324.949 204.213 325.806 203.409C328.974 200.433 325.586 174.747 326.34 168.379"
                        stroke="#000000"
                        stroke-opacity="0.9"
                        stroke-width="16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M79.4055 174.385C45.5828 165.761 60.0954 144.887 60.0954 142.858"
                        stroke="#000000"
                        stroke-opacity="0.9"
                        stroke-width="16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Bullz vs Bearz</span>
                  </div>
                </Tabs.Tab>

                <Tabs.Tab class="!text-lg data-[state=selected]:bg-teal-200 p-2 rounded-md md:p-2">
                  <div class="flex flex-row items-center gap-1 md:flex-col md:items-center md:gap-1">
                    <svg width="48px" height="48px" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M292.774 89C215.844 106.143 285.026 197.233 343 112.679"
                        stroke="#000000"
                        stroke-opacity="0.9"
                        stroke-width="16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M228.832 142.858C212.797 151.995 196.254 156.533 177.684 158.373C161.155 160.005 137.669 145.369 124.401 147.861C121.556 148.399 112.949 160.727 108.949 162.874C62.7313 187.678 83.8525 158.888 86.5698 230.433C87.2552 248.467 86.9517 266.456 86.041 284.477C85.9774 285.654 83.9896 311 84.9737 311C86.0067 311 88.5282 302.442 88.7044 301.992C96.91 280.789 116.504 247.971 141.453 240.94C205.243 222.97 230.535 305.496 233.096 305.496C240.753 305.496 234.692 291.167 234.692 283.976C234.692 270.286 241.052 250.748 249.081 239.441C261.595 221.811 277.659 208.618 299.696 202.406C305.052 200.902 313.796 198.898 319.412 200.406C320.352 200.659 324.949 204.213 325.806 203.409C328.974 200.433 325.586 174.747 326.34 168.379"
                        stroke="#000000"
                        stroke-opacity="0.9"
                        stroke-width="16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M79.4055 174.385C45.5828 165.761 60.0954 144.887 60.0954 142.858"
                        stroke="#000000"
                        stroke-opacity="0.9"
                        stroke-width="16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>KasKritterz</span>
                  </div>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel>
                <BullzBearzTabs />
              </Tabs.Panel>

              <Tabs.Panel>
                <ItemTabs />
              </Tabs.Panel>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </section>
  );
});