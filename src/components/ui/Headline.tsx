import { twMerge } from "tailwind-merge";

interface Props {
  title?: string;
  subtitle?: string;
  highlight?: string;
  classes?: Record<string, string>;
  align?: "left" | "center" | "right"; // New prop for text alignment

}

export const Headline = (props: Props) => {
  const { title = "", subtitle = "", highlight = "", align = "center", classes = {} } = props;

  const {
    container: containerClass = "max-w-3xl",
    title: titleClass = "text-4xl md:text-5xl ",
    subtitle: subtitleClass = "text-xl",
  } = classes;

  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align] || "text-center"; // Default to "center" if not specified

  return (title || subtitle || highlight) ? (
      <div class={twMerge("mb-8 md:mx-auto md:mb-12 text-center", containerClass,  alignmentClass)}>
        {highlight && (
          <p
            class="text-base text-teal-500 font-bold tracking-wide uppercase"
            dangerouslySetInnerHTML={highlight}
          />
        )}
        {title && (
          <h2
            class={twMerge("font-bold leading-tighter syne-bold tracking-tighter font-heading text-heading", titleClass)}
            dangerouslySetInnerHTML={title}
          />
        )}

        {subtitle && <p class={twMerge("mt-4 text-muted", subtitleClass)} dangerouslySetInnerHTML={subtitle} />}
      </div>
    ) : null;
};













