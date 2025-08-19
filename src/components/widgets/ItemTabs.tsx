import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

const LuUser = $(() => import('@qwikest/icons/lucide').then((m) => m.LuUser));
const LuShirt = $(() => import('@qwikest/icons/lucide').then((m) => m.LuShirt));
const LuEye = $(() => import('@qwikest/icons/lucide').then((m) => m.LuEye));
const LuHand = $(() => import('@qwikest/icons/lucide').then((m) => m.LuHand));
const LuSparkles = $(() => import('@qwikest/icons/lucide').then((m) => m.LuSparkles));

// Define the single wizard image for the entire set

// Define the wizard objects with new categories, images, and metadata
// (Assuming wizardCategories is defined elsewhere)

export const ItemTabs = component$(() => {
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
    <div class="flex w-full max-w-4xl mx-auto bg-white/50 space-x-0 sm:space-x-2">
      {/* Right 3/4: Tabs and content */}
      <div class="w-full m-0">
        <Tabs.Root class="w-full">
          {/* Dynamically generate tabs */}
          <Tabs.List class="grid w-full grid-cols-4 p-0 border rounded-md border-gray-300">
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
                <div class="flex flex-col sm:flex-row  w-full m-0">
                  {/* Showcase: Selected image preview with metadata */}
                  <div class="w-full mx-auto space-y-1 sm:space-y-2 sm:order-1 px-2 pt-0 -mt-2">
                    <div
                      class={`p-2 border rounded flex flex-col items-center justify-between w-full border-gray-300`}
                    >
                      {selectedImage.value ? (
                        <div class="text-center flex flex-col items-center w-full h-full">
                          <div class="flex-1 flex items-center justify-center w-full">
                            <img
                              src={selectedImage.value.src}
                              alt={selectedImage.value.alt}
                              class="max-w-full max-h-32 sm:max-h-48 object-contain mx-auto"
                            />
                          </div>
                          <div class="text-sm mt-2">
                            <div class="font-semibold">{selectedImage.value.title}</div>
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
                  <div class="w-full mx-auto space-y-1 sm:space-y-2 md:pr-2 md:pb-2 mt-2 sm:-mt-2 sm:order-2 pb-1.5 py-3 px-1.5 pt-0 md:p-0 md:px-0">
                    <div class="flex items-center w-full">
                      <div class="grid  grid-cols-3 sm:grid-cols-4 gap-1.5 w-full">
                        {wizard.images.map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            class={`p-1 border-2 rounded flex items-center justify-center w-full ${
                              selectedImage.value?.src === img.src
                                ? 'border-teal-200 border-4'
                                : 'border-gray-200'
                            }`}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              class="md:max-w-[5rem] md:max-h-[5rem] object-contain mx-auto"
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







const wizardCategories = [
 
  {
    category: 'Body',
    images: [
      {
            icon: LuUser, // Icon for Body

        src: '/images/body/blue.png',
        alt: 'Slim Body',
        title: 'Blue Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/brown.png',
        alt: 'Slim Body',
        title: 'Brown Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/caramel.png',
        alt: 'Slim Body',
        title: 'Caramel Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/chocolate.png',
        alt: 'Slim Body',
        title: 'Chocolate Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/darkgrey.png',
        alt: 'Dark Grey Body',
        title: 'Brown Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/mint.png',
        alt: 'Slim Body',
        title: 'Mint Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/orange.png',
        alt: 'Slim Body',
        title: 'Orange Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/pink.png',
        alt: 'Slim Body',
        title: 'Pink Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
       {
        src: '/images/body/plain2.png',
        alt: 'Slim Body',
        title: 'Plain 2 Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
        {
        src: '/images/body/red.png',
        alt: 'Slim Body',
        title: 'Red Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
        {
        src: '/images/body/yellow.png',
        alt: 'Slim Body',
        title: 'Yellow Body',
        description: 'A slender wizard physique.',
        rarity: 25,
      },
   
    ],
  },
  {
    category: 'Clothing',
        icon: LuShirt, // Icon for Clothing

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
    ],
  },
  {
    category: 'Head',
            icon: LuUser, // Icon for Body

    images: [
      {
        src: '/images/_chefhat.png',
        alt: 'Chef Hat',
        title: 'Chef Hat',
        description: 'A culinary-inspired wizard hat.',
        rarity: 20,
      },
      {
        src: '/images/_constructionhelmet.png',
        alt: 'Construction Helmet',
        title: 'Construction Helmet',
        description: 'A sturdy construction helmet.',
        rarity: 20,
      },
      {
        src: '/images/_hat.png',
        alt: 'Hat',
        title: 'Hat',
        description: 'A classic wizard hat.',
        rarity: 20,
      },
      {
        src: '/images/_none.png',
        alt: 'No Headwear',
        title: 'No Headwear',
        description: 'Bare head with no hat.',
        rarity: 20,
      },
      {
        src: '/images/_showercap.png',
        alt: 'Shower Cap',
        title: 'Shower Cap',
        description: 'A quirky shower cap.',
        rarity: 20,
      },
      {
        src: '/images/chefhat.png',
        alt: 'Chef Hat',
        title: 'Chef Hat',
        description: 'Another culinary hat variant.',
        rarity: 25,
      },
      {
        src: '/images/constructionhelmet.png',
        alt: 'Construction Helmet',
        title: 'Construction Helmet',
        description: 'Another sturdy helmet variant.',
        rarity: 25,
      },
      {
        src: '/images/hat.png',
        alt: 'Hat',
        title: 'Hat',
        description: 'Another classic hat variant.',
        rarity: 25,
      },
      {
        src: '/images/none.png',
        alt: 'No Headwear',
        title: 'No Headwear',
        description: 'Another bare head option.',
        rarity: 25,
      },
      {
        src: '/images/showercap.png',
        alt: 'Shower Cap',
        title: 'Shower Cap',
        description: 'Another quirky cap variant.',
        rarity: 25,
      },
    ],
  },
{
  category: 'Eyes',
      icon: LuEye, // Icon for Eyes

  images: [
    {
      src: '/images/eyes/aviatornoglass5.png',
      alt: 'Aviator No Glass',
      title: 'Aviator No Glass',
      description: 'Aviator-style eyes without glass.',
      rarity: 15,
    },
    {
      src: '/images/eyes/blackaviator5.png',
      alt: 'Black Aviator',
      title: 'Black Aviator',
      description: 'Black aviator-style eyes.',
      rarity: 15,
    },
    {
      src: '/images/eyes/blackbrownstarglasses.png',
      alt: 'Black Brown Star Glasses',
      title: 'Black Brown Star Glasses',
      description: 'Black glasses with brown star accents.',
      rarity: 10,
    },
    {
      src: '/images/eyes/blacksunglasses.png',
      alt: 'Black Sunglasses',
      title: 'Black Sunglasses',
      description: 'Classic black sunglasses.',
      rarity: 20,
    },
    {
      src: '/images/eyes/blueaviator5.png',
      alt: 'Blue Aviator',
      title: 'Blue Aviator',
      description: 'Blue-tinted aviator eyes.',
      rarity: 15,
    },
    {
      src: '/images/eyes/clearaviator5.png',
      alt: 'Clear Aviator',
      title: 'Clear Aviator',
      description: 'Clear aviator-style eyes.',
      rarity: 15,
    },
    {
      src: '/images/eyes/doubtbrows.png',
      alt: 'Doubt Brows',
      title: 'Doubt Brows',
      description: 'Eyes with skeptical brow expression.',
      rarity: 25,
    },
    {
      src: '/images/eyes/eyebags.png',
      alt: 'Eyebags',
      title: 'Eyebags',
      description: 'Eyes with noticeable bags.',
      rarity: 30,
    },
    {
      src: '/images/eyes/goldaviator5.png',
      alt: 'Gold Aviator',
      title: 'Gold Aviator',
      description: 'Gold-tinted aviator eyes.',
      rarity: 10,
    },
    {
      src: '/images/eyes/goldpinkstarglasses.png',
      alt: 'Gold Pink Star Glasses',
      title: 'Gold Pink Star Glasses',
      description: 'Gold glasses with pink star accents.',
      rarity: 8,
    },
    {
      src: '/images/eyes/lasereyes5.png',
      alt: 'Laser Eyes',
      title: 'Laser Eyes',
      description: 'Eyes emitting laser beams.',
      rarity: 5,
    },
    {
      src: '/images/eyes/madbrows.png',
      alt: 'Mad Brows',
      title: 'Mad Brows',
      description: 'Eyes with angry brow expression.',
      rarity: 25,
    },
    {
      src: '/images/eyes/monocle.png',
      alt: 'Monocle',
      title: 'Monocle',
      description: 'Eyes with a single monocle.',
      rarity: 12,
    },
    {
      src: '/images/eyes/none.png',
      alt: 'No Eyes',
      title: 'No Eyes',
      description: 'No visible eyes.',
      rarity: 40,
    },
    {
      src: '/images/eyes/pinkaviator5.png',
      alt: 'Pink Aviator',
      title: 'Pink Aviator',
      description: 'Pink-tinted aviator eyes.',
      rarity: 15,
    },
    {
      src: '/images/eyes/pinkhearts.png',
      alt: 'Pink Hearts',
      title: 'Pink Hearts',
      description: 'Eyes with pink heart shapes.',
      rarity: 10,
    },
    {
      src: '/images/eyes/reading5.png',
      alt: 'Reading Glasses',
      title: 'Reading Glasses',
      description: 'Eyes with reading glasses.',
      rarity: 20,
    },
    {
      src: '/images/eyes/rectangles5.png',
      alt: 'Rectangles',
      title: 'Rectangles',
      description: 'Eyes with rectangular frames.',
      rarity: 15,
    },
    {
      src: '/images/eyes/sadbrows.png',
      alt: 'Sad Brows',
      title: 'Sad Brows',
      description: 'Eyes with sad brow expression.',
      rarity: 25,
    },
    {
      src: '/images/eyes/sunsetaviator5.png',
      alt: 'Sunset Aviator',
      title: 'Sunset Aviator',
      description: 'Aviator eyes with sunset hues.',
      rarity: 10,
    },
 
  ],
},
  {
    category: 'Mouth',
            icon: LuUser, // Icon for Body

    images: [
      {
        src: '/images/smile.png',
        alt: 'Smile',
        title: 'Smile',
        description: 'A warm, friendly smile.',
        rarity: 25,
      },
      {
        src: '/images/frown.png',
        alt: 'Frown',
        title: 'Frown',
        description: 'A serious frown expression.',
        rarity: 20,
      },
    ],
  },
  {
    category: 'Hand',
        icon: LuHand, // Icon for Hand

    images: [
      {
        src: '/images/openhand.png',
        alt: 'Open Hand',
        title: 'Open Hand',
        description: 'An open hand gesture.',
        rarity: 25,
      },
      {
        src: '/images/clenchedfist.png',
        alt: 'Clenched Fist',
        title: 'Clenched Fist',
        description: 'A clenched fist pose.',
        rarity: 20,
      },
    ],
  },


 {
    category: 'Backgrounds',
    icon: LuSparkles,
    images: [
      {
        src: '/images/background/blue.png',
        alt: 'Blue Background',
        title: 'Blue Background',
        description: 'A serene blue backdrop.',
        rarity: 20,
      },
      {
        src: '/images/background/green.png',
        alt: 'Green Background',
        title: 'Green Background',
        description: 'A vibrant green scene.',
        rarity: 25,
      },
      {
        src: '/images/background/green2.png',
        alt: 'Green 2 Background',
        title: 'Green 2 Background',
        description: 'Another green variant.',
        rarity: 25,
      },
      {
        src: '/images/background/grey.png',
        alt: 'Grey Background',
        title: 'Grey Background',
        description: 'A neutral grey backdrop.',
        rarity: 20,
      },
      {
        src: '/images/background/kaspa1.png',
        alt: 'Kaspa 1 Background',
        title: 'Kaspa 1 Background',
        description: 'A Kaspa-themed background.',
        rarity: 20,
      },
      {
        src: '/images/background/kaspa2.png',
        alt: 'Kaspa 2 Background',
        title: 'Kaspa 2 Background',
        description: 'Another Kaspa-themed variant.',
        rarity: 20,
      },
      {
        src: '/images/background/orange.png',
        alt: 'Orange Background',
        title: 'Orange Background',
        description: 'A warm orange scene.',
        rarity: 25,
      },
      {
        src: '/images/background/pink.png',
        alt: 'Pink Background',
        title: 'Pink Background',
        description: 'A soft pink backdrop.',
        rarity: 20,
      },
      {
        src: '/images/background/purple.png',
        alt: 'Purple Background',
        title: 'Purple Background',
        description: 'A mystical purple scene.',
        rarity: 25,
      },
      {
        src: '/images/background/purple2.png',
        alt: 'Purple 2 Background',
        title: 'Purple 2 Background',
        description: 'Another purple variant.',
        rarity: 25,
      },
      {
        src: '/images/background/red.png',
        alt: 'Red Background',
        title: 'Red Background',
        description: 'A bold red backdrop.',
        rarity: 20,
      },
      {
        src: '/images/background/yellow.png',
        alt: 'Yellow Background',
        title: 'Yellow Background',
        description: 'A bright yellow scene.',
        rarity: 25,
      },
      {
        src: '/images/background/yellow2.png',
        alt: 'Yellow 2 Background',
        title: 'Yellow 2 Background',
        description: 'Another yellow variant.',
        rarity: 25,
      },
    ],
  },

];