import { component$ } from '@builder.io/qwik';
import { Tabs } from './Tabs';
import { Card } from '../ui/Card';
import { WizardTabs } from './WizardTabs';
import { ElfTabs } from './ElfTabs';
import { DragonTabs } from './DragonTabs';
import { WarriorTabs } from './WarriorTabs';
import { OrcTabs } from './OrcTabs';

// Separate component for the nested tabs


// Main component
export default component$(() => {
  return (
    <Tabs.Root class="max-w-6xl">
      <Tabs.List class="grid w-full grid-cols-6">
       
        <Tabs.Tab>Wizard</Tabs.Tab>
        <Tabs.Tab>Elf </Tabs.Tab>
        <Tabs.Tab>Warrior </Tabs.Tab>
        <Tabs.Tab>Orc</Tabs.Tab>
        <Tabs.Tab>Dragon</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel>
        <Card.Root>
      
          <Card.Content>
            {/* Render the nested tabs */}
            <WizardTabs />
          </Card.Content>
       
        </Card.Root>
      </Tabs.Panel>

      

      <Tabs.Panel>
        <Card.Root>
      
          <Card.Content>
            {/* Render the nested tabs */}
            <ElfTabs />
          </Card.Content>
       
        </Card.Root>
      </Tabs.Panel>


      <Tabs.Panel>
        <Card.Root>
      
          <Card.Content>
            {/* Render the nested tabs */}
            <WarriorTabs />
          </Card.Content>
       
        </Card.Root>
      </Tabs.Panel>

      <Tabs.Panel>
        <Card.Root>
      
          <Card.Content>
            {/* Render the nested tabs */}
            <OrcTabs />
          </Card.Content>
       
        </Card.Root>
      </Tabs.Panel>

      <Tabs.Panel>
        <Card.Root>
      
          <Card.Content>
            {/* Render the nested tabs */}
            <DragonTabs />
          </Card.Content>
       
        </Card.Root>
      </Tabs.Panel>

  




   


    </Tabs.Root>
  );
});