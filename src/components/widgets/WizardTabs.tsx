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
        alt: 'Cosmic Scepter',
        title: 'Cosmic Scepter',
        description: 'Scepter channeling powerful cosmic spells.',
        rarity: 20,
      },
      {
        src: '/images/snakestaff.png',
        alt: 'Snake Staff',
        title: 'Snake Staff',
        description: 'Staff summoning potent venomous magic.',
        rarity: 20,
      },
      {
        src: '/images/mysticstaff.png',
        alt: 'Mystic Staff',
        title: 'Mystic Staff',
        description: 'Staff casting unpredictable mystic bolts.',
        rarity: 20,
      },
      {
        src: '/images/arcanewand.png',
        alt: 'Arcane Wand',
        title: 'Arcane Wand',
        description: 'Wand for precise arcane spell strikes.',
        rarity: 15,
      },
      {
        src: '/images/kaspaorb.png',
        alt: 'Elemental Kaspa Orb',
        title: 'Elemental Kaspa Orb',
        description: 'Orb wielding raw elemental power.',
        rarity: 5,
      },
      {
        src: '/images/tridentofwisdom.png',
        alt: 'Trident of Wisdom',
        title: 'Trident of Wisdom',
        description: 'Trident enhancing sharp magical intellect.',
        rarity: 0.4,
      },
    ],
  },
  {
    category: 'Outfit',
    images: [
      {
        src: '/images/arcanerobe.png',
        alt: 'Arcane Robe',
        title: 'Arcane Robe',
        description: 'Robe amplifying potent spell potency.',
        rarity: 25,
      },
      {
        src: '/images/shadowmantle.png',
        alt: 'Shadow Mantle',
        title: 'Shadow Mantle',
        description: 'Mantle enhancing dark stealth abilities.',
        rarity: 20,
      },
      {
        src: '/images/celestialcloak.png',
        alt: 'Celestial Cloak',
        title: 'Celestial Cloak',
        description: 'Cloak granting swift celestial agility.',
        rarity: 5,
      },
      {
        src: '/images/eldrtichgarb.png',
        alt: 'Eldrtich Garb',
        title: 'Eldrtich Garb',
        description: 'Garb infused with eerie eldritch power.',
        rarity: 25,
      },
      {
        src: '/images/astralgown.png',
        alt: 'Astral Gown',
        title: 'Astral Gown',
        description: 'Gown shimmering with radiant astral light.',
        rarity: 25,
      },
      {
        src: '/images/goldcloak.png',
        alt: 'Gold Radiant Spellcloak',
        title: 'Gold Radiant Spellcloak',
        description: 'Cloak radiating brilliant golden magic.',
        rarity: 0.4,
      },
    ],
  },

  {
    category: 'Accessory',
    images: [
      {
        src: '/images/spiritmothswarm.png',
        alt: 'Spirit Moth Swarm',
        title: 'Spirit Moth Swarm',
        description: 'Pendant summoning ethereal spirit moth swarm.',
        rarity: 15,
      },
      {
        src: '/images/pipe.png',
        alt: 'Smoking Pipe',
        title: 'Smoking Pipe',
        description: 'Pipe enhancing deep mystical focus.',
        rarity: 10,
      },
      {
        src: '/images/eldrtichcharm.png',
        alt: 'Eldrtich Charm',
        title: 'Eldrtich Charm',
        description: 'Charm boosting swift arcane agility.',
        rarity: 25,
      },
      {
        src: '/images/mysticpendant.png',
        alt: 'Mystic Pendant',
        title: 'Mystic Pendant',
        description: 'Pendant amplifying strong magical power.',
        rarity: 25,
      },
      // {
      //   src: '/images/celestialpin.png',
      //   alt: 'Celestial Pin',
      //   title: 'Celestial Pin',
      //   description: 'Pin imbued with pure celestial energy.',
      //   rarity: 0.01,
      // },
    ],
  },
  {
    category: 'Eyes',
    images: [
      {
        src: '/images/redeyes.png',
        alt: 'Red Eyes',
        title: 'Red Eyes',
        description: 'Eyes glowing with fierce fiery intensity.',
        rarity: 25,
      },
      {
        src: '/images/whiteeyes.png',
        alt: 'White Eyes',
        title: 'White Eyes',
        description: 'Eyes shining with pure radiant light.',
        rarity: 25,
      },
      {
        src: '/images/kaspaeyes.png',
        alt: 'Kaspa Eyes',
        title: 'Kaspa Eyes',
        description: 'Eyes granting mystic elemental vision.',
        rarity: 5,
      },
      {
        src: '/images/blueeyes.png',
        alt: 'Blue Eyes',
        title: 'Blue Eyes',
        description: 'Eyes glowing with deep blue clarity.',
        rarity: 20,
      },
      {
        src: '/images/browneyes.png',
        alt: 'Dark Brown Eyes',
        title: 'Dark Brown Eyes',
        description: 'Eyes with warm, friendly earthy tones.',
        rarity: 25,
      },
      {
        src: '/images/goldeyes.png',
        alt: 'Gold Glowing Eyes',
        title: 'Gold Glowing Eyes',
        description: 'Eyes shimmering with radiant golden light.',
        rarity: 0.4,
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