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
        src: '/images/wararmor.png',
        alt: 'Outfit 1',
        title: 'War Amor',
        description: 'A robe imbued with ancient magic.',
        rarity: 10,
      },
      {
        src: '/images/battlerags.png',
        alt: 'Outfit 2',
        title: 'Battle Rags',
        description: 'Heavy armor for fearless fighters.',
        rarity: 25,
      },
      {
        src: '/images/shadowcloak.png',
        alt: 'Outfit 3',
        title: 'Shadow Cloak',
        description: 'Light and stealthy, perfect for scouts.',
        rarity: 25,
      },
      {
        src: '/images/tribalpaint.png',
        alt: 'Outfit 4',
        title: 'Tribal Paint',
        description: 'Forged from dragon scales, highly durable.',
        rarity: 15,
      },
      {
        src: '/images/warchiefrobe.png',
        alt: 'Astral Gown',
        title: 'War Chief Robe',
        description: 'Simple clothing for humble beginnings.',
        rarity: 25,
      },
    ],
  },
  {
    category: 'Weapon',
    images: [
      {
        src: '/images/waraxe.png',
        alt: 'Weapon 1',
        title: 'War Axe',
        description: 'A blade that glows with fiery enchantments.',
        rarity: 20,
      },
      {
        src: '/images/boneclub.png',
        alt: 'Weapon 2',
        title: 'Bone Club',
        description: 'An axe that freezes enemies on contact.',
        rarity: 15,
      },
      {
        src: '/images/jaggedsword.png',
        alt: 'Weapon 3',
        title: 'Jagged Sword',
        description: 'Shoots arrows charged with lightning.',
        rarity: 20,
      },
      {
        src: '/images/spikedmace.png',
        alt: 'Weapon 4',
        title: 'Spiked Mace',
        description: 'Perfect for silent assassinations.',
        rarity: 15,
      },
      {
        src: '/images/enchantedspear.png',
        alt: 'Weapon 5',
        title: 'Enchanted Spear',
        description: 'Old but reliable for close combat.',
        rarity: 10,
      },
    ],
  },
  {
    category: 'Accessory',
    images: [
      {
        src: '/images/bonenecklace.png',
        alt: 'Eyes 1',
        title: 'Bone Necklace',
        description: 'Eyes that shine like precious gems.',
        rarity: 20,
      },
      {
        src: '/images/skullstrap.png',
        alt: 'Eyes 2',
        title: 'Skull Strap',
        description: 'Intimidating red eyes that pierce souls.',
        rarity: 15,
      },
      {
        src: '/images/fur.png',
        alt: 'Kaspa Eyes',
        title: 'Fur',
        description: 'Calm blue eyes with mystic clarity.',
        rarity: 20,
      },
      {
        src: '/images/warbeads.png',
        alt: 'Blue Eyes',
        title: 'War Beads',
        description: 'Radiant eyes that inspire awe.',
        rarity: 20,
      },
      {
        src: '/images/redeyes.png',
        alt: 'Eyes 5',
        title: 'Red Eyes',
        description: 'Warm, common eyes with a friendly vibe.',
        rarity: 45,
      },
    ],
  },
  {
    category: 'Head',
    images: [
      {
        src: '/images/skullhelm.png',
        alt: 'Accessory 1',
        title: 'Skull Helm',
        description: 'A pendant that channels cosmic energy.',
        rarity: 15,
      },
      {
        src: '/images/kaspabandana.png',
        alt: 'Accessory 2',
        title: 'Kaspa Bandana',
        description: 'A ring that boosts dark magic.',
        rarity: 10,
      },
      {
        src: '/images/spikedhelmet.png',
        alt: 'Accessory 3',
        title: 'Spiked Helmet',
        description: 'Grants agility and speed.',
        rarity: 15,
      },
      {
        src: '/images/bonecrown.png',
        alt: 'Accessory 4',
        title: 'Bone Crown',
        description: 'Amplifies magical abilities.',
        rarity: 15,
      },
      {
        src: '/images/battlehelmet.png',
        alt: 'Accessory 5',
        title: 'Battle Helmet',
        description: 'A simple but sturdy accessory.',
        rarity: 20,
      },
    ],
  },
];

export const OrcTabs = component$(() => {
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