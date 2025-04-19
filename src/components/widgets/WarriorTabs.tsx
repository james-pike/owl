import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

// Define the single wizard image for the entire set
const wizardImage = {
  src: '/images/warrior.jpg',
  alt: 'Wizard Avatar',
  description: "A wandering warrior seeking redemption with a rune-forged blade and a haunted past.",
  rarity: 20,
};

// Define the wizard objects with categories, images, and metadata
const wizardCategories = [
  {
    category: 'Weapon',
    images: [
      {
        src: '/images/dagger.png',
        alt: 'Enchanted Dagger',
        title: 'Enchanted Dagger',
        description: 'Mystic dagger gleams with magic.',
        rarity: 5,
      },
      {
        src: '/images/dualdaggers.png',
        alt: 'Dual Daggers',
        title: 'Dual Daggers',
        description: 'Twin blades dance with deadly grace.',
        rarity: 20,
      },
      {
        src: '/images/longsword.png',
        alt: 'Longsword',
        title: 'Longsword',
        description: 'Mighty blade slices with precision.',
        rarity: 15,
      },
      {
        src: '/images/crossbow.png',
        alt: 'Crossbow',
        title: 'Crossbow',
        description: 'Silent crossbow strikes from shadows.',
        rarity: 20,
      },
      {
        src: '/images/warhammer.png',
        alt: 'Warhammer',
        title: 'Warhammer',
        description: 'Heavy hammer crushes with force.',
        rarity: 15,
      },
      // {
      //   src: '/images/claidheamh.png',
      //   alt: 'Claidheamh Mòr Longsword',
      //   title: 'Claidheamh Mòr Longsword',
      //   description: 'Ancient longsword hums with power.',
      //   rarity: 0.5,
      // },
    ],
  },
  {
    category: 'Outfit',
    images: [
      {
        src: '/images/battletunic.png',
        alt: 'Peasant Garb',
        title: 'Peasant Garb',
        description: 'Humble garb offers simple comfort.',
        rarity: 25,
      },
      {
        src: '/images/noble1.png',
        alt: 'Noble Attire',
        title: 'Noble Attire',
        description: 'Regal attire radiates majestic splendor.',
        rarity: 20,
      },
      {
        src: '/images/peasantgarb.png',
        alt: 'Battle Tunic',
        title: 'Battle Tunic',
        description: 'Light tunic aids swift combat.',
        rarity: 25,
      },
      {
        src: '/images/kingsrobe.png',
        alt: 'Kings Robe',
        title: 'Kings Robe',
        description: 'Royal robe exudes grand authority.',
        rarity: 10,
      },
      {
        src: '/images/nobleattire.png',
        alt: 'Knight Armor',
        title: 'Knight Armor',
        description: 'Sturdy armor shields brave knights.',
        rarity: 20,
      },
      // {
      //   src: '/images/goldarmor.png',
      //   alt: 'Gold Divine Armor',
      //   title: 'Gold Divine Armor',
      //   description: 'Golden armor shines with divinity.',
      //   rarity: 0.5,
      // },
    ],
  },
 
  {
    category: 'Head',
    images: [
      {
        src: '/images/ironhelm.png',
        alt: 'Iron Helm',
        title: 'Iron Helm',
        description: 'Iron helm guards with strength.',
        rarity: 20,
      },
      {
        src: '/images/royalcrown.png',
        alt: 'Royal Crown',
        title: 'Royal Crown',
        description: 'Regal crown bestows noble power.',
        rarity: 10,
      },
      {
        src: '/images/battlemask.png',
        alt: 'Kaspa Battle Mask',
        title: 'Kaspa Battle Mask',
        description: 'Mystic mask enhances combat prowess.',
        rarity: 5,
      },
      {
        src: '/images/bluehelm.png',
        alt: 'Stormface Mask',
        title: 'Stormface Mask',
        description: 'Stormy mask channels arcane might.',
        rarity: 20,
      },
      {
        src: '/images/leathercap.png',
        alt: 'Leather Cap',
        title: 'Leather Cap',
        description: 'Simple cap offers sturdy protection.',
        rarity: 20,
      },
      // {
      //   src: '/images/goldcirclet.png',
      //   alt: 'Gold Leaf Circlet',
      //   title: 'Gold Leaf Circlet',
      //   description: 'Golden circlet gleams with elegance.',
      //   rarity: 20,
      // },
    ],
  },
  {
    category: 'Eyes',
    images: [
      {
        src: '/images/blueeyes.png',
        alt: 'Blue Eyes',
        title: 'Blue Eyes',
        description: 'Azure eyes sparkle with clarity.',
        rarity: 25,
      },
      {
        src: '/images/purpleeyes.png',
        alt: 'Purple Eyes',
        title: 'Purple Eyes',
        description: 'Violet eyes pierce with mystic gaze.',
        rarity: 25,
      },
      {
        src: '/images/kaspaeyes.png',
        alt: 'Kaspa Eyes',
        title: 'Kaspa Eyes',
        description: 'Mystic eyes glow with enigma.',
        rarity: 10,
      },
      {
        src: '/images/browneyes.png',
        alt: 'Brown Eyes',
        title: 'Brown Eyes',
        description: 'Earthy eyes radiate warm kindness.',
        rarity: 25,
      },
      {
        src: '/images/redeyes.png',
        alt: 'Red Eyes',
        title: 'Red Eyes',
        description: 'Crimson eyes blaze with intensity.',
        rarity: 15,
      },
      // {
      //   src: '/images/goldeyes.png',
      //   alt: 'Gold Glowing Eyes',
      //   title: 'Gold Glowing Eyes',
      //   description: 'Golden eyes shimmer with radiant light.',
      //   rarity: 0.5,
      // },
    ],
  },
];

export const WarriorTabs = component$(() => {
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
      return { text: 'legendary', color: 'text-orange-400' };
    } else if (rarity <= 5.1) {
      return { text: 'rare', color: 'text-yellow-400' };
    } else if (rarity <= 15.1) {
      return { text: 'uncommon', color: 'text-blue-400' };
    } else {
      return { text: 'common', color: 'text-green-400' };
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
                              Class Rarity: {selectedImage.value.rarity}% -{' '}
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