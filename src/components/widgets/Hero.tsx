import { component$ } from "@builder.io/qwik";
import { LuStar, LuUsers } from "@qwikest/icons/lucide"; // Updated to import LuStar

export default component$(() => {
  return (
    <section
      class="md:min-h-[90vh] border-b-2 border-gray-300 flex items-center bg-[url('/images/mobile2.webp')] bg-cover bg-no-repeat md:bg-[url('/images/banner2.webp')] bg-[center_30%]"
    >
      <div class="text-center w-full px-4 md:pt-96 pt-52">

        <h2 class="!text-3xl md:!text-3xl text-white font-medium mb-4 mt-8 md:-mt-0">
           KasKritterz is a community-powered NFT universe, built in a world where Kaspa leads the future.        </h2>
       <div class="flex flex-col md:flex-row justify-center px-6 gap-4 md:gap-6 pt-4 pb-14">
              <a
  href="https://www.kaspa.com/nft/collections/OGMice"
  class="border-2 hover:filter hover:invert border-black text-black text-xl px-5 py-3 rounded-lg bg-white/90 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
 <LuStar class="w-6 h-6 group-hover:text-teal-400" /> 
Mint OG Mice
</a>
<a
  href="https://www.kaspa.com/nft/collections/KasKritter"
  class="bg-teal-400 text-white text-xl px-5 py-3 rounded-lg hover:bg-white hover:text-teal-400 transition-colors flex items-center justify-center gap-2"
>
  <LuStar class="w-6 h-6 group-hover:text-teal-400" /> Mint Bullz vs Bearz
</a>
<a
  href="https://t.me/KasKritterzOfficial"
  class="bg-blue-300 text-white text-xl px-5 py-3 rounded-lg hover:bg-white hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
>
  <LuUsers class="w-6 h-6 group-hover:text-blue-300" /> Join Community
</a>
 
</div>
      </div>
    </section>
  );
});