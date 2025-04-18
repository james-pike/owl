import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

// Define the single wizard image for the entire set
const wizardImage = {
  src: '/images/darklord.jpg',
  alt: 'Wizard Avatar',
  description: "A tyrant born of shadow, wielding corrupted Kaspa to bend the realm to his will.",
  rarity: 20,
};

// Define the wizard objects with categories, images, and metadata
const wizardCategories = [
  {
    category: 'Weapon',
    images: [
      {
        src: '/images/cursedblade.png',
        alt: 'Cursed Blade',
        title: 'Cursed Blade',
        description: 'Wicked blade curses with dark malice.',
        rarity: 15,
      },
      {
        src: '/images/shadowstaff.png',
        alt: 'Shadow Staff',
        title: 'Shadow Staff',
        description: 'Gloomy staff summons eerie shadow wraiths.',
        rarity: 20,
      },
      {
        src: '/images/firestaff.png',
        alt: 'Fire Staff',
        title: 'Fire Staff',
        description: 'Blazing staff ignites fierce infernal flames.',
        rarity: 15,
      },
      {
        src: '/images/deathwhip.png',
        alt: 'Death Whip',
        title: 'Death Whip',
        description: 'Lethal whip ensnares souls with dread.',
        rarity: 15,
      },
      {
        src: '/images/soulreaper.png',
        alt: 'Soul Reaper',
        title: 'Soul Reaper',
        description: 'Grim scythe reaps essence from foes.',
        rarity: 10,
      },
    ],
  },
  {
    category: 'Outfit',
    images: [
      {
        src: '/images/shadowrobe.png',
        alt: 'Shadow Robe',
        title: 'Shadow Robe',
        description: 'Dark robe cloaks wearer in mystery.',
        rarity: 20,
      },
      {
        src: '/images/hellfirecloak.png',
        alt: 'Hellfire Cloak',
        title: 'Hellfire Cloak',
        description: 'Fiery cloak surges with infernal might.',
        rarity: 15,
      },
      {
        src: '/images/royaldarkgarb.png',
        alt: 'Royal Dark Garb',
        title: 'Royal Dark Garb',
        description: 'Noble garb hides in stealthy shadows.',
        rarity: 20,
      },
      {
        src: '/images/voidarmor.png',
        alt: 'Void Armor',
        title: 'Void Armor',
        description: 'Abyssal armor shields against all strikes.',
        rarity: 20,
      },
      {
        src: '/images/infernalplate.png',
        alt: 'Infernal Plate',
        title: 'Infernal Plate',
        description: 'Demonic plate endures relentless hellish battles.',
        rarity: 25,
      },
    ],
  },

  {
    category: 'Accessory',
    images: [
      {
        src: '/images/kaspapendant.png',
        alt: 'Kaspa Pendant',
        title: 'Kaspa Pendant',
        description: 'Mystic pendant pulses with arcane energy.',
        rarity: 10,
      },
      {
        src: '/images/demonicraven.png',
        alt: 'Demonic Raven',
        title: 'Demonic Raven',
        description: 'Raven charm conjures dark sinister forces.',
        rarity: 15,
      },
      {
        src: '/images/necroticpendant.png',
        alt: 'Necrotic Pendant',
        title: 'Necrotic Pendant',
        description: 'Deathly pendant channels grim spectral power.',
        rarity: 25,
      },
      {
        src: '/images/voidstoneamulet.png',
        alt: 'Voidstone Amulet',
        title: 'Voidstone Amulet',
        description: 'Abyssal amulet boosts potent sorcerous might.',
        rarity: 5,
      },
    ],
  },
  {
    category: 'Eyes',
    images: [
      {
        src: '/images/blueeyes.png',
        alt: 'Blue Eyes',
        title: 'Blue Eyes',
        description: 'Azure eyes sparkle with mystic wisdom.',
        rarity: 25,
      },
      {
        src: '/images/purpleeyes.png',
        alt: 'Purple Eyes',
        title: 'Purple Eyes',
        description: 'Violet eyes pierce with arcane intensity.',
        rarity: 25,
      },
      {
        src: '/images/whiteeyes.png',
        alt: 'White Eyes',
        title: 'White Eyes',
        description: 'Pale eyes shimmer with ethereal purity.',
        rarity: 25,
      },
      {
        src: '/images/kaspaeyes.png',
        alt: 'Kaspa Eyes',
        title: 'Kaspa Eyes',
        description: 'Enigmatic eyes unveil deep hidden truths.',
        rarity: 10,
      },
      {
        src: '/images/redeyes.png',
        alt: 'Red Eyes',
        title: 'Red Eyes',
        description: 'Crimson eyes blaze with fierce passion.',
        rarity: 25,
      },
    ],
  },
];

export const DarkLordTabs = component$(() => {
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