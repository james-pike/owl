import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section
      class="md:min-h-[90vh] flex items-center bg-[url('/images/mobile2.png')] bg-cover bg-no-repeat md:bg-[url('/images/banner2.png')] bg-[center_20%]"
    >
      <div class="text-center w-full px-4 md:pt-96 pt-64">
        <h2 class="text-2xl md:text-3xl text-white font-medium mb-4">KasKritterz is a fun and collectible NFT series built on the Kaspa blockchain. 250
hand-crafted Mice, each one unique, full of character, and ready to explore a world where Kaspa
has already won.

</h2>
        <div class="flex justify-center gap-4 pt-4 pb-10">
          <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Mint Now
          </button>
          <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </section>
  );
});