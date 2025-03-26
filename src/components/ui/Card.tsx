import { component$, type PropsOf, Slot, useStyles$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const styles = `
  .fancy-border {
    box-shadow: 
      inset 0 0 22px rgba(0, 0, 0, 0.85), /* Slightly scaled-down carved effect */
      0 0 13px rgba(0, 0, 0, 0.65), /* Slightly scaled-down outer shadow */
      0 0 5px rgba(17, 24, 39, 0.45); /* Subtle glow with slightly lower opacity */
  }
  .fancy-border-sm {
    box-shadow: 
      inset 0 0 15px rgba(0, 0, 0, 0.7), /* Unchanged, already scaled */
      0 0 10px rgba(0, 0, 0, 0.5), /* Unchanged, already scaled */
      0 0 5px rgba(17, 24, 39, 0.5); /* Unchanged */
  }
  .inner-border {
    box-shadow: 
      inset 0 0 10px rgba(0, 0, 0, 0.5), /* Unchanged */
      0 0 5px rgba(0, 0, 0, 0.3); /* Unchanged */
  }
  .button-border {
    box-shadow: 
      0 0 5px rgba(55, 65, 81, 0.4), /* Unchanged */
      inset 0 0 3px rgba(255, 255, 255, 0.2); /* Unchanged */
  }
`;

const Root = component$<PropsOf<'div'>>((props) => {
  useStyles$(styles);

  return (
    <div
      {...props}
      class={cn(
        'fancy-border relative rounded-sm max-w-7xl p-[7px] mx-[7px] my-[5px] mx-auto',
        'border-[10px] border-gray-800',
        'before:content-[""] before:absolute before:-top-[5px] before:-left-[5px] before:-right-[5px] before:-bottom-[5px]',
        'before:border-[2.5px] before:border-transparent before:bg-gradient-to-r before:from-gray-900 before:to-gray-800',
        'before:shadow-inner before:shadow-[inset_0_0_9px_rgba(0,0,0,0.7)] before:opacity-55 before:-z-10',
        props.class,
      )}
    >
      <div
        class="absolute w-[18px] h-[18px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -top-[9px] -left-[9px] rotate-45"
      ></div>
      <div
        class="absolute w-[18px] h-[18px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -top-[9px] -right-[9px] rotate-[135deg]"
      ></div>
      <div
        class="absolute w-[18px] h-[18px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -bottom-[9px] -left-[9px] rotate-[315deg]"
      ></div>
      <div
        class="absolute w-[18px] h-[18px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -bottom-[9px] -right-[9px] rotate-[225deg]"
      ></div>
      <Slot />
    </div>
  );
});

const Header = component$<PropsOf<'div'>>((props) => {
  return (
    <div
      {...props}
      class={cn(
        'inner-border flex flex-col space-y-0 bg-gray-700 dark:bg-gray-700 p-4',
        'border-[3px] border-gray-700 rounded-sm',
        props.class
      )}
    >
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
    <div
      {...props}
      class={cn(
        'fancy-border-sm relative rounded-sm p-2 bg-gray-800 dark:bg-gray-800',
        'border-[6px] border-gray-800', // Thinner border, same color as Root
        // Scaled-down vine-like etched effect
        'before:content-[""] before:absolute before:-top-[4px] before:-left-[4px] before:-right-[4px] before:-bottom-[4px]',
        'before:border-[2px] before:border-transparent before:bg-gradient-to-r before:from-gray-900 before:to-gray-800',
        'before:shadow-inner before:shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] before:opacity-60 before:-z-10',
        props.class
      )}
    >
      {/* Scaled-down vine decorations */}
      <div
        class="absolute w-4 h-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -top-[8px] -left-[8px] rotate-45"
      ></div>
      <div
        class="absolute w-4 h-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -top-[8px] -right-[8px] rotate-[135deg]"
      ></div>
      <div
        class="absolute w-4 h-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -bottom-[8px] -left-[8px] rotate-[315deg]"
      ></div>
      <div
        class="absolute w-4 h-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-sm opacity-70 -bottom-[8px] -right-[8px] rotate-[225deg]"
      ></div>
      <Slot />
    </div>
  );
});

const Footer = component$<PropsOf<'div'>>((props) => {
  return (
    <div
      {...props}
      class={cn(
        'inner-border flex items-center p-6 pt-0',
        'border-[3px] border-gray-700 rounded-sm',
        props.class
      )}
    >
      <Slot />
    </div>
  );
});

const Button = component$<PropsOf<'button'>>((props) => {
  return (
    <button
      {...props}
      class={cn(
        'button-border px-4 py-2 font-semibold rounded-sm',
        'border-[2px] border-gray-600',
        'bg-gray-700 text-gray-100 hover:bg-gray-600 transition-colors',
        props.class
      )}
    >
      <Slot />
    </button>
  );
});

const Image = component$<PropsOf<'img'>>((props) => {
  return <img {...props} class={cn('w-full object-cover', props.class)} />;
});

export const Card = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Footer,
  Button,
  Image,
};