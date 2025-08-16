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
  const { title = "About KasKritterz", subtitle = "Discover the World", highlight = "", classes = {} } = props;

  return (
    <div class="max-w-7xl mx-auto bg-blue-100">
      <section
        id="story"
        class="mx-auto scroll-mt-16 max-w-5xl px-4 py-10 md:py-12 sm:px-6 lg:px-8"
      >
        <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="md:order-2 md:py-4">
            <h3 class="font-heading mb-2 text-lg text-gray-900 dark:text-slate-300">What is KasKritterz?</h3>
            <ul class="mb-4 space-y-1 text-gray-600 dark:text-slate-400">
              <li>Fun NFT series on Kaspa blockchain</li>
              <li>Started with 250 unique Mice</li>
              <li>Upcoming: Dinoz, Katz, Dogz, Bearz, Bullz</li>
              <li>Each with unique style and surprises</li>
            </ul>

            <h3 class="font-heading mt-4 mb-2 text-lg text-gray-900 dark:text-slate-300">Why KasKritterz?</h3>
            <ul class="mb-4 space-y-1 text-gray-600 dark:text-slate-400">
              <li>Rewards holders, connects Kaspa community</li>
              <li>Focuses on heart, humor, and storytelling</li>
              <li>Perfect for Kaspa, meme, and art lovers</li>
            </ul>

            <h3 class="font-heading mt-4 mb-2 text-lg text-gray-900 dark:text-slate-300">Who is it for?</h3>
            <ul class="mb-4 space-y-1 text-gray-600 dark:text-slate-400">
              <li>Kaspa supporters and NFT collectors</li>
              <li>Story/meme fans and new NFT explorers</li>
              <li>OGs and builders growing the movement</li>
            </ul>
          </div>
          <div class="relative md:order-1">
            <img
              src={sideImg}
              width={532}
              height={532}
              class="w-full rounded-md bg-gray-500 object-cover shadow-lg dark:bg-slate-700 aspect-square md:aspect-[532/704] md:absolute md:h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
});