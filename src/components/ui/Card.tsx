import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<'div'>>((props) => {
  return (
    <div
      {...props}
      class={cn(
        'rounded-sm border-2 max-w-6xl bg-gray-100 p-2 mx-4 my-4 mx-auto border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-sm',
        props.class,
      )}
    >
      <Slot />
    </div>
  );
});

const Header = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('flex flex-col space-y-0 bg-white dark:bg-gray-900 p-4', props.class)}>
      <Slot />
    </div>
  );
});

const Title = component$<PropsOf<'h3'>>((props) => {
  return (
    <h3 {...props} class={cn('font-medium leading-none tracking-tight', props.class)}>
      <Slot />
    </h3>
  );
});

const Description = component$<PropsOf<'p'>>((props) => {
  return (
    <p {...props} class={cn('text-sm text-muted-foreground', props.class)}>
      <Slot />
    </p>
  );
});

const Content = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('p-4 bg-gray-50 dark:bg-gray-850', props.class)}>
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

// Experimental API
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