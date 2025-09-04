import { Slot, component$, type PropsOf } from '@builder.io/qwik';
import { Tabs as HeadlessTabs } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = (props: PropsOf<typeof HeadlessTabs.Root>) => (
  <HeadlessTabs.Root
    {...props}
    tabListComponent={List}
    tabComponent={Tab}
    tabPanelComponent={Panel}
  />
);

const List = component$<PropsOf<typeof HeadlessTabs.List>>((props) => {
  return (
      <HeadlessTabs.List
        {...props}
        class={cn(
          'flex flex-nowrap bg-white/50 overflow-x-auto sm:grid sm:grid-cols-7 sm:overflow-visible scrollbar-hide  bg-muted p-0 text-muted-foreground shadow-sm',
          props.class,
        )}
      >
        <Slot />
      </HeadlessTabs.List>
  );
});

const Tab = component$<PropsOf<typeof HeadlessTabs.Tab>>((props) => {
  return (
    <HeadlessTabs.Tab
      {...props}
      class={cn(
        'inline-flex items-center m-1 justify-center !text-sm whitespace-nowrap rounded-md px-3 py-2 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=selected]:border-base data-[state=selected]:bg-teal-200 data-[state=selected]:text-foreground data-[state=selected]:shadow-inner flex-shrink-0',
        props.class,
      )}
    >
      <Slot />
    </HeadlessTabs.Tab>
  );
});


const Panel = component$<PropsOf<typeof HeadlessTabs.Panel>>((props) => {
  return (
    <HeadlessTabs.Panel
      {...props}
      class={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class,
      )}
    >
      <Slot />
    </HeadlessTabs.Panel>
  );
});

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
};