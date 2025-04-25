import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

// Define the single wizard image for the entire set
const wizardImage = {
  src: '/images/dragon.jpg',
  alt: 'Wizard Avatar',
  description: "A molten-scaled dragon born in fire, hardened by chaos, and untamed by gods or kings.",
  rarity: 20,
};

// Define the wizard objects with categories, images, and metadata
const wizardCategories = [
  {
    category: 'Breath',
    images: [
      {
        src: '/images/kaspabreath.png',
        alt: 'Kaspa Arcan Burst',
        title: 'Kaspa Arcane Burst',
        description: 'Kaspian breath surges with power.',
        rarity: 5,
      },
      {
        src: '/images/icebreath.png',
        alt: 'Ice Breath',
        title: 'Ice Breath',
        description: 'Frosty breath chills foes to the bone.',
        rarity: 20,
      },
      {
        src: '/images/flamebreath.png',
        alt: 'Flame Breath',
        title: 'Flame Breath',
        description: 'Fiery breath scorches all enemies.',
        rarity: 20,
      },
      {
        src: '/images/lightningroar.png',
        alt: 'Lightning Roar',
        title: 'Lightning Roar',
        description: 'Thunderous roar crackles with energy.',
        rarity: 15,
      },
      {
        src: '/images/poisonfang.png',
        alt: 'Poison Fangs',
        title: 'Poison Fangs',
        description: 'Venomous fangs drip with toxin.',
        rarity: 20,
      },
      // {
      //   src: '/images/23.gif',
      //   alt: 'Poison Fangs',
      //   title: 'Poison Fangs',
      //   description: 'Venomous fangs drip with toxin.',
      //   rarity: 20,
      // },
    ],
  },
  {
    category: 'Skin',
    images: [
      {
        src: '/images/bluescales.png',
        alt: 'Blue Scales',
        title: 'Blue Scales',
        description: 'Azure scales gleam with resilience.',
        rarity: 25,
      },
      {
        src: '/images/ancientarmor.png',
        alt: 'Ancient Armor',
        title: 'Ancient Armor',
        description: 'Timeless armor shields with mystic might.',
        rarity: 25,
      },
      {
        src: '/images/celestialglow.png',
        alt: 'Celestial Glow',
        title: 'Celestial Glow',
        description: 'Starry skin radiates divine light.',
        rarity: 20,
      },
      {
        src: '/images/icescales.png',
        alt: 'Ice Scales',
        title: 'Ice Scales',
        description: 'Frosted scales deflect harsh blows.',
        rarity: 5,
      },
      {
        src: '/images/thunderhide.png',
        alt: 'Thunder Hide',
        title: 'Thunder Hide',
        description: 'Electric hide pulses with strength.',
        rarity: 25,
      },
      {
        src: '/images/dragonoutfit.png',
        alt: 'Thunder Hide',
        title: 'Titans Gold Essence',
        description: 'Legendary golden hide of inferno.',
        rarity: 0.4,
      },
    ],
  },

  {
    category: 'Head',
    images: [
      {
        src: '/images/elementalcrown.png',
        alt: 'Elemental Crown',
        title: 'Elemental Crown',
        description: 'Primal crown channels nature’s fury.',
        rarity: 15,
      },
      {
        src: '/images/bluecrown.png',
        alt: 'Runed Skull',
        title: 'Runed Skull',
        description: 'Carved skull pulses with dark runes.',
        rarity: 20,
      },
      {
        src: '/images/mystichorns.png',
        alt: 'Mystic Horns',
        title: 'Mystic Horns',
        description: 'Arcane horns amplify swift magic.',
        rarity: 5,
      },
      {
        src: '/images/crystalcrest.png',
        alt: 'Mystic Pendant',
        title: 'Crystal Crest',
        description: 'Crystal laden crest of mystery.',
        rarity: 20,
      },
      {
        src: '/images/horncrown.png',
        alt: 'Leather Bracelet',
        title: 'Horn Crown',
        description: 'Horn spiked crown of majesty.',
        rarity: 20,
      },
    ],
  },
  {
    category: 'Eyes',
    images: [
      {
        src: '/images/dredeyes.png',
        alt: 'Red Eye',
        title: 'Red Eye',
        description: 'Crimson eye blazes with fury.',
        rarity: 25,
      },
      {
        src: '/images/dblueeyes.png',
        alt: 'Blue Eyes',
        title: 'Blue Eyes',
        description: 'Sapphire eyes shimmer with mystic vision.',
        rarity: 30,
      },
      {
        src: '/images/dkaspaeyes.png',
        alt: 'Kaspa Eyes',
        title: 'Kaspa Eyes',
        description: 'Enigmatic eyes pierce arcane secrets.',
        rarity: 15,
      },
      {
        src: '/images/yelloweyes.png',
        alt: 'Yellow Eyes',
        title: 'Yellow Eyes',
        description: 'Golden eyes glow with wisdom.',
        rarity: 30,
      },
      {
        src: '/images/24.gif',
        alt: 'Yellow Eyes',
        title: 'Gold Glowing Eyes',
        description: 'Legendary golden eyes of fury.',
        rarity: 0.4,
      },
    ],
  },
];

export const DragonTabs = component$(() => {
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