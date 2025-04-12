import { component$, useSignal } from '@builder.io/qwik';
import { Tabs } from './Tabs';
import { Card } from '../ui/Card';
import { Label } from '../ui/Label';

// Define the single wizard image for the entire set
const wizardImage = {
  src: '/images/wizard.jpg',
  alt: 'Wizard Avatar',
};

// Define the wizard objects with categories, images, and metadata
const wizardCategories = [
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
    category: 'Weapon',
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
    category: 'Head',
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

export const ElfTabs = component$(() => {
    // Signal to track the selected image object (to access metadata)
    const selectedImage = useSignal<{ src: string; alt: string; title: string; description: string; rarity: number } | null>(null);
  
    return (
      <Tabs.Root class="w-full">
        {/* Dynamically generate tabs */}
        <Tabs.List class="grid w-full grid-cols-4">
          {wizardCategories.map((wizard, index) => (
            <Tabs.Tab key={index}>{wizard.category}</Tabs.Tab>
          ))}
        </Tabs.List>
  
        {/* Dynamically generate panels */}
        {wizardCategories.map((wizard, index) => (
          <Tabs.Panel key={index}>
            <Card.Root>
              <Card.Content class="flex space-x-4">
                {/* Far Left: Single wizard image */}
                <div class="w-1/4 space-y-2">
                  <Label>Wizard</Label>
                  <div class="border-gray-700 border rounded p-2 h-48 flex items-center justify-center">
                    <img
                      src={wizardImage.src}
                      alt={wizardImage.alt}
                      class="max-w-full max-h-full object-contain mx-auto"
                    />
                  </div>
                </div>
                {/* Middle: Image thumbnails */}
                <div class="flex-1 space-y-2">
                  <Label for={`${wizard.category.toLowerCase()}-options`}>
                    {wizard.category} Options
                  </Label>
                  <div class="grid grid-cols-3 gap-4">
                    {wizard.images.map((img, imgIndex) => (
                      <button
                        key={imgIndex}
                        class={`p-2 border-2 rounded flex items-center justify-center ${
                          selectedImage.value?.src === img.src ? 'border-blue-500' : 'border-gray-300'
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
                  <Label>Preview</Label>
                  <div class="border rounded p-2 h-48 flex flex-col items-center justify-center">
                    {selectedImage.value ? (
                      <div class="text-center flex flex-col items-center">
                        <img
                          src={selectedImage.value.src}
                          alt={selectedImage.value.alt}
                          class="max-w-full max-h-24 object-contain mx-auto mb-2"
                        />
                        <div class="text-sm">
                          <div class="font-semibold">{selectedImage.value.title}</div>
                          <div class="text-gray-600">{selectedImage.value.description}</div>
                          <div class="text-gray-500">Rarity: {selectedImage.value.rarity}%</div>
                        </div>
                      </div>
                    ) : (
                      <span class="text-gray-500">Select an image to preview</span>
                    )}
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    );
  });