import { $, component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

const LuUser = $(() => import('@qwikest/icons/lucide').then((m) => m.LuUser));
const LuShirt = $(() => import('@qwikest/icons/lucide').then((m) => m.LuShirt));
const LuEye = $(() => import('@qwikest/icons/lucide').then((m) => m.LuEye));
const LuHand = $(() => import('@qwikest/icons/lucide').then((m) => m.LuHand));
const LuSparkles = $(() => import('@qwikest/icons/lucide').then((m) => m.LuSparkles));

// Assume wizardCategories is defined elsewhere
export const ItemTabs = component$(() => {
  const activeTab = useSignal(0);
  const itemsPerPage = useSignal(16); // default to desktop

  const selectedImage = useSignal<{
    src: string;
    alt: string;
    title: string;
    description: string;
    rarity: number;
  } | null>(wizardCategories[0]?.images[0] || null);

  const currentPages = useSignal<number[]>(wizardCategories.map(() => 0));

  // Update selected image on tab change
  useTask$(({ track }) => {
    track(() => activeTab.value);
    const firstImg = wizardCategories[activeTab.value]?.images[0];
    if (firstImg) selectedImage.value = firstImg;
  });

  // Dynamically adjust itemsPerPage based on screen size
  useVisibleTask$(() => {
    const updateItemsPerPage = () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        itemsPerPage.value = 12; // 3 cols * 5 rows (mobile)
      } else {
        itemsPerPage.value = 16; // 4 cols * 4 rows (desktop)
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  });

  const getRarityClass = (rarity: number) => {
    if (rarity <= 1) return { text: 'legendary', color: 'text-orange-400' };
    if (rarity <= 5.1) return { text: 'rare', color: 'text-yellow-400' };
    if (rarity <= 15.1) return { text: 'uncommon', color: 'text-blue-400' };
    return { text: 'common', color: 'text-green-400' };
  };

  const getPaginatedImages = (images: any[], tabIndex: number) => {
    const page = currentPages.value[tabIndex];
    const start = page * itemsPerPage.value;
    return images.slice(start, start + itemsPerPage.value);
  };

  return (
    <div class="flex w-full max-w-4xl mx-auto bg-white/20 space-x-0 sm:space-x-2">
      <div class="w-full m-0">
        <Tabs.Root class="w-full">
          <Tabs.List class="grid w-full grid-cols-4 p-0 border rounded-md border-gray-300">
            {wizardCategories.map((wizard, index) => (
              <Tabs.Tab class="py-1" key={index} onClick$={() => (activeTab.value = index)}>
                {wizard.category}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {wizardCategories.map((wizard, index) => (
            <Tabs.Panel key={index}>
              <Card.Content class="p-0 !text-sm">
                <div class="flex flex-col sm:flex-row w-full m-0">
                  {/* Image Preview */}
                  <div class="w-full mx-auto space-y-1 sm:space-y-2 sm:order-1 px-2 pt-0 -mt-2">
                    <div class="p-2 border rounded flex flex-col items-center justify-between w-full border-gray-300">
                      {selectedImage.value ? (
                        <div class="text-center flex flex-col items-center w-full h-full">
                          <div class="flex-1 flex items-center justify-center w-full">
                            <img
                              src={selectedImage.value.src}
                              alt={selectedImage.value.alt}
                              class={`max-w-full max-h-32 sm:max-h-48 object-contain mx-auto ease-in-out
                                ${
                                  wizardCategories[activeTab.value].category === 'Clothing'
                                    ? 'transform -translate-y-10 sm:-translate-y-16 scale-125'
                                    : wizardCategories[activeTab.value].category === 'Head'
                                    ? 'transform translate-y-10 sm:translate-y-16 scale-125'
                                    : ''
                                }`}
                            />
                          </div>
                          <div class="text-sm mt-2">
                            <div class="font-semibold">{selectedImage.value.title}</div>
                            <div class="text-gray-400 pt-1">
                              Rarity: {selectedImage.value.rarity}% –{' '}
                              <span class={getRarityClass(selectedImage.value.rarity).color}>
                                {getRarityClass(selectedImage.value.rarity).text}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span class="text-gray-500">Select an image to preview</span>
                      )}
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div class="w-full mx-auto space-y-1 sm:space-y-2 md:pr-2 md:pb-2 mt-2 sm:-mt-2 sm:order-2 pb-1.5 py-3 px-1.5 pt-0 md:p-0 md:px-0">
                    <div class="flex items-center w-full">
                      <div class="grid grid-cols-3 sm:grid-cols-4 gap-1.5 w-full">
                        {getPaginatedImages(wizard.images, index).map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            class={`p-1 border-2 rounded flex items-center justify-center w-full ${
                              selectedImage.value?.src === img.src
                                ? 'border-teal-200 border-2'
                                : 'border-gray-200'
                            }`}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              class={`md:max-w-[5rem] md:max-h-[5rem] object-contain mx-auto
                                ${
                                  wizardCategories[activeTab.value].category === 'Clothing'
                                    ? 'transform -translate-y-6 scale-110'
                                    : wizardCategories[activeTab.value].category === 'Head'
                                    ? 'transform translate-y-8 scale-110'
                                    : ''
                                }`}
                              onClick$={() => (selectedImage.value = img)}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pagination */}
                    {wizard.images.length > itemsPerPage.value && (
                      <div class="flex justify-center mt-2 space-x-2">
                        <button
                          class="px-2 py-1 text-sm border rounded disabled:opacity-50"
                          onClick$={() => {
                            currentPages.value[index] = Math.max(0, currentPages.value[index] - 1);
                            currentPages.value = [...currentPages.value];
                          }}
                          disabled={currentPages.value[index] === 0}
                        >
                          Prev
                        </button>
                        <button
                          class="px-2 py-1 text-sm border rounded disabled:opacity-50"
                          onClick$={() => {
                            const maxPage = Math.floor(wizard.images.length / itemsPerPage.value);
                            currentPages.value[index] = Math.min(maxPage, currentPages.value[index] + 1);
                            currentPages.value = [...currentPages.value];
                          }}
                          disabled={(currentPages.value[index] + 1) * itemsPerPage.value >= wizard.images.length}
                        >
                          Next
                        </button>
                      </div>
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
      src: '/images/clothing/blacksuit5.png',
      alt: 'Black Suit',
      title: 'Black Suit',
      description: 'A formal black suit.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blacksweater5.png',
      alt: 'Black Sweater',
      title: 'Black Sweater',
      description: 'A cozy black sweater.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blacktshirt5.png',
      alt: 'Black Shirt',
      title: 'Black Shirt',
      description: 'A simple black shirt.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blueoverallgreyshirt5.png',
      alt: 'Blue Overall Grey Shirt',
      title: 'Blue Overall with Grey Shirt',
      description: 'Workwear with a blue overall and grey shirt.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blueoverallwhiteshirt5.png',
      alt: 'Blue Overall White Shirt',
      title: 'Blue Overall with White Shirt',
      description: 'Workwear with a blue overall and white shirt.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blueshirt1yellowtie.png',
      alt: 'Blue Shirt Yellow Tie',
      title: 'Blue Shirt with Yellow Tie',
      description: 'Smart outfit with a blue shirt and yellow tie.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blueshirt2redtie5.png',
      alt: 'Blue Shirt Red Tie',
      title: 'Blue Shirt with Red Tie',
      description: 'Smart outfit with a blue shirt and red tie.',
      rarity: 20,
    },
    {
      src: '/images/clothing/blueshirt2yellowtie.png',
      alt: 'Blue Shirt Yellow Tie 2',
      title: 'Alternate Blue Shirt with Yellow Tie',
      description: 'A different variation of the blue shirt and yellow tie.',
      rarity: 20,
    },
    {
      src: '/images/clothing/bluesweater2.png',
      alt: 'Blue Sweater',
      title: 'Blue Sweater',
      description: 'A warm blue sweater.',
      rarity: 20,
    },
    {
      src: '/images/clothing/brownsuit.png',
      alt: 'Brown Suit',
      title: 'Brown Suit',
      description: 'A classic brown suit.',
      rarity: 20,
    },
    {
      src: '/images/clothing/burgundysweater.png',
      alt: 'Burgundy Sweater',
      title: 'Burgundy Sweater',
      description: 'A stylish burgundy sweater.',
      rarity: 20,
    },
    {
      src: '/images/clothing/darkblueoverallwhiteshirt5.png',
      alt: 'Dark Blue Overall White Shirt',
      title: 'Dark Blue Overall with White Shirt',
      description: 'Dark blue overall paired with a white shirt.',
      rarity: 20,
    },
    {
      src: '/images/clothing/greenshirt2greentie.png',
      alt: 'Green Shirt Green Tie',
      title: 'Green Shirt with Green Tie',
      description: 'A matching green outfit.',
      rarity: 20,
    },
    {
      src: '/images/clothing/greenshirtredtie5.png',
      alt: 'Green Shirt Red Tie',
      title: 'Green Shirt with Red Tie',
      description: 'A festive green and red combo.',
      rarity: 20,
    },
    {
      src: '/images/clothing/greensquarestanktop.png',
      alt: 'Green Squares Tank Top',
      title: 'Green Squares Tank Top',
      description: 'Tank top with green square pattern.',
      rarity: 20,
    },
    {
      src: '/images/clothing/greyoverallwhiteshirt5.png',
      alt: 'Grey Overall White Shirt',
      title: 'Grey Overall with White Shirt',
      description: 'Grey overall combined with a white shirt.',
      rarity: 20,
    },
    {
      src: '/images/clothing/lightbrownsuit5.png',
      alt: 'Light Brown Suit',
      title: 'Light Brown Suit',
      description: 'A refined light brown suit.',
      rarity: 20,
    },
    {
      src: '/images/clothing/pinkflowertanktop.png',
      alt: 'Pink Flower Tank Top',
      title: 'Pink Flower Tank Top',
      description: 'Floral-patterned pink tank top.',
      rarity: 20,
    },
    {
      src: '/images/clothing/redsquarestanktop.png',
      alt: 'Red Squares Tank Top',
      title: 'Red Squares Tank Top',
      description: 'Tank top with red square pattern.',
      rarity: 20,
    },
    {
      src: '/images/clothing/redtanktop5.png',
      alt: 'Red Tank Top',
      title: 'Red Tank Top',
      description: 'A bold red tank top.',
      rarity: 20,
    },
    {
      src: '/images/clothing/redtiedietanktop.png',
      alt: 'Red Tie Dye Tank Top',
      title: 'Red Tie-Dye Tank Top',
      description: 'Red tie-dye tank for a unique style.',
      rarity: 20,
    },
    {
      src: '/images/clothing/whitetanktop5.png',
      alt: 'White Tank Top',
      title: 'White Tank Top',
      description: 'Classic white tank top.',
      rarity: 20,
    },
    {
      src: '/images/clothing/yellowshirtpinktie5.png',
      alt: 'Yellow Shirt Pink Tie',
      title: 'Yellow Shirt with Pink Tie',
      description: 'Bright yellow shirt with a pink tie.',
      rarity: 20,
    },
    {
      src: '/images/clothing/yellowsweater5.png',
      alt: 'Yellow Sweater',
      title: 'Yellow Sweater',
      description: 'A cheerful yellow sweater.',
      rarity: 20,
    },
  ],
  },
  {
    category: 'Head',
            icon: LuUser, // Icon for Body

      images: [
    {
      src: '/images/hat/baseballcap5.png',
      alt: 'Baseball Cap',
      title: 'Baseball Cap',
      description: 'A sporty baseball cap.',
      rarity: 20,
    },
    {
      src: '/images/hat/beaniebrown5.png',
      alt: 'Brown Beanie',
      title: 'Brown Beanie',
      description: 'A warm brown beanie.',
      rarity: 20,
    },
    {
      src: '/images/hat/beaniegreen5.png',
      alt: 'Green Beanie',
      title: 'Green Beanie',
      description: 'A cozy green beanie.',
      rarity: 20,
    },
    {
      src: '/images/hat/blackhair5.png',
      alt: 'Black Hair',
      title: 'Black Hair',
      description: 'Flowing black hair.',
      rarity: 20,
    },
    {
      src: '/images/hat/blackhat5.png',
      alt: 'Black Hat',
      title: 'Black Hat',
      description: 'A classic black hat.',
      rarity: 20,
    },
    {
      src: '/images/hat/brownhair5.png',
      alt: 'Brown Hair',
      title: 'Brown Hair',
      description: 'Natural brown hair.',
      rarity: 20,
    },
    {
      src: '/images/hat/capblue5.png',
      alt: 'Blue Cap',
      title: 'Blue Cap',
      description: 'A casual blue cap.',
      rarity: 20,
    },
    {
      src: '/images/hat/capgreen5.png',
      alt: 'Green Cap',
      title: 'Green Cap',
      description: 'A casual green cap.',
      rarity: 20,
    },
    {
      src: '/images/hat/capred5.png',
      alt: 'Red Cap',
      title: 'Red Cap',
      description: 'A casual red cap.',
      rarity: 20,
    },
    {
      src: '/images/hat/chefhat.png',
      alt: 'Chef Hat',
      title: 'Chef Hat',
      description: 'A culinary-inspired wizard hat.',
      rarity: 20,
    },
    {
      src: '/images/hat/constructionhelmet.png',
      alt: 'Construction Helmet',
      title: 'Construction Helmet',
      description: 'A sturdy helmet for safety.',
      rarity: 20,
    },
    {
      src: '/images/hat/hat.png',
      alt: 'Hat',
      title: 'Classic Hat',
      description: 'A wizard\'s classic pointed hat.',
      rarity: 20,
    },
    {
      src: '/images/hat/manhat5.png',
      alt: 'Man Hat',
      title: 'Man Hat',
      description: 'A stylish hat for men.',
      rarity: 20,
    },
    {
      src: '/images/hat/navyhat.png',
      alt: 'Navy Hat',
      title: 'Navy Hat',
      description: 'A deep blue navy cap.',
      rarity: 20,
    },
    {
      src: '/images/hat/none.png',
      alt: 'No Hat',
      title: 'No Hat',
      description: 'No headwear at all.',
      rarity: 25,
    },
    {
      src: '/images/hat/partyhatblue5.png',
      alt: 'Party Hat Blue',
      title: 'Blue Party Hat',
      description: 'A festive blue party hat.',
      rarity: 20,
    },
    {
      src: '/images/hat/partyhatpink5.png',
      alt: 'Party Hat Pink',
      title: 'Pink Party Hat',
      description: 'A festive pink party hat.',
      rarity: 20,
    },
    {
      src: '/images/hat/showercap.png',
      alt: 'Shower Cap',
      title: 'Shower Cap',
      description: 'A quirky shower cap.',
      rarity: 20,
    },
    {
      src: '/images/hat/strawhat5.png',
      alt: 'Straw Hat',
      title: 'Straw Hat',
      description: 'A breezy straw hat for sunny days.',
      rarity: 20,
    },
    {
      src: '/images/hat/sunvisorblue5.png',
      alt: 'Blue Sunvisor',
      title: 'Blue Sunvisor',
      description: 'A blue sunvisor for shade.',
      rarity: 20,
    },
    {
      src: '/images/hat/sunvisorred5.png',
      alt: 'Red Sunvisor',
      title: 'Red Sunvisor',
      description: 'A red sunvisor for sunny days.',
      rarity: 20,
    },
    {
      src: '/images/hat/tinfoilhat.png',
      alt: 'Tinfoil Hat',
      title: 'Tinfoil Hat',
      description: 'Protect your thoughts with this shiny headwear.',
      rarity: 10,
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