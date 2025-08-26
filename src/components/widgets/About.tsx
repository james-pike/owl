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
        id="about"
        class="mx-auto scroll-mt-16 max-w-4xl px-4 pb-10 pt-10 md:py-14 lg:py-16 sm:px-6 lg:px-8"
      >
        <div class="bg-white/95 py-6 pb-1 md:pb-2 px-3 md:p-6 rounded-lg shadow-lg">
          <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
          
        </div>
      </section>
    </div>
  );
});