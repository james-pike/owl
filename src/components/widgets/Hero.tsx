import { component$ } from "@builder.io/qwik";
import { LuStar, LuUsers } from "@qwikest/icons/lucide"; // Updated to import LuStar

export default component$(() => {
  return (
    <section
      class="md:min-h-[90vh] border-b-2 border-gray-300 flex items-center bg-[url('/images/mobile2.webp')] bg-cover bg-no-repeat md:bg-[url('/images/banner2.webp')] bg-[center_30%]"
    >
      <div class="text-center w-full px-4 md:pt-96 pt-52">

        <h2 class="text-2xl md:text-4xl text-white font-medium mb-4 -mt-4 md:-mt-0">
           KasKritterz is a community-powered NFT universe, built in a world where Kaspa leads the future.        </h2>
       <div class="flex flex-col md:flex-row justify-center px-6 gap-4 md:gap-6 pt-4 pb-14">
  <a
    href="https://www.kaspa.com/nft/collections/KasKritter"
    class="bg-teal-400 text-white text-xl px-5 py-3 rounded-lg hover:bg-teal-300 transition-colors flex items-center justify-center gap-2">
    <LuStar class="w-6 h-6" /> Mint KasKritterz
  </a>
  <a
                  href="https://t.me/KasKritterzOfficial"
     class="bg-blue-300 text-white px-5 text-xl py-3 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2">
    <LuUsers class="w-6 h-6" /> Join Community
  </a>
</div>
      </div>
    </section>
  );
});