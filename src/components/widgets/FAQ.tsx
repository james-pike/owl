import { component$ } from "@builder.io/qwik";
import { Headline } from "../ui/Headline";
import { Accordion } from "../ui/Accordion";

const sideImg = "/images/krit2.jpg"; // Adjust the image path as needed for FAQs

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
        <div class="max-w-7xl mx-auto bg-[url('/images/blockdag.jpg')] bg-cover bg-center relative flipped-bg">
            <div class="max-w-7xl mx-auto">
                <section
                    id="faq"
                    class="mx-auto scroll-mt-16 max-w-5xl px-4 py-10 md:py-14 lg:py-16 sm:px-6 lg:px-8"
                >
                    {/* Semi-transparent container for FAQs */}
                    <div class="bg-white/90 dark:bg-slate-800/80 rounded-lg shadow-lg p-6 md:p-8">
                        <Headline
                            title={title || "Frequently Asked Questions"}
                            subtitle={subtitle}
                            highlight={highlight}
                            classes={classes?.headline}
                        />

                        <div class="row-gap-0 grid md:gap-8 md:grid-cols-2">
                            <div class="mb-4 md:mb-0 md:py-2 md:pr-0 md:order-2">
                                <Accordion.Root
                                    collapsible
                                    class="w-full"
                                    style={{ touchAction: "manipulation", overscrollBehavior: "contain" }}
                                >
                                    {/* 1. Updated first question */}
                                    <Accordion.Item id="item-1">
                                        <Accordion.Trigger class="text-left">
                                            What are the KAS rewards in KasKritterz?
                                        </Accordion.Trigger>
                                        <Accordion.Content>
                                            Some NFTs in each KasKritterz collection come with KAS rewards! 
                                            All rewards and announcements are shared with our community on Telegram and X.
                                        </Accordion.Content>
                                    </Accordion.Item>

                                    {/* 2. Holding multiple */}
                                    <Accordion.Item id="item-2">
                                        <Accordion.Trigger class="text-left">
                                            What do I get for holding multiple KasKritterz?
                                        </Accordion.Trigger>
                                        <Accordion.Content>
                                            If you’re stacking Kritterz, you’re in luck. Holders of multiple NFTs will be eligible 
                                            for exclusive airdrops, including collectible Kaspa-native cartoons and other perks. 
                                            Details and snapshots will be announced in the community.
                                        </Accordion.Content>
                                    </Accordion.Item>

                                    {/* 3. NEW - OG Mice */}
                                    <Accordion.Item id="item-3">
                                        <Accordion.Trigger class="text-left">
                                            Why do I need the OG Mice?
                                        </Accordion.Trigger>
                                        <Accordion.Content>
                                            They’re the genesis of the KasKritterz Universe. 
                                            To receive an airdrop, you need at least one OG Mice in your wallet.
                                        </Accordion.Content>
                                    </Accordion.Item>

                                    {/* 4. NEW - KritterPass */}
                                    <Accordion.Item id="item-4">
                                        <Accordion.Trigger class="text-left">
                                            What is a KritterPass?
                                        </Accordion.Trigger>
                                        <Accordion.Content>
                                            If you hold at least one Kritter from each collection and support the community, 
                                            you may receive a KritterPass. This gives you exclusive airdrops, Kaspa rewards, 
                                            and a voice in Kritterz decisions. You become part of the team!
                                        </Accordion.Content>
                                    </Accordion.Item>

                                    {/* 5. Updated future question (last one) */}
                                    <Accordion.Item id="item-5">
                                        <Accordion.Trigger class="text-left">
                                            What’s the future of KasKritterz?
                                        </Accordion.Trigger>
                                        <Accordion.Content>
                                            We’ll keep hand-crafting cute art while expanding into: <br />
                                            • A growing universe of new Kritterz <br />
                                            • Cartoons minted on Kaspa <br />
                                            • Exclusive merch & collectibles <br />
                                            • Community-driven events & collabs
                                        </Accordion.Content>
                                    </Accordion.Item>
                                </Accordion.Root>
                            </div>

                            {/* Side Image */}
                            <div class="relative md:order-1">
                                <div class="w-full h-[600px] md:h-[600px]  overflow-hidden rounded-md">
                                    <img
                                        src={sideImg}
                                        width={532}
                                        height={500}
                                        class="w-full h-full object-cover bg-gray-500 shadow-lg dark:bg-slate-700"
                                        style={{ transform: "scale(1)" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
