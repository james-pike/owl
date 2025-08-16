import { component$ } from "@builder.io/qwik";
import { LuStar, LuUsers } from "@qwikest/icons/lucide"; // Updated to import LuStar

export default component$(() => {
  return (
    <section
      class="md:min-h-[90vh] flex items-center bg-[url('/images/mobile2.png')] bg-cover bg-no-repeat md:bg-[url('/images/banner2.png')] bg-[center_30%]"
    >
      <div class="text-center w-full px-4 md:pt-96 pt-52">
              <div class="pt-6" />

        <h2 class="text-2xl md:text-3xl text-white font-medium mb-4">
          KasKritterz is a fun and collectible NFT series built on the Kaspa blockdag. 250 unique hand-crafted Mice, full of character, and ready to explore a world where Kaspa has already won.
        </h2>
        <div class="flex justify-center gap-4 md:gap-6 pt-4 pb-10">
          <a 
          href="https://www.kaspa.com/nft/collections/KasKritter"
 class="bg-teal-400 text-white text-2xl px-6 py-3 rounded-lg hover:bg-teal-300 transition-colors flex items-center gap-2">
            <LuStar class="w-8 h-8" /> Mint <span class="hidden md:block">Now</span>
          </a>
          <button class="bg-blue-300 text-white px-6 text-2xl py-3 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2">
            <LuUsers class="w-7 h-7" /> Join <span class="hidden md:block">Community</span> <span class="block md:hidden">Us!</span>
          </button>
        </div>
      </div>
    </section>
  );
});