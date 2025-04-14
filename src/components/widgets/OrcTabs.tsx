import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

// Define the single wizard image for the entire set
const wizardImage = {
  src: '/images/orc.jpg',
  alt: 'Wizard Avatar',
  description: "A savage warlord driven by fury and ambition, feared for both brawn and strategy.",
  rarity: 20,
};

// Define the wizard objects with categories, images, and metadata
const wizardCategories = [
  {
    category: 'Weapon',
    images: [
      {
        src: '/images/waraxe.png',
        alt: 'War Axe',
        title: 'War Axe',
        description: 'Mighty axe cleaves with fury.',
        rarity: 20,
      },
      {
        src: '/images/boneclub.png',
        alt: 'Bone Club',
        title: 'Bone Club',
        description: 'Ancient club smashes with primal force.',
        rarity: 15,
      },
      {
        src: '/images/jaggedsword.png',
        alt: 'Jagged Sword',
        title: 'Jagged Sword',
        description: 'Ragged blade slashes with malice.',
        rarity: 20,
      },
      {
        src: '/images/spikedmace.png',
        alt: 'Spiked Mace',
        title: 'Spiked Mace',
        description: 'Brutal mace crushes armored foes.',
        rarity: 15,
      },
      {
        src: '/images/enchantedspear.png',
        alt: 'Enchanted Spear',
        title: 'Enchanted Spear',
        description: 'Mystic spear pierces with magic.',
        rarity: 10,
      },
    ],
  },
  {
    category: 'Outfit',
    images: [
      {
        src: '/images/wararmor.png',
        alt: 'War Armor',
        title: 'War Armor',
        description: 'Heavy armor withstands fierce battles.',
        rarity: 10,
      },
      {
        src: '/images/battlerags.png',
        alt: 'Battle Rags',
        title: 'Battle Rags',
        description: 'Tattered rags conceal cunning warriors.',
        rarity: 25,
      },
      {
        src: '/images/shadowcloak.png',
        alt: 'Shadow Cloak',
        title: 'Shadow Cloak',
        description: 'Dark cloak veils stealthy scouts.',
        rarity: 25,
      },
      {
        src: '/images/tribalpaint.png',
        alt: 'Tribal Paint',
        title: 'Tribal Paint',
        description: 'Sacred paint channels ancestral might.',
        rarity: 15,
      },
      {
        src: '/images/warchiefrobe.png',
        alt: 'War Chief Robe',
        title: 'War Chief Robe',
        description: 'Regal robe commands tribal loyalty.',
        rarity: 25,
      },
    ],
  },
  {
    category: 'Accessory',
    images: [
      {
        src: '/images/bonenecklace.png',
        alt: 'Bone Necklace',
        title: 'Bone Necklace',
        description: 'Eerie necklace binds ancient spirits.',
        rarity: 20,
      },
      {
        src: '/images/skullstrap.png',
        alt: 'Skull Strap',
        title: 'Skull Strap',
        description: 'Grim strap enhances warrior resilience.',
        rarity: 15,
      },
      {
        src: '/images/fur.png',
        alt: 'Fur',
        title: 'Fur',
        description: 'Rugged fur bolsters primal vigor.',
        rarity: 20,
      },
      {
        src: '/images/warbeads.png',
        alt: 'War Beads',
        title: 'War Beads',
        description: 'Battle beads pulse with courage.',
        rarity: 20,
      },
    ],
  },
  {
    category: 'Head',
    images: [
      {
        src: '/images/skullhelm.png',
        alt: 'Skull Helm',
        title: 'Skull Helm',
        description: 'Spectral helm guards fierce skulls.',
        rarity: 15,
      },
      {
        src: '/images/kaspabandana.png',
        alt: 'Kaspa Bandana',
        title: 'Kaspa Bandana',
        description: 'Mystic bandana sharpens cunning senses.',
        rarity: 10,
      },
      {
        src: '/images/spikedhelmet.png',
        alt: 'Spiked Helmet',
        title: 'Spiked Helmet',
        description: 'Spiked helm deflects enemy strikes.',
        rarity: 15,
      },
      {
        src: '/images/bonecrown.png',
        alt: 'Bone Crown',
        title: 'Bone Crown',
        description: 'Ominous crown channels dark power.',
        rarity: 15,
      },
      {
        src: '/images/battlehelmet.png',
        alt: 'Battle Helmet',
        title: 'Battle Helmet',
        description: 'Sturdy helmet shields brave warriors.',
        rarity: 20,
      },
    ],
  },
];

export const OrcTabs = component$(() => {
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
    <div class="flex w-full space-x-0 sm:space-x-2">
      {/* Far Left: Single wizard image (outside tabs, 1/4 width) */}
      <div class="hidden sm:block w-1/4 space-y-2 h-full items-end flex">
        <Card.Content class="space-y-2 p-0">
          <div class="flex items-center justify-center">
            <img
              src={wizardImage.src}
              alt={wizardImage.alt}
              class="max-w-full max-h-full rounded-sm object-contain mx-auto"
            />
          </div>
          <p class="text-xs p-2 pt-0 text-gray-400">{wizardImage.description}</p>
        </Card.Content>
      </div>

      {/* Right 3/4: Tabs and content */}
      <div class="w-full sm:w-3/4 m-0">
        <Tabs.Root class="w-full">
          {/* Dynamically generate tabs */}
          <Tabs.List class="grid w-full grid-cols-4 p-0">
            {wizardCategories.map((wizard, index) => (
              <Tabs.Tab class="py-1" key={index} onClick$={() => (activeTab.value = index)}>
                {wizard.category}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* Dynamically generate panels */}
          {wizardCategories.map((wizard, index) => (
            <Tabs.Panel key={index}>
              <Card.Content class="p-0">
                {/* Mobile: Stack showcase above grid; Desktop: Side-by-side */}
                <div class="flex flex-col sm:flex-row sm:space-x-3 w-full m-0">
                  {/* Showcase: Selected image preview with metadata */}
                  <div class="w-full mx-auto space-y-1 sm:space-y-2 sm:order-2 p-3">
                    <div
                      class={`p-2 border rounded h-48 flex flex-col items-center justify-center w-full ${
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
                              Rarity: {selectedImage.value.rarity}% -{' '}
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
                  {/* Grid: Image thumbnails */}
                  <div class="w-full mx-auto space-y-1 sm:space-y-2 sm:order-1 p-3 pt-0 md:p-3 md:px-0">
                    <div class="flex items-center h-48 w-full">
                      <div class="grid grid-cols-3 grid-rows-2 gap-2.5 w-full h-full">
                        {wizard.images.map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            class={`p-1 border-2 rounded flex items-center justify-center w-full h-full ${
                              selectedImage.value?.src === img.src
                                ? 'border-secondary-800 shadow-[0_0_8px_2px_rgba(136,153,255,0.6)]'
                                : 'border-gray-700'
                            }`}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              class="max-w-[5rem] max-h-[5rem] object-contain mx-auto"
                              onClick$={() => (selectedImage.value = img)}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
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