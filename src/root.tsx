import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/common/RouterHead";

// import "@fontsource-variable/inter";
import styles from  "~/assets/styles/global.css?inline";
import { ObserverProvider } from "./components/common/ObserverProvider";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  useStyles$(styles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/images/banner2.webp" as="image" media="(min-width: 768px)" />
        <link rel="preload" href="/images/mobile2.webp" as="image" media="(max-width: 767px)" />
        <RouterHead />
        <ServiceWorkerRegister />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap" rel="stylesheet"/>
      </head>
      <body class="text-gray-900 dark:text-slate-300 tracking-tight border-gray-300 mx-auto md:border-x  overflow-x-hidden dark:border-gray-800 bg-white max-w-7xl  dark:bg-gray-950 antialiased">
      <ObserverProvider>
        <RouterOutlet />
        </ObserverProvider>
      </body>
    </QwikCityProvider>
  );
});