import { component$ } from "@builder.io/qwik";
import { Headline } from "../ui/Headline";
import { Accordion } from "../ui/Accordion";

const sideImg = "/images/faq.png"; // Adjust the image path as needed for FAQs

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
  const { title = "", subtitle = "", highlight = "", classes = {} } = props;

  return (
    <div class="max-w-7xl mx-auto bg-[url('/images/Kaspa-camisa.png')] bg-cover bg-center">
      <div class="max-w-7xl mx-auto">
        <section
          id="faq"
          class="mx-auto scroll-mt-16 max-w-5xl px-4 py-10 md:py-12 lg:py-12 sm:px-6 lg:px-8"
        >
          <Headline
            title={title || "Frequently Asked Questions"}
            subtitle={subtitle}
            highlight={highlight}
            classes={classes?.headline}
          />
          <div class="row-gap-0 grid md:gap-8 md:grid-cols-2">
            <div class="mb-4 md:mb-0 md:py-4 md:pr-0 md:order-2">
              <Accordion.Root collapsible class="w-full">
                <Accordion.Item id="item-1">
                  <Accordion.Trigger class="text-left">
                    What are the KAS rewards in KasKritterz?
                  </Accordion.Trigger>
                  <Accordion.Content>
                    Some NFTs in each KasKritterz collection come with KAS rewards! These special Kritterz are randomly minted and revealed to the lucky holders. All rewards and announcements are shared with our community on Telegram and X.
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item id="item-2">
                  <Accordion.Trigger class="text-left">
                    What do I get for holding multiple KasKritterz?
                  </Accordion.Trigger>
                  <Accordion.Content>
                    If you’re stacking Kritterz, you’re in luck. Holders of multiple NFTs will be eligible for exclusive airdrops, including collectible Kaspa-native cartoons and other perks. Details and snapshots will be announced in the community.
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item id="item-3">
                  <Accordion.Trigger class="text-left">
                    How much does it cost to mint a KasKritterz NFT?
                  </Accordion.Trigger>
                  <Accordion.Content>
                    The first drop, KasKritterz Mice, minted at 250 KAS each. Future collections like Dinoz, Katz, and Dogz will have different mint prices—these will be announced before launch.
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item id="item-4">
                  <Accordion.Trigger class="text-left">
                    What’s the future of KasKritterz?
                  </Accordion.Trigger>
                  <Accordion.Content>
                    KasKritterz is more than art: it’s a mission to expand Kaspa adoption through storytelling, humor, and community. We’re building toward: <br />
                    • A universe of new Kritterz <br />
                    • Ongoing cartoons minted on Kaspa <br />
                    • Merch and collectibles <br />
                    • Events and community collaborations
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
            <div class="relative md:order-1">
              <img
                src={sideImg}
                width={532} // Square base width
                height={532} // Square base height (equal to width)
                class="inset-0 w-full rounded-md bg-gray-500 object-cover shadow-lg dark:bg-slate-700 aspect-square md:aspect-[532/704] md:absolute md:h-full"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});