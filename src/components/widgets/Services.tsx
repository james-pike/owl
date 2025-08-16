import { component$ } from "@builder.io/qwik";
import { Headline } from "../ui/Headline";

const sideImg = "/images/k-d.jpg";

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
  const { title = "", highlight = "", classes = {} } = props;

  return (
    <div class="max-w-7xl mx-auto bg-teal-100">
      <section
        id="about"
        class="mx-auto scroll-mt-16 max-w-5xl px-4 py-10 md:py-12 lg:py-12 sm:px-6 lg:px-8"
      >
        <div class="bg-white/50 p-6 rounded-lg shadow-lg">
          <Headline
            title={title}
            highlight={highlight}
            classes={classes?.headline}
          />
          <div class="row-gap-0 grid md:gap-8 md:grid-cols-2">
            <div class="mb-4 md:mb-0 md:py-4 px-2 md:pr-0 md:order-1">
              <ul class="list-disc pl-5 dark:text-gray-400 text-lg md:text-xl space-y-2">
                <li>Create playful, story-rich NFT characters living in a Kaspa-powered world</li>
                <li>Build a strong, inclusive community of Kaspa lovers and collectors</li>
                <li>Drop surprise Kas rewards to some minters</li>
                <li>Send airdrop cartoon strips to NFT holders, minted right on the Kaspa blockdag</li>
                <li>Collaborate with creators and projects inside the Kaspa ecosystem</li>
                <li>Celebrate fun, freedom, and decentralization!</li>
              </ul>
            </div>
            <div class="relative md:order-2">
              <img
                src={sideImg}
                width={532}
                height={532}
                alt="About KasKritterz"
                class="inset-0 w-full rounded-md bg-gray-500 object-cover shadow-lg dark:bg-slate-700 aspect-square md:aspect-[532/704] md:absolute md:h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});