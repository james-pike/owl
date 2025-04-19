import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import Footer from "~/components/widgets/Footer";
import Header from "~/components/widgets/Header";
import { inject } from "@vercel/analytics";

export default component$(() => {
  
  useVisibleTask$(() => {
    inject(); // Runs only on client side
  });

  return (
    <>
      <Header />
      <main class="bg-gray-900">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
