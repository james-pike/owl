import { component$ } from "@builder.io/qwik";
import IconBrandTailwind from "../icons/IconBrandTailwind";
import IconBrandGoogle from "../icons/IconBrandGoogle";
import Carousel from "../ui/Carousel";
import LogoClouds from "./LogoClouds";

export default component$(() => {
  return (
    <section>
      <div class="grid grid-cols-2 grid-rows-[84%_16%] h-[calc(100vh-85.66667px)]">
        <div class="bg-gradient-to-r from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-700 flex items-center px-8">
          <div>
            <h1 class="text-4.5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200 animate-hero-text">
              KasLords Of The BlockDag <br class="hidden lg:block" />{" "}
            </h1>
            <div class="max-w-3xl mx-auto lg:max-w-none">
              <p class="text-xl text-muted mb-5 dark:text-slate-300 animate-hero-subtitle">
              Own a piece of this legendary saga, forged in the fires of creativity and secured on the blockchain—join the Kaslords and claim your dominion today!
              </p>
              <div class="max-w-xs sm:max-w-md animate-hero-buttons m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-3 lg:justify-start lg:m-0 lg:max-w-7xl">
                <div class="flex w-full sm:w-auto">
                  <a class="btn btn-primary sm:mb-0 w-full" href="tel:+16132188063">
                    <IconBrandTailwind class="mr-1" /> Mint KasLords
                  </a>
                </div>
                <div class="flex w-full sm:w-auto">
                  <a class="btn btn-secondary sm:mb-0 w-full" href="/contact">
                    <IconBrandGoogle class="mr-1" /> Join The Clan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-red-400 h-full w-full">
          <Carousel />
        </div>
        <div class="bg-gradient-to-r from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-700 col-span-2 flex items-center">
            <LogoClouds/>
        </div>
      </div>
    </section>
  );
});