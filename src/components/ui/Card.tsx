import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<'div'>>((props) => {
  return (
    <div
      {...props}
      class={cn(
        'relative rounded-sm max-w-7xl p-2 mx-auto shadow-sm',
        'border-[12px] border-gray-700', // Lighter stone color (gray-600)
        'shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(0,0,0,0.7),0_0_5px_rgba(17,24,39,0.5)]', // Shadows for carved effect
        props.class,
      )}
    >
      {/* Corner decorations (vines) */}
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-700 to-gray-600 rounded-sm opacity-70 -top-[10px] -left-[10px] rotate-45"
      ></div>
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-700 to-gray-600 rounded-sm opacity-70 -top-[10px] -right-[10px] rotate-[135deg]"
      ></div>
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-700 to-gray-600 rounded-sm opacity-70 -bottom-[10px] -left-[10px] rotate-[315deg]"
      ></div>
      <div
        class="absolute w-5 h-5 bg-gradient-to-br from-gray-700 to-gray-600 rounded-sm opacity-70 -bottom-[10px] -right-[10px] rotate-[225deg]"
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