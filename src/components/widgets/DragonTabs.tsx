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
    category: 'Skin',
    images: [
      {
        src: '/images/bluescales.png',
        alt: 'Blue Scales',
        title: 'Mystic Robe',
        description: 'A robe imbued with ancient magic.',
        rarity: 20,
      },
      {
        src: '/images/ancientarmor.png',
        alt: 'Ancient Armor',
        title: 'Shadow Mantle',
        description: 'Heavy armor for fearless fighters.',
        rarity: 25,
      },
      {
        src: '/images/celestialglow.png',
        alt: 'Celestial Glow',
        title: 'Celestial Cloak',
        description: 'Light and stealthy, perfect for scouts.',
        rarity: 20,
      },
      {
        src: '/images/icescales.png',
        alt: 'Ice Scales',
        title: 'Eldrtich Garb',
        description: 'Forged from dragon scales, highly durable.',
        rarity: 5,
      },
      {
        src: '/images/thunderhide.png',
        alt: 'Thunder Hide',
        title: 'Peasant Garb',
        description: 'Simple clothing for humble beginnings.',
        rarity: 30,
      },
    ],
  },
  {
    category: 'Breath',
    images: [
      {
        src: '/images/kaspabreath.png',
        alt: 'Kaspa Arcan Burst',
        title: 'Firebrand Sword',
        description: 'A blade that glows with fiery enchantments.',
        rarity: 5,
      },
      {
        src: '/images/icebreath.png',
        alt: 'Ice Breath',
        title: 'Frost Axe',
        description: 'An axe that freezes enemies on contact.',
        rarity: 20,
      },
      {
        src: '/images/flamebreath.png',
        alt: 'Flame Breath',
        title: 'Thunder Bow',
        description: 'Shoots arrows charged with lightning.',
        rarity: 20,
      },
      {
        src: '/images/lightningroar.png',
        alt: 'Lightning Roar',
        title: 'Shadow Dagger',
        description: 'Perfect for silent assassinations.',
        rarity: 15,
      },
      {
        src: '/images/poisonfangs.png',
        alt: 'Poison Fangs',
        title: 'Rusty Mace',
        description: 'Old but reliable for close combat.',
        rarity: 20,
      },
    ],
  },
  {
    category: 'Eyes',
    images: [
      {
        src: '/images/dredeyes.png',
        alt: 'Red Eyes',
        title: 'Red Eyes',
        description: 'Eyes that shine like precious gems.',
        rarity: 25,
      },
      {
        src: '/images/dkaspaeyes.png',
        alt: 'Kaspa Eyes',
        title: 'White Eyes',
        description: 'Intimidating red eyes that pierce souls.',
        rarity: 15,
      },
      {
        src: '/images/dblueeyes.png',
        alt: 'Blue Eyes',
        title: 'Sapphire Vision',
        description: 'Calm blue eyes with mystic clarity.',
        rarity: 30,
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
        src: '/images/elementalcrown.png',
        alt: 'Accessory 1',
        title: 'Spirit Moth Swarm',
        description: 'A pendant that channels cosmic energy.',
        rarity: 15,
      },
      {
        src: '/images/bluecrown.png',
        alt: 'Accessory 2',
        title: 'Runed Skull',
        description: 'A ring that boosts dark magic.',
        rarity: 20,
      },
      {
        src: '/images/mystichorns.png',
        alt: 'Mystic Horns',
        title: 'Eldrtich Charm',
        description: 'Grants agility and speed.',
        rarity: 5,
      },
      {
        src: '/images/crystalcrest.png',
        alt: 'Crystal Crest',
        title: 'Mystic Pendant',
        description: 'Amplifies magical abilities.',
        rarity: 20,
      },
      {
        src: '/images/horncrown.png',
        alt: 'Horn Crown',
        title: 'Leather Bracelet',
        description: 'A simple but sturdy accessory.',
        rarity: 20,
      },
    ],
  },
];

export const DragonTabs = component$(() => {
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