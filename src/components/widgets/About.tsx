import { component$ } from "@builder.io/qwik";
import { Headline } from "../ui/Headline";


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
    <div class="max-w-7xl mx-auto bg-[url('/images/collage.jpg')] bg-cover border-b border-gray-300">
      <section
        id="story"
        class="mx-auto scroll-mt-16 max-w-4xl px-4 pb-10 pt-10 md:py-14 lg:py-16 sm:px-6 lg:px-8"
      >
        <div class="bg-white/95 py-6 px-3 md:p-6 rounded-lg shadow-lg">
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="md:order-2 md:py-4 text-xl text-center -mt-4 md:text-left">
              We're crafting a fresh NFT experience that rewards holders, unites the Kaspa community, and weaves storytelling with humor and distinctive digital art. Far from chasing hype, KasKritterz is driven by heart and the joy of collaborative creation, making it a perfect fit for Kaspa enthusiasts, meme lovers, and art collectors alike.
            </div>
            <div class="relative md:order-1 text-xl  text-center pt-4 md:pt-0">
           <h1>KasKritterz blends humor, storytelling, and distinctive digital art to create a fresh NFT experience that rewards holders and connects the Kaspa community. It’s about creativity, collaboration, and having fun together.</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});