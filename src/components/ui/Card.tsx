import { component$, type PropsOf, Slot, useStyles$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const styles = `
  .fancy-border {
    box-shadow: 
      inset 0 0 25px rgba(0, 0, 0, 0.9), /* Deeper carved effect */
      0 0 15px rgba(0, 0, 0, 0.7), /* Outer shadow for depth */
      0 0 5px rgba(17, 24, 39, 0.5); /* Subtle glow (gray-900 tint) */
  }
  .fancy-border-sm {
    box-shadow: 
      inset 0 0 15px rgba(0, 0, 0, 0.7), /* Scaled-down carved effect */
      0 0 10px rgba(0, 0, 0, 0.5), /* Scaled-down outer shadow */
      0 0 5px rgba(17, 24, 39, 0.5); /* Same subtle glow */
  }
  .inner-border {
    box-shadow: 
      inset 0 0 10px rgba(0, 0, 0, 0.5), /* Subtle carved effect for inner sections */
      0 0 5px rgba(0, 0, 0, 0.3); /* Light outer shadow */
  }
  .button-border {
    box-shadow: 
      0 0 5px rgba(55, 65, 81, 0.4), /* Subtle gray-700 glow */
      inset 0 0 3px rgba(255, 255, 255, 0.2); /* Light shine for depth */
  }
`;

const Root = component$<PropsOf<'div'>>((props) => {
  useStyles$(styles);

  return (
    <div
      {...props}
      class={cn(
        'fancy-border relative rounded-sm max-w-7xl p-2 mx-2 my-1.5 mx-auto shadow-sm',
        'border-[12px] border-gray-800',
        'before:content-[""] before:absolute before:-top-[6px] before:-left-[6px] before:-right-[6px] before:-bottom-[6px]',
        'before:border-[3px] before:border-transparent before:bg-gradient-to-r before:from-gray-900 before:to-gray-800',
        'before:shadow-inner before:shadow-[inset_0_0_10px_rgba(0,0,0,0.7)] before:opacity-60 before:-z-10',
        props.class,
      )}
    >
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