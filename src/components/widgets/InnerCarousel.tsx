import { component$ } from "@builder.io/qwik";
import { Card } from "../ui/Card";

const innerRealm = [
    {
        name: "Crypto_Dutchmen",
        role: "First Member",
        // bio: "Originator of the KasLords prophecy, guardian of the Guilded Gate, and bearer of vision and vigilance.",
        image: "/images/dutchman.jpg",
        alt: "CryptoDutchman portrait",
    },
    {
        name: "Kaspa Queen",
        role: "Flamebearer of First Spark",
        // bio: "Originator of the KasLords prophecy, guardian of the Guilded Gate, and bearer of vision and vigilance.",
        image: "/images/queen.jpg",
        alt: "CryptoNinja portrait",
    },



];

export default component$(() => {
    return (
        <div
            id="team-grid"
            class="grid mx-auto max-w-screen-xl mt-2 md:mb-12 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
            {innerRealm.map(({ name, role, image, alt, }, index) => (
                <div
                    key={index}
                    class="group relative overflow-hidden rounded-lg shadow-md"
                >
                    <Card.Content class="p-1">
                        <div class="relative aspect-[2/2.2]">
                            <img
                                width={500}
                                height={600}
                                src={image}
                                alt={alt}
                                loading="eager"
                                class="w-full h-full object-cover rounded-sm transition-transform bg-primary-50 duration-300"
                            />
                        </div>
                        <div class="px-4 py-3 bg-gray-100 dark:bg-gray-800">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                            {/* <p class="text-sm text-secondary-700 dark:text-secondary-600">{role}</p> */}
                            {/* <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{bio}</p> */}

                            {/* <div class="flex space-x-4">
                                {twitter && (
                                    <a
                                        href={twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-primary-600 dark:text-secondary-700 hover:text-secondary-600 transition-colors"
                                        aria-label={`${name} on Twitter`}
                                    >
                                        <LuTwitter class="w-5 h-5" />
                                    </a>
                                )}
                                {telegram && (
                                    <a
                                        href={telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-primary-600 dark:text-secondary-700 hover:text-secondary-600 transition-colors"
                                        aria-label={`${name} on Telegram`}
                                    >
                                        <LuSend class="w-5 h-5" />
                                    </a>
                                )}
                            </div> */}
                        </div>
                    </Card.Content>
                </div>
            ))}
        </div>
    );
});