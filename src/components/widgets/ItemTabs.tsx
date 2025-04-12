import { component$, JSX, useSignal, useStyles$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { cn } from '@qwik-ui/utils';
import { Tabs } from './Tabs';

// Define interfaces (assuming these are similar to your original setup)
interface Item {
  title: string;
  description: string;
  icon: JSX.Element;
  metadata: {
    class?: string;
    weight?: string;
    rarity?: string;
  };
}

interface Category {
  name: string;
  items: Item[];
}

interface ItemsProps {
  selectedClass: string;
}

// Sample categories data (replace with your actual data)
const categories: Category[] = [
  {
    name: 'Head',
    items: [
      {
        title: 'Iron Helmet',
        description: 'A sturdy helmet for warriors.',
        icon: (
          <svg class="w-full h-full" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10H2a10 10 0 0 1 10-10z" />
          </svg>
        ),
        metadata: { class: 'Warrior', weight: '10%', rarity: 'Common' },
      },
      {
        title: 'Mage Hat',
        description: 'A mystical hat for spellcasters.',
        icon: (
          <svg class="w-full h-full" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l-10 20h20L12 2z" />
          </svg>
        ),
        metadata: { class: 'Mage', weight: '5%', rarity: 'Rare' },
      },
    ],
  },
  {
    name: 'Shoulders',
    items: [
      {
        title: 'Steel Pauldrons',
        description: 'Heavy armor for shoulder protection.',
        icon: (
          <svg class="w-full h-full" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 8h16v4H4z" />
          </svg>
        ),
        metadata: { class: 'Warrior', weight: '8%', rarity: 'Common' },
      },
    ],
  },
  {
    name: 'Neck',
    items: [
      {
        title: 'Amulet of Power',
        description: 'Boosts strength for all classes.',
        icon: (
          <svg class="w-full h-full" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2v6m-4 4h8v6H8z" />
          </svg>
        ),
        metadata: { weight: '3%', rarity: 'Rare' },
      },
      {
        title: "Mystic Guardian Helm",
        description: "A sturdy helm that protects and enhances magical focus.",
        icon: (<img src="/images/maskX.png" alt="Mystic Guardian Helm" class="w-full h-full" />),
        metadata: { weight: "20%",  rarity: "Common", class: "Wizard" }
    },
    {
        title: "Archmage’s Tiara",
        description: "A delicate tiara radiating arcane power.",
        icon: (<img src="/images/orcnecklace.png" alt="Archmage’s Tiara" class="w-full h-full" />),
        metadata: { weight: "5%",  rarity: "Rare", class: "Wizard" }
    },
    {
        title: "Sorcerer’s Conical Crown",
        description: "A towering hat imbued with arcane runes, amplifying the wearer’s spellcasting prowess.",
        icon: (<img src="/images/broom.png" alt="Sorcerer’s Conical Crown" class="w-full h-full" />),
        metadata: { weight: "5%",  rarity: "Rare", class: "Wizard" }
    },
    ],
  },
];

const styles = `
  @keyframes breathe {
    0%, 100% { box-shadow: 0 0 15px 5px rgba(112, 199, 186, 0.3); }
    50% { box-shadow: 0 0 25px 10px rgba(112, 199, 186, 0.5); }
  }
  .breathing-glow { 
    animation: breathe 2s ease-in-out infinite; 
  }
`;

export default component$(({ selectedClass }: ItemsProps) => {
  const selectedItem = useSignal<Item | null>(null);

  useStyles$(styles);

  // Filter categories and items by selectedClass
  const filteredCategories = categories
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        !item.metadata.class || item.metadata.class === selectedClass
      ),
    }))
    .filter(category => category.items.length > 0);

  // Set initial selected item to the first item of the first category
  if (filteredCategories.length > 0 && selectedItem.value === null) {
    selectedItem.value = filteredCategories[0].items[0] || null;
  }

  return (
    <section class="scroll-mt-16 h-20">
      <div class="max-w-5xl mx-auto">
        {filteredCategories.length > 0 ? (
          <div class="flex flex-col md:flex-row md:space-x-4 min-h-[284px] items-center lg:min-h-[363px]">
            {/* Left Column: Tabs and Item Grid */}
            <div class="flex-1 md:w-1/2 flex flex-col space-y-1 order-2 md:order-1">
              <Tabs.Root>
                <Tabs.List class="grid grid-cols-4 md:mx-4 sm:flex sm:space-x-4 w-full p-0 mt-2 rounded-sm">
                  {filteredCategories.map((category, index) => (
                    <Tabs.Tab key={index} class="p-2">
                      {category.name}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                {filteredCategories.map((category, index) => (
                  <Tabs.Panel key={index}>
                    <div class="grid grid-cols-3 border-gray-800 border-2 p-2 md:p-4 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-4 md:min-h-[220px] lg:min-h-[220px]">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          class="relative p-1 cursor-pointer group"
                          onClick$={() => (selectedItem.value = item)}
                        >
                          <div class="relative flex items-center justify-center">
                            <div
                              class={twMerge(
                                'absolute inset-[-2px] rounded-none transition-all duration-300 bg-blue-100/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-800',
                                selectedItem.value?.title === item.title &&
                                  'bg-secondary-300/70 dark:bg-secondary-800/70 breathing-glow',
                                'group-hover:bg-secondary-200/70 dark:group-hover:bg-secondary-800/70 group-hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.4)]'
                              )}
                            />
                            <div
                              class={twMerge(
                                'relative bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 w-full p-2 transition-transform duration-300',
                                selectedItem.value?.title === item.title && 'scale-105',
                                'group-hover:scale-105'
                              )}
                            >
                              {item.icon}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs.Panel>
                ))}
              </Tabs.Root>
            </div>

            {/* Right Column: Item Showcase */}
            <div class="md:w-1/2 order-1 md:order-2">
              {selectedItem.value ? (
                <div class="rounded-sm shadow-md border-2 items-center border-gray-800">
                  <div class="flex flex-col items-center gap-4 px-4 mb-2">
                    <div class="rotating-item flex-shrink-0 max-w-[150px] max-h-[150px]">
                      {selectedItem.value.icon}
                    </div>
                    <div class="flex-1 w-full">
                      <h3 class="text-xl font-bold mb-1">{selectedItem.value.title}</h3>
                      <p class="text-sm text-gray-400 mb-2 md:mb-4 min-h-[40px] lg:min-h-[50px]">
                        {selectedItem.value.description}
                      </p>
                      <div class="grid grid-cols-2 gap-2 text-sm text-gray-400">
                        {selectedItem.value.metadata.weight && (
                          <div>
                            <span class="font-semibold">Drop rate:</span>{' '}
                            {selectedItem.value.metadata.weight}
                          </div>
                        )}
                        {selectedItem.value.metadata.rarity && (
                          <div>
                            <span class="font-semibold">Rarity:</span>{' '}
                            <span
                              class={twMerge(
                                selectedItem.value.metadata.rarity === 'Common' &&
                                  'text-green-500',
                                selectedItem.value.metadata.rarity === 'Rare' &&
                                  'text-orange-400'
                              )}
                            >
                              {selectedItem.value.metadata.rarity}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="text-center p-4">
                  <p class="text-gray-400">No item selected</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div class="text-center p-4">
            <p class="text-gray-400">No items available for {selectedClass} class</p>
          </div>
        )}
      </div>
    </section>
  );
});