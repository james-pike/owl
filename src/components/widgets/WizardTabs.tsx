import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';
import { LuSparkles } from '@qwikest/icons/lucide';

// Define the single wizard image for the entire set
const wizardImage = {
  src: '/images/wizard.jpg',
  alt: 'Wizard Avatar',
  description: "A mysterious sorcerer who channels ancient Kaspa energy to maintain balance—or disrupt it.",
  rarity: 20,
};

// Define the wizard objects with categories, images, and metadata
const wizardCategories = [
  {
    category: 'Weapon',
    icon: LuSparkles,
    images: [
      {
        src: '/images/cosmiccepter.png',
        alt: 'Weapon 1',
        title: 'Firebrand Sword',
        description: 'A blade that glows with fiery enchantments.',
        rarity: 8,
      },
      {
        src: '/images/snakestaff.png',
        alt: 'Weapon 2',
        title: 'Frost Axe',
        description: 'An axe that freezes enemies on contact.',
        rarity: 12,
      },
      {
        src: '/images/mysticstaff.png',
        alt: 'Weapon 3',
        title: 'Thunder Bow',
        description: 'Shoots arrows charged with lightning.',
        rarity: 20,
      },
      {
        src: '/images/arcanewand.png',
        alt: 'Weapon 4',
        title: 'Shadow Dagger',
        description: 'Perfect for silent assassinations.',
        rarity: 15,
      },
      {
        src: '/images/kaspaorb.png',
        alt: 'Weapon 5',
        title: 'Rusty Mace',
        description: 'Old but reliable for close combat.',
        rarity: 5,
      },
    ],
  },
  {
    category: 'Outfit',
    images: [
      {
        src: '/images/arcanerobe.png',
        alt: 'Outfit 1',
        title: 'Mystic Robe',
        description: 'A robe imbued with ancient magic.',
        rarity: 25,
      },
      {
        src: '/images/shadowmantle.png',
        alt: 'Outfit 2',
        title: 'Shadow Mantle',
        description: 'Heavy armor for fearless fighters.',
        rarity: 20,
      },
      {
        src: '/images/celestialcloak.png',
        alt: 'Outfit 3',
        title: 'Celestial Cloak',
        description: 'Light and stealthy, perfect for scouts.',
        rarity: 25,
      },
      {
        src: '/images/eldrtichgarb.png',
        alt: 'Outfit 4',
        title: 'Eldrtich Garb',
        description: 'Forged from dragon scales, highly durable.',
        rarity: 25,
      },
      {
        src: '/images/astralgown.png',
        alt: 'Astral Gown',
        title: 'Peasant Garb',
        description: 'Simple clothing for humble beginnings.',
        rarity: 45,
      },
    ],
  },
 
  {
    category: 'Eyes',
    images: [
      {
        src: '/images/redeyes.png',
        alt: 'Eyes 1',
        title: 'Red Eyes',
        description: 'Eyes that shine like precious gems.',
        rarity: 10,
      },
      {
        src: '/images/whiteeyes.png',
        alt: 'Eyes 2',
        title: 'White Eyes',
        description: 'Intimidating red eyes that pierce souls.',
        rarity: 15,
      },
      {
        src: '/images/kaspaeyes.png',
        alt: 'Kaspa Eyes',
        title: 'Sapphire Vision',
        description: 'Calm blue eyes with mystic clarity.',
        rarity: 25,
      },
      {
        src: '/images/blueeyes.png',
        alt: 'Blue Eyes',
        title: 'Golden Glow',
        description: 'Radiant eyes that inspire awe.',
        rarity: 5,
      },
      {
        src: '/images/eyes5.png',
        alt: 'Eyes 5',
        title: 'Hazel Charm',
        description: 'Warm, common eyes with a friendly vibe.',
        rarity: 45,
      },
    ],
  },
  {
    category: 'Accessory',
    images: [
      {
        src: '/images/spiritmothswarm.png',
        alt: 'Accessory 1',
        title: 'Spirit Moth Swarm',
        description: 'A pendant that channels cosmic energy.',
        rarity: 15,
      },
      {
        src: '/images/pipe.png',
        alt: 'Accessory 2',
        title: 'Skull Ring',
        description: 'A ring that boosts dark magic.',
        rarity: 15,
      },
      {
        src: '/images/eldrtichcharm.png',
        alt: 'Accessory 3',
        title: 'Eldrtich Charm',
        description: 'Grants agility and speed.',
        rarity: 25,
      },
      {
        src: '/images/mysticpendant.png',
        alt: 'Accessory 4',
        title: 'Mystic Pendant',
        description: 'Amplifies magical abilities.',
        rarity: 5,
      },
      {
        src: '/images/accessory5.png',
        alt: 'Accessory 5',
        title: 'Leather Bracelet',
        description: 'A simple but sturdy accessory.',
        rarity: 45,
      },
    ],
  },
];

export const WizardTabs = component$(() => {
  // Signal to track the active tab index
  const activeTab = useSignal(0);
  // Signal to track the selected image object (to access metadata)
  const selectedImage = useSignal<{ src: string; alt: string; title: string; description: string; rarity: number } | null>(
    wizardCategories[0]?.images[0] || null
  );

  // Update selectedImage when activeTab changes
  useTask$(({ track }) => {
    track(() => activeTab.value);
    if (wizardCategories[activeTab.value]?.images[0]) {
      selectedImage.value = wizardCategories[activeTab.value].images[0];
    }
  });

  // Function to determine rarity class and color
  const getRarityClass = (rarity: number) => {
    if (rarity <= 1) {
      return { text: 'legendary', color: 'text-yellow-400' };
    } else if (rarity <= 10) {
      return { text: 'rare', color: 'text-yellow-400' };
    } else if (rarity <= 20) {
      return { text: 'uncommon', color: 'text-green-400' };
    } else {
      return { text: 'common', color: 'text-blue-400' };
    }
  };

  return (
    <div class="flex w-full space-x-2">
      {/* Far Left: Single wizard image (outside tabs, 1/4 width) */}
      <div class="hidden sm:block w-1/4 space-y-2 h-full items-end flex">
        <Card.Content class="space-y-2">
          <div class="flex items-center justify-center">
            <img
              src={wizardImage.src}
              alt={wizardImage.alt}
              class="max-w-full max-h-full rounded-sm object-contain mx-auto"
            />
          </div>
          <p class="text-xs text-gray-400">{wizardImage.description}</p>

        </Card.Content>
      </div>

      {/* Right 3/4: Tabs and content */}
      <div class="w-full sm:w-3/4">
        <Tabs.Root class="w-full">
          {/* Dynamically generate tabs */}
          <Tabs.List class="grid w-full grid-cols-4 p-0">
            {wizardCategories.map((wizard, index) => (
              <Tabs.Tab class="py-1"  key={index} onClick$={() => (activeTab.value = index)}>
                {wizard.category}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* Dynamically generate panels */}
          {wizardCategories.map((wizard, index) => (
            <Tabs.Panel key={index}>
              <Card.Content class="flex space-x-3 px-0 py-1 items-center">
                {/* Middle: Image thumbnails */}
                <div class="flex-1 space-y-2">
                  <div class="grid grid-cols-3 gap-2.5">
                    {wizard.images.map((img, imgIndex) => (
                      <button
                        key={imgIndex}
                        class={`p-2 border-2 rounded flex items-center justify-center ${
                          selectedImage.value?.src === img.src
                            ? 'border-secondary-800 shadow-[0_0_8px_2px_rgba(136,153,255,0.6)]'
                            : 'border-gray-700'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          class="w-16 h-16 object-contain mx-auto"
                          onClick$={() => (selectedImage.value = img)}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {/* Right: Selected image preview with metadata */}
                <div class="flex-1 space-y-2">
                  <div
                    class={`p-2 border rounded h-48 flex flex-col items-center justify-center ${
                      selectedImage.value
                        ? 'border-secondary-800 shadow-[0_0_8px_2px_rgba(136,153,255,0.6)]'
                        : 'border-gray-700'
                    }`}
                  >
                    {selectedImage.value ? (
                      <div class="text-center flex flex-col items-center">
                        <img
                          src={selectedImage.value.src}
                          alt={selectedImage.value.alt}
                          class="max-w-full max-h-24 object-contain mx-auto mb-2"
                        />
                        <div class="text-sm">
                          <div class="font-semibold">{selectedImage.value.title}</div>
                          <div class="text-gray-500">{selectedImage.value.description}</div>
                          <div class="text-gray-400 pt-1">
                            Rarity: {selectedImage.value.rarity}%{' '} - {' '}
                           
                            {selectedImage.value.rarity != null && (
                              <span class={getRarityClass(selectedImage.value.rarity).color}>
                                {getRarityClass(selectedImage.value.rarity).text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span class="text-gray-500">Select an image to preview</span>
                    )}
                  </div>
                </div>
              </Card.Content>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </div>
  );
});