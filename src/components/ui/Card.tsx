import { component$, type PropsOf, Slot, useStyles$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const styles = `
  .fancy-border {
    box-shadow: 
      inset 0 0 25px rgba(0, 0, 0, 0.9), /* Deeper carved effect */
      0 0 15px rgba(0, 0, 0, 0.7), /* Outer shadow for depth */
      0 0 5px rgba(17, 24, 39, 0.5); /* Subtle glow (gray-900 tint) */
  }
`;

const Root = component$<PropsOf<'div'>>((props) => {
  useStyles$(styles);

  return (
    <div
      {...props}
      class={cn(
        'fancy-border relative rounded-sm max-w-7xl p-2 mx-2 my-2 mx-auto shadow-sm',
        'border-[12px] border-gray-800', // Solid gray-800 border, adjustable via props.class
        // Vine-like etched effect (converted to Tailwind)
        'before:content-[""] before:absolute before:-top-[6px] before:-left-[6px] before:-right-[6px] before:-bottom-[6px]',
        'before:border-[3px] before:border-transparent before:bg-gradient-to-r before:from-gray-900 before:to-gray-800',
        'before:shadow-inner before:shadow-[inset_0_0_10px_rgba(0,0,0,0.7)] before:opacity-60 before:-z-10',
        props.class,
      )}
    >
      {/* Vine decorations (converted to Tailwind, using simple rotated squares) */}
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -top-[10px] -left-[10px] rotate-45"
      ></div>
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -top-[10px] -right-[10px] rotate-[135deg]"
      ></div>
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -bottom-[10px] -left-[10px] rotate-[315deg]"
      ></div>
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -bottom-[10px] -right-[10px] rotate-[225deg]"
      ></div>
      <Slot />
    </div>
  );
});

const Header = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('flex flex-col space-y-0 bg-gray-700 dark:bg-gray-700 p-4', props.class)}>
      <Slot />
    </div>
  );
});

const Title = component$<PropsOf<'h3'>>((props) => {
  return (
    <h3 {...props} class={cn('font-medium leading-none tracking-tight text-gray-100', props.class)}>
      <Slot />
    </h3>
  );
});

const Description = component$<PropsOf<'p'>>((props) => {
  return (
    <p {...props} class={cn('text-sm text-gray-400', props.class)}>
      <Slot />
    </p>
  );
});

const Content = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('p-4 bg-gray-800 dark:bg-gray-800', props.class)}>
      <Slot />
    </div>
  );
});

const Footer = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div {...props} class={cn('flex items-center p-6 pt-0', props.class)}>
      <Slot />
    </div>
  );
});

const Image = component$<PropsOf<'img'>>(({ ...props }) => {
  return <img {...props} class={cn('w-full object-cover', props.class)} />;
});

export const Card = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Footer,
  Image,
};