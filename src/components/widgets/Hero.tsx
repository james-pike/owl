import { component$ } from "@builder.io/qwik";
import { LuSparkle, LuStar } from "@qwikest/icons/lucide"; // Updated to import LuStar

export default component$(() => {
  return (
    <section
      class="md:min-h-[90vh] border-b-2 bg-black  border-gray-300 flex items-center  bg-cover bg-no-repeat md:bg-[url('/images/banner2.webp')] bg-[center_30%]"
    >
      <div class="text-center w-full px-5 md:pt-96 pt-4">
        <video src="/images/logo2.mp4" playsInline autoplay muted loop class="h-full w-full"></video>

        <h2 class="!text-2xl md:!text-3xl text-white font-medium mb-6 ">
          First public Auto-Mint bot on KRC-20 / KRC-721. Never miss a mint again!       </h2>
        <a
          href="#"
          class="bg-teal-400 text-white text-xl mx-6 px-5 py-3 rounded-lg hover:bg-teal-300 hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <LuSparkle class="w-6 h-6 group-hover:text-teal-400" /> Mint Kaspa Owls
        </a>
        <div class="flex flex-col md:flex-row justify-center px-6 gap-4 md:gap-6 pt-4 pb-14">
          <a
            href="#"
            class="border-2 hover:filter hover:invert border-black text-black text-xl px-5 py-3 rounded-lg bg-white/85 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            <LuStar class="w-6 h-6 group-hover:text-teal-400" />
            Join Telegram
          </a>



        </div>
      </div>
    </section>
  );
});