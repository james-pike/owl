export const DarkThemeLauncher = () => (
  <script dangerouslySetInnerHTML={`if(localStorage.theme==="dark"){document.documentElement.classList.add("dark");}else if(typeof localStorage.theme==="undefined"){if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.classList.add("dark");}}`} />
);

// export const DarkThemeLauncher = () => (
//   <script dangerouslySetInnerHTML={`(function() {
//     if (!("theme" in localStorage)) {
//       localStorage.setItem("theme", "dark");
//       document.documentElement.classList.add("dark");
//     } else if (localStorage.theme === "dark") {
//       document.documentElement.classList.add("dark");
//     }
//   })();`} />
// );