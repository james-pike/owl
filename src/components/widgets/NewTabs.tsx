import { component$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';
import { WizardTabs } from './WizardTabs';
import { ElfTabs } from './ElfTabs';
import { DragonTabs } from './DragonTabs';
import { WarriorTabs } from './WarriorTabs';
import { OrcTabs } from './OrcTabs';
import { DarkLordTabs } from './DarkLordTabs';


// Main component
export default component$(() => {
  return (
    <Card.Content>
    <Tabs.Root class="max-w-6xl">
    
    <Tabs.List class="flex flex-row flex-nowrap overflow-x-auto md:grid md:grid-cols-6 w-full">

        <Tabs.Tab class="data-[state=selected]:bg-secondary-900"> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon mr-1 icon-tabler icons-tabler-outline icon-tabler-wand"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 21l15 -15l-3 -3l-15 15l3 3" /><path d="M15 6l3 3" /><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /></svg>  Wizard</Tabs.Tab>
        <Tabs.Tab class="data-[state=selected]:bg-secondary-900"> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon mr-1 icon-tabler icons-tabler-outline icon-tabler-leaf"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 21c.5 -4.5 2.5 -8 7 -10" /><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" /></svg> Elf </Tabs.Tab>
        <Tabs.Tab class="data-[state=selected]:bg-secondary-900"> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon mr-1 icon-tabler icons-tabler-outline icon-tabler-sword"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z" /><path d="M6.5 11.5l6 6" /></svg> Man </Tabs.Tab>
        <Tabs.Tab class="data-[state=selected]:bg-secondary-900"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon mr-1 icon-tabler icons-tabler-outline icon-tabler-hammer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.414 10l-7.383 7.418a2.091 2.091 0 0 0 0 2.967a2.11 2.11 0 0 0 2.976 0l7.407 -7.385" /><path d="M18.121 15.293l2.586 -2.586a1 1 0 0 0 0 -1.414l-7.586 -7.586a1 1 0 0 0 -1.414 0l-2.586 2.586a1 1 0 0 0 0 1.414l7.586 7.586a1 1 0 0 0 1.414 0z" /></svg> Orc</Tabs.Tab>
        <Tabs.Tab class="data-[state=selected]:bg-secondary-900"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon mr-1 icon-tabler icons-tabler-outline icon-tabler-flame"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.621 -2.333 5.588c0 3.704 3.134 6.706 7 6.706s7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235" /></svg> Dragon</Tabs.Tab>
        <Tabs.Tab class="data-[state=selected]:bg-secondary-900"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon mr-1 icon-tabler icons-tabler-outline icon-tabler-pentagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.636 5.636a9 9 0 1 1 12.728 12.728a9 9 0 0 1 -12.728 -12.728z" /><path d="M15.236 11l5.264 4h-6.5l-2 6l-2 -6h-6.5l5.276 -4l-2.056 -6.28l5.28 3.78l5.28 -3.78z" /></svg> Dark Lord</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel>
            <WizardTabs />
      </Tabs.Panel>

      <Tabs.Panel>
            <ElfTabs />
      </Tabs.Panel>

      <Tabs.Panel>
            <WarriorTabs />
      </Tabs.Panel>

      <Tabs.Panel>
            <OrcTabs />
      </Tabs.Panel>

      <Tabs.Panel>
        <DragonTabs />
  </Tabs.Panel>

      <Tabs.Panel>
            <DarkLordTabs />
      </Tabs.Panel>

    </Tabs.Root>
    </Card.Content>
  );
});