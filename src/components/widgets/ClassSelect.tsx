import { component$, Signal } from '@builder.io/qwik';
import { LuCheck } from '@qwikest/icons/lucide';
import { Select } from '../ui/Select';


interface ClassSelectProps {
  selectedClass: Signal<string>;
}

export default component$(({ selectedClass }: ClassSelectProps) => {
  const users = ['Wizard', 'Orc', 'Warrior', 'Dragon', 'Dark Lord', 'Elf'];

  return (
    <Select.Root>
      <Select.Trigger class="border-gray-800 border-2">
        <Select.DisplayValue placeholder={selectedClass.value} />
      </Select.Trigger>
      <Select.Popover gutter={8} class="bg-gray-800 text-gray-300">
        {users.map((user) => (
          <Select.Item 
            key={user}
            onClick$={() => selectedClass.value = user}
          >
            <Select.ItemLabel>{user}</Select.ItemLabel>
            <Select.ItemIndicator>
              {selectedClass.value === user && <LuCheck class="h-4 w-4" />}
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
    
  );
});