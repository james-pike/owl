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
    
    <Tabs.List class="flex bg-white/70 flex-row gap-1 flex-nowrap overflow-x-auto md:grid md:grid-cols-5 w-full">

        <Tabs.Tab class="!text-lg data-[state=selected]:bg-teal-200 flex flex-col gap-1  md:flex-row"> 
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
</svg>          Bullz vs Bearz</Tabs.Tab>
        <Tabs.Tab class=" !text-lg data-[state=selected]:bg-teal-200 flex flex-col gap-1  md:flex-row"> 
          <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="40px" height="40px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">  <g> <path class="st0" d="M387.255,14.077c-67.996,0-123.172,54.422-124.606,122.082h-13.403 c-2.514-66.686-57.208-119.987-124.501-119.996C55.848,16.172,0.005,71.992,0,140.894c0.024,61.933,45.17,113.102,104.35,122.865 l106.8,151.262l0.024-0.019c2.288,3.438,4.973,6.528,7.979,9.23c-0.823,3.125-1.402,6.343-1.402,9.717 c0,21.125,17.126,38.252,38.252,38.252c21.12,0,38.248-17.127,38.248-38.252c0-3.374-0.58-6.592-1.398-9.708 c3.007-2.711,5.695-5.801,7.99-9.239l0.022,0.019l108.509-153.689C467.69,250.861,511.978,200.152,512,138.816 C511.995,69.915,456.148,14.077,387.255,14.077z M400.631,238.074l-5.295,0.698L280.718,401.111l-0.129,0.202 c-0.473,0.744-1.213,1.37-1.792,2.068c-6.381-4.771-14.218-7.695-22.794-7.695c-8.578,0-16.414,2.924-22.794,7.695 c-0.575-0.698-1.31-1.314-1.779-2.059l-0.138-0.221L118.259,241.025l-5.41-0.635c-49.734-5.883-88.4-48.171-88.376-99.496 c0.008-27.726,11.206-52.712,29.371-70.896c18.184-18.156,43.175-29.354,70.901-29.363c27.726,0.009,52.712,11.207,70.897,29.363 c18.165,18.184,29.362,43.17,29.372,70.896c0.005,1.83-0.175,4.036-0.354,6.711l-0.842,13.026h64.733l-1.122-13.266 c-0.257-3.024-0.44-5.855-0.44-8.55c0.008-27.726,11.206-52.722,29.371-70.905c18.184-18.156,43.17-29.354,70.896-29.362 c27.727,0.008,52.717,11.206,70.902,29.362c18.166,18.183,29.362,43.179,29.372,70.905 C487.551,189.636,449.644,231.519,400.631,238.074z"></path> <polygon class="st0" points="95.823,395.034 192.166,433.976 197.811,420.002 101.469,381.07 "></polygon> <rect x="139.285" y="422.574" transform="matrix(-0.335 -0.9422 0.9422 -0.335 -250.3301 770.7174)" class="st0" width="15.064" height="102.251"></rect> <rect x="313.238" y="463.829" transform="matrix(-0.9272 -0.3746 0.3746 -0.9272 527.1981 1045.2096)" class="st0" width="103.9" height="15.071"></rect> <rect x="314.065" y="397.656" transform="matrix(0.9422 -0.3351 0.3351 0.9422 -114.6626 145.798)" class="st0" width="102.245" height="15.065"></rect> <path class="st0" d="M124.745,90.268c-27.96,0-50.626,22.661-50.626,50.626c0,27.957,22.665,50.635,50.626,50.635 s50.626-22.678,50.626-50.635C175.37,112.929,152.705,90.268,124.745,90.268z"></path> <path class="st0" d="M387.255,88.181c-27.965,0-50.63,22.679-50.63,50.635c0,27.965,22.665,50.627,50.63,50.627 c27.961,0,50.626-22.662,50.626-50.627C437.882,110.86,415.216,88.181,387.255,88.181z"></path> <path class="st0" d="M204.582,274.588c-9.157,0-16.589,7.427-16.589,16.584s7.432,16.584,16.589,16.584 c9.156,0,16.588-7.427,16.588-16.584S213.738,274.588,204.582,274.588z"></path> <path class="st0" d="M307.424,274.588c-9.175,0-16.603,7.427-16.603,16.584s7.428,16.584,16.603,16.584 c9.156,0,16.584-7.427,16.584-16.584S316.58,274.588,307.424,274.588z"></path> </g> </g></svg>
           KasKritterz </Tabs.Tab>


      </Tabs.List>

      <Tabs.Panel>
            <BullzBearzTabs/> 
      </Tabs.Panel>

       <Tabs.Panel>
            <ItemTabs/> 
      </Tabs.Panel>

     

     


 
    </Tabs.Root>        
 </div>
        </div>
      </div>
    </section>
  );
});