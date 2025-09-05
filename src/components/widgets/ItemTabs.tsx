import { $, component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

const LuUser = $(() => import('@qwikest/icons/lucide').then((m) => m.LuUser));
const LuShirt = $(() => import('@qwikest/icons/lucide').then((m) => m.LuShirt));
const LuEye = $(() => import('@qwikest/icons/lucide').then((m) => m.LuEye));
const LuSparkles = $(() => import('@qwikest/icons/lucide').then((m) => m.LuSparkles));

interface ImageItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  rarity: number;
}

interface WizardCategory {
  category: 'Body' | 'Head' | 'Hand' | 'Clothing' | 'Eyes' | 'Mouth' | 'Backgrounds' | 'Oneof1';
  icon: any;
  images: ImageItem[];
}

// Pre-sort images in each category by rarity ascending


export const ItemTabs = component$(() => {
  const activeTab = useSignal(0);
  const itemsPerPage = useSignal(16); // default to desktop
  const selectedImage = useSignal<ImageItem | null>(sortedWizardCategories[0]?.images[0] || null);
  const currentPages = useSignal<number[]>(sortedWizardCategories.map(() => 0));

  useTask$(({ track }) => {
    track(() => activeTab.value);
    const firstImg = sortedWizardCategories[activeTab.value]?.images[0];
    selectedImage.value = firstImg || null;
  });

  useVisibleTask$(() => {
    const updateItemsPerPage = () => {
      itemsPerPage.value = window.matchMedia('(max-width: 640px)').matches ? 12 : 20;
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  });

  const getRarityClass = (rarity: number) => {
    if (rarity <= 1) return { text: 'legendary', color: 'text-orange-400' };
    if (rarity <= 5.1) return { text: 'rare', color: 'text-yellow-400' };
    if (rarity <= 15.1) return { text: 'uncommon', color: 'text-blue-400' };
    return { text: 'common', color: 'text-green-400' };
  };

  const getPaginatedImages = (images: ImageItem[], tabIndex: number) => {
    const page = currentPages.value[tabIndex];
    return images.slice(page * itemsPerPage.value, (page + 1) * itemsPerPage.value);
  };

  const categoryToPath: Record<WizardCategory['category'], string> = {
    Body: '/images/body/',
    Head: '/images/hat/',
    Hand: '/images/items/hand/',
    Clothing: '/images/clothing/',
    Eyes: '/images/eyes/',
    Mouth: '/images/mouth/',
    Backgrounds: '/images/background/',
    Oneof1: '/images/Oneof1/',
  };

  const getImagePath = (src: string, category: WizardCategory['category']) => {
    const basePath = categoryToPath[category];
    const fileName = src.split('/').pop() || '';
    if (!fileName) {
      console.error('Invalid src path:', src);
      return '';
    }
    return `${basePath}${fileName}`;
  };

  return (
    <div class="flex w-full max-w-4xl mx-auto -mt-0.5 space-x-0 sm:space-x-2">
      <div class="w-full">
        <Tabs.Root class="w-full">
          <Tabs.List class="grid w-full grid-cols-4 shadow-md bg-white/70 rounded-md border-gray-300 z-20">
            {sortedWizardCategories.map((wizard, index) => (
              <Tabs.Tab key={index} class="py-1" onClick$={() => (activeTab.value = index)}>
                {wizard.category === 'Oneof1' ? '1/1' : wizard.category}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {sortedWizardCategories.map((wizard, index) => (
            <Tabs.Panel key={index}>
              <Card.Content class="p-0 !text-sm">
                <div class="flex flex-col sm:flex-row w-full gap-2 min-h-[28rem] md:min-h-[17rem]">
                  {/* Selected Image Preview */}
                  <div class="mx-auto sm:w-1/3 relative z-0">
                    <div class="p-2 shadow-xl rounded-lg flex flex-col bg-white/50 items-center justify-center w-full border-gray-300 min-w-[9rem]">
                      {selectedImage.value ? (
                        <div class="flex-1 flex items-center justify-center w-full">
                          <img
                            src={getImagePath(selectedImage.value.src, sortedWizardCategories[activeTab.value].category)}
                            alt={selectedImage.value.alt}
                            class={twMerge(
                              'max-h-24 sm:max-h-48 object-contain mx-auto ease-in-out ',
                              sortedWizardCategories[activeTab.value].category === 'Head' && 'scale-100 translate-y-8'
                            )}
                            onError$={(e) => console.error('Image load error:', e, selectedImage.value?.src)}
                          />
                        </div>
                      ) : (
                        <span class="text-gray-500">Select an image to preview</span>
                      )}
                      {selectedImage.value && (
                        <div class="text-sm mt-2 text-center">
                          <div class="font-semibold">{selectedImage.value.title}</div>
                          <div class="text-gray-400 pt-1">
                            Rarity: {selectedImage.value.rarity}% –{' '}
                            <span class={getRarityClass(selectedImage.value.rarity).color}>
                              {getRarityClass(selectedImage.value.rarity).text}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div class="w-full flex-1 px-1.5 sm:px-0 mx-auto">
                    <div class="grid grid-cols-4 sm:grid-cols-7 gap-2 mx-auto">
                      {getPaginatedImages(wizard.images, index).map((img, imgIndex) => (
                        <button
                          key={imgIndex}
                          class={twMerge(
                            `p-0.5 flex items-center bg-white/60 shadow-md rounded-lg justify-center aspect-[1/1] transition-transform duration-150`,
                            selectedImage.value?.src === img.src
                              ? 'border-2 border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)] scale-105'
                              : 'border border-transparent',
                            (wizard.category === 'Body' || wizard.category === 'Oneof1') && selectedImage.value?.src === img.src
                              ? 'p-0.75'
                              : 'p-0.5'
                          )}
                          style={{ boxSizing: 'border-box' }}
                          onClick$={() => (selectedImage.value = img)}
                        >
                          <img
                            src={getImagePath(img.src, wizard.category)}
                            alt={img.alt}
                            class={twMerge(
                              'w-full h-full object-contain ',
                              sortedWizardCategories[activeTab.value].category === 'Head' && 'scale-150 translate-y-5'
                            )}
                            onError$={(e) => console.error('Image load error:', e, img.src)}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div class={`flex justify-end space-x-2 mt-3 mb-2 ${wizard.images.length <= itemsPerPage.value ? 'opacity-0' : ''}`}>
                      <button
                        class="px-2 pb-0 text-sm bg-white/70 border rounded disabled:opacity-50"
                        onClick$={() => {
                          currentPages.value[index] = Math.max(0, currentPages.value[index] - 1);
                          currentPages.value = [...currentPages.value];
                        }}
                        disabled={currentPages.value[index] === 0 || wizard.images.length <= itemsPerPage.value}
                      >
                        ←
                      </button>
                      <button
                        class="px-2 py-1 text-sm bg-white/70 border rounded disabled:opacity-50"
                        onClick$={() => {
                          const maxPage = Math.floor(wizard.images.length / itemsPerPage.value);
                          currentPages.value[index] = Math.min(maxPage, currentPages.value[index] + 1);
                          currentPages.value = [...currentPages.value];
                        }}
                        disabled={
                          (currentPages.value[index] + 1) * itemsPerPage.value >= wizard.images.length ||
                          wizard.images.length <= itemsPerPage.value
                        }
                      >
                        →
                      </button>
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







export const wizardCategories: WizardCategory[] = [
     {
    category: 'Oneof1',
    icon: LuUser, // Using LuUser as a placeholder since no specific icon provided
    images: [
      { src: '/images/Oneof1/1.png', alt: 'SompoBear', title: 'Pure Gold', description: 'A unique SompoBear design.', rarity: 0.05 },
      { src: '/images/Oneof1/2.jpeg', alt: 'SompoBull', title: 'Ying', description: 'A unique SompoBull design.', rarity: 0.05 },
      { src: '/images/Oneof1/3.jpeg', alt: 'SuttonBear', title: 'Yang', description: 'A unique SuttonBear design.', rarity: 0.05 },
      { src: '/images/Oneof1/4.jpeg', alt: 'SuttonBull', title: 'Diamond Paws', description: 'A unique SuttonBull design.', rarity: 0.5 },
      { src: '/images/Oneof1/5.jpeg', alt: 'ShaiBear', title: 'Clown Mice', description: 'A unique ShaiBear design.', rarity: 0.05 },
      { src: '/images/Oneof1/6.jpeg', alt: 'ShaiBull', title: 'SilentNightKritter', description: 'A unique ShaiBull design.', rarity: 0.05 },
      { src: '/images/Oneof1/7.jpeg', alt: 'DiamondBear', title: 'Florida Man', description: 'A unique DiamondBear design.', rarity: 0.05 },
      { src: '/images/Oneof1/8.jpeg', alt: 'DiamondBull', title: 'Degen Kritter', description: 'A unique DiamondBull design.', rarity: 0.05 },
      { src: '/images/Oneof1/9.jpeg', alt: 'KritterKingBear', title: 'NeoKritter', description: 'A unique KritterKingBear design.', rarity: 0.05 },
      { src: '/images/Oneof1/10.jpeg', alt: 'KritterKingBull', title: 'Sensei Kritter', description: 'A unique KritterKingBull design.', rarity: 0.05 },
      { src: '/images/Oneof1/11.jpeg', alt: 'BearBot', title: 'Blessings', description: 'A unique BearBot design.', rarity: 0.05 },
      { src: '/images/Oneof1/12.jpeg', alt: 'BullBot', title: 'ApolloKritter', description: 'A unique BullBot design.', rarity: 0.5 },
     
    ],
  },
    {
    category: 'Body',
    icon: LuUser,
    images: [
      { src: '/images/body/gold.png', alt: 'gold', title: 'gold', description: '', rarity: 0.4 },
      { src: '/images/body/negative.png', alt: 'negative', title: 'negative', description: '', rarity: 0.4 },
      { src: '/images/body/plain.png', alt: 'plain', title: 'plain', description: '', rarity: 0.4 },
      { src: '/images/body/brown.png', alt: 'brown', title: 'brown', description: '', rarity: 2.8 },
      { src: '/images/body/darkgrey.png', alt: 'darkgrey', title: 'darkgrey', description: '', rarity: 4.0 },
      { src: '/images/body/red.png', alt: 'red', title: 'red', description: '', rarity: 6.0 },
      { src: '/images/body/orange.png', alt: 'orange', title: 'orange', description: '', rarity: 7.6 },
      { src: '/images/body/mint.png', alt: 'mint', title: 'mint', description: '', rarity: 8.4 },
      { src: '/images/body/chocolate.png', alt: 'chocolate', title: 'chocolate', description: '', rarity: 8.8 },
      { src: '/images/body/yellow.png', alt: 'yellow', title: 'yellow', description: '', rarity: 10.8 },
      { src: '/images/body/blue.png', alt: 'blue', title: 'blue', description: '', rarity: 11.2 },
      { src: '/images/body/plain2.png', alt: 'plain2', title: 'plain2', description: '', rarity: 11.6 },
      { src: '/images/body/caramel.png', alt: 'caramel', title: 'caramel', description: '', rarity: 13.6 },
      { src: '/images/body/pink.png', alt: 'pink', title: 'pink', description: '', rarity: 14.0 },
    ],
  },
  {
    category: 'Backgrounds',
    icon: LuSparkles,
    images: [
      { src: '/images/backgrounds/christmas.png', alt: 'christmas', title: 'christmas', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/hell.png', alt: 'hell', title: 'hell', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/samurai.png', alt: 'samurai', title: 'samurai', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/gold.png', alt: 'gold', title: 'gold', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/heaven.png', alt: 'heaven', title: 'heaven', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/black.png', alt: 'black', title: 'black', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/space.png', alt: 'space', title: 'space', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/white.png', alt: 'white', title: 'white', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/stocks.png', alt: 'stocks', title: 'stocks', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/circus.png', alt: 'circus', title: 'circus', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/matrix.png', alt: 'matrix', title: 'matrix', description: '', rarity: 0.4 },
      { src: '/images/backgrounds/yellow2.png', alt: 'yellow2', title: 'yellow2', description: '', rarity: 1.6 },
      { src: '/images/backgrounds/purple.png', alt: 'purple', title: 'purple', description: '', rarity: 1.6 },
      { src: '/images/backgrounds/purple2.png', alt: 'purple2', title: 'purple2', description: '', rarity: 1.6 },
      { src: '/images/backgrounds/red.png', alt: 'red', title: 'red', description: '', rarity: 1.6 },
      { src: '/images/backgrounds/blue2.png', alt: 'blue2', title: 'blue2', description: '', rarity: 2.0 },
      { src: '/images/backgrounds/green2.png', alt: 'green2', title: 'green2', description: '', rarity: 2.0 },
      { src: '/images/backgrounds/orange.png', alt: 'orange', title: 'orange', description: '', rarity: 2.8 },
      { src: '/images/backgrounds/kaspa2.png', alt: 'kaspa2', title: 'kaspa2', description: '', rarity: 2.8 },
      { src: '/images/backgrounds/blue.png', alt: 'blue', title: 'blue', description: '', rarity: 3.2 },
      { src: '/images/backgrounds/yellow.png', alt: 'yellow', title: 'yellow', description: '', rarity: 3.2 },
      { src: '/images/backgrounds/green.png', alt: 'green', title: 'green', description: '', rarity: 4.0 },
      { src: '/images/backgrounds/grey.png', alt: 'grey', title: 'grey', description: '', rarity: 4.4 },
      { src: '/images/backgrounds/pink.png', alt: 'pink', title: 'pink', description: '', rarity: 4.8 },
      { src: '/images/backgrounds/kaspa1.png', alt: 'kaspa1', title: 'kaspa1', description: '', rarity: 60.0 },
    ],
  },
   {
    category: 'Head',
    icon: LuUser,
    images: [
      { src: '/images/head/christmashat.png', alt: 'christmashat', title: 'christmashat', description: '', rarity: 0.4 },
      { src: '/images/head/halo.png', alt: 'halo', title: 'halo', description: '', rarity: 0.4 },
      { src: '/images/head/astronauthelmet.png', alt: 'astronauthelmet', title: 'astronauthelmet', description: '', rarity: 0.4 },
      { src: '/images/head/beanieblack5.png', alt: 'beanieblack5', title: 'beanieblack5', description: '', rarity: 0.4 },
      { src: '/images/head/blondehair5.png', alt: 'blondehair5', title: 'blondehair5', description: '', rarity: 0.4 },
      { src: '/images/head/clownnose-partyhatpurple.png', alt: 'clownnose-partyhatpurple', title: 'clownnose-partyhatpurple', description: '', rarity: 0.4 },
      { src: '/images/head/chefhat.png', alt: 'chefhat', title: 'chefhat', description: '', rarity: 1.6 },
      { src: '/images/head/showercap.png', alt: 'showercap', title: 'showercap', description: '', rarity: 2.0 },
      { src: '/images/head/blackhat5.png', alt: 'blackhat5', title: 'blackhat5', description: '', rarity: 2.0 },
      { src: '/images/head/brownhair5.png', alt: 'brownhair5', title: 'brownhair5', description: '', rarity: 2.4 },
      { src: '/images/head/sunvisorred5.png', alt: 'sunvisorred5', title: 'sunvisorred5', description: '', rarity: 2.4 },
      { src: '/images/head/hat.png', alt: 'hat', title: 'hat', description: '', rarity: 2.4 },
      { src: '/images/head/navyhat.png', alt: 'navyhat', title: 'navyhat', description: '', rarity: 2.4 },
      { src: '/images/head/beaniegreen5.png', alt: 'beaniegreen5', title: 'beaniegreen5', description: '', rarity: 2.8 },
      { src: '/images/head/constructionhelmet.png', alt: 'constructionhelmet', title: 'constructionhelmet', description: '', rarity: 3.2 },
      { src: '/images/head/capred5.png', alt: 'capred5', title: 'capred5', description: '', rarity: 3.2 },
      { src: '/images/head/strawhat5.png', alt: 'strawhat5', title: 'strawhat5', description: '', rarity: 4.4 },
      { src: '/images/head/baseballcap5.png', alt: 'baseballcap5', title: 'baseballcap5', description: '', rarity: 4.4 },
      { src: '/images/head/capblue5.png', alt: 'capblue5', title: 'capblue5', description: '', rarity: 4.4 },
      { src: '/images/head/manhat5.png', alt: 'manhat5', title: 'manhat5', description: '', rarity: 4.8 },
      { src: '/images/head/partyhatpink5.png', alt: 'partyhatpink5', title: 'partyhatpink5', description: '', rarity: 5.2 },
      { src: '/images/head/beaniebrown5.png', alt: 'beaniebrown5', title: 'beaniebrown5', description: '', rarity: 5.2 },
      { src: '/images/head/sunvisorblue5.png', alt: 'sunvisorblue5', title: 'sunvisorblue5', description: '', rarity: 5.6 },
      { src: '/images/head/tinfoilhat.png', alt: 'tinfoilhat', title: 'tinfoilhat', description: '', rarity: 6.0 },
      { src: '/images/head/partyhatblue5.png', alt: 'partyhatblue5', title: 'partyhatblue5', description: '', rarity: 6.8 },
      { src: '/images/head/capgreen5.png', alt: 'capgreen5', title: 'capgreen5', description: '', rarity: 6.8 },
      { src: '/images/head/blackhair5.png', alt: 'blackhair5', title: 'blackhair5', description: '', rarity: 6.8 },
      { src: '/images/head/none.png', alt: 'none', title: 'none', description: '', rarity: 12.8 },
    ],
  },
   {
    category: 'Eyes',
    icon: LuEye,
    images: [
      { src: '/images/eyes/sad-goldpinkstarglasses.png', alt: 'sad-goldpinkstarglasses', title: 'sad-goldpinkstarglasses', description: '', rarity: 0.4 },
      { src: '/images/eyes/relaxbrows5.png', alt: 'relaxbrows5', title: 'relaxbrows5', description: '', rarity: 0.4 },
      { src: '/images/eyes/blacksunglasses-doubtbrows.png', alt: 'blacksunglasses-doubtbrows', title: 'blacksunglasses-doubtbrows', description: '', rarity: 0.4 },
      { src: '/images/eyes/thuglifeglasses.png', alt: 'thuglifeglasses', title: 'thuglifeglasses', description: '', rarity: 0.4 },
      { src: '/images/eyes/goldaviator5.png', alt: 'goldaviator5', title: 'goldaviator5', description: '', rarity: 1.6 },
      { src: '/images/eyes/lasereyes5.png', alt: 'lasereyes5', title: 'lasereyes5', description: '', rarity: 1.6 },
      { src: '/images/eyes/blackaviator5.png', alt: 'blackaviator5', title: 'blackaviator5', description: '', rarity: 2.4 },
      { src: '/images/eyes/sunsetaviator5.png', alt: 'sunsetaviator5', title: 'sunsetaviator5', description: '', rarity: 2.4 },
      { src: '/images/eyes/reading5.png', alt: 'reading5', title: 'reading5', description: '', rarity: 2.8 },
      { src: '/images/eyes/eyebags.png', alt: 'eyebags', title: 'eyebags', description: '', rarity: 2.8 },
      { src: '/images/eyes/blacksunglasses.png', alt: 'blacksunglasses', title: 'blacksunglasses', description: '', rarity: 2.8 },
      { src: '/images/eyes/sadbrows.png', alt: 'sadbrows', title: 'sadbrows', description: '', rarity: 3.2 },
      { src: '/images/eyes/pinkaviator5.png', alt: 'pinkaviator5', title: 'pinkaviator5', description: '', rarity: 3.6 },
      { src: '/images/eyes/pinkhearts.png', alt: 'pinkhearts', title: 'pinkhearts', description: '', rarity: 4.4 },
      { src: '/images/eyes/monocle.png', alt: 'monocle', title: 'monocle', description: '', rarity: 4.4 },
      { src: '/images/eyes/goldpinkstarglasses.png', alt: 'goldpinkstarglasses', title: 'goldpinkstarglasses', description: '', rarity: 5.2 },
      { src: '/images/eyes/doubtbrows.png', alt: 'doubtbrows', title: 'doubtbrows', description: '', rarity: 6.0 },
      { src: '/images/eyes/madbrows.png', alt: 'madbrows', title: 'madbrows', description: '', rarity: 6.0 },
      { src: '/images/eyes/aviatornoglass5.png', alt: 'aviatornoglass5', title: 'aviatornoglass5', description: '', rarity: 6.8 },
      { src: '/images/eyes/blueaviator5.png', alt: 'blueaviator5', title: 'blueaviator5', description: '', rarity: 6.8 },
      { src: '/images/eyes/blackbrownstarglasses.png', alt: 'blackbrownstarglasses', title: 'blackbrownstarglasses', description: '', rarity: 7.2 },
      { src: '/images/eyes/rectangles5.png', alt: 'rectangles5', title: 'rectangles5', description: '', rarity: 7.6 },
      { src: '/images/eyes/clearaviator5.png', alt: 'clearaviator5', title: 'clearaviator5', description: '', rarity: 8.4 },
      { src: '/images/eyes/none.png', alt: 'none', title: 'none', description: '', rarity: 12.4 },
    ],
  },
   {
    category: 'Mouth',
    icon: LuUser,
    images: [
      { src: '/images/mouth/zipper.png', alt: 'zipper', title: 'zipper', description: '', rarity: 1.6 },
      { src: '/images/mouth/censured.png', alt: 'censured', title: 'censured', description: '', rarity: 2.8 },
      { src: '/images/mouth/bubblegum.png', alt: 'bubblegum', title: 'bubblegum', description: '', rarity: 4.0 },
      { src: '/images/mouth/none.png', alt: 'none', title: 'none', description: '', rarity: 91.6 },
    ],
  },
   {
    category: 'Hand',
    icon: LuUser,
    images: [
      { src: '/images/hand/beer.png', alt: 'beer', title: 'beer', description: '', rarity: 0.4 },
      { src: '/images/hand/icecreamtrawberry.png', alt: 'icecreamtrawberry', title: 'icecreamtrawberry', description: '', rarity: 0.4 },
      { src: '/images/hand/katana.png', alt: 'katana', title: 'katana', description: '', rarity: 0.4 },
      { src: '/images/hand/astronautglove.png', alt: 'astronautglove', title: 'astronautglove', description: '', rarity: 0.4 },
      { src: '/images/hand/cigar.png', alt: 'cigar', title: 'cigar', description: '', rarity: 0.4 },
      { src: '/images/hand/diamond.png', alt: 'diamond', title: 'diamond', description: '', rarity: 0.4 },
      { src: '/images/hand/gun.png', alt: 'gun', title: 'gun', description: '', rarity: 0.4 },
      { src: '/images/hand/balloongold.png', alt: 'balloongold', title: 'balloongold', description: '', rarity: 0.8 },
      { src: '/images/hand/Hammer.png', alt: 'Hammer', title: 'Hammer', description: '', rarity: 0.8 },
      { src: '/images/hand/powerplug.png', alt: 'powerplug', title: 'powerplug', description: '', rarity: 0.8 },
      { src: '/images/hand/icecreamlemon.png', alt: 'icecreamlemon', title: 'icecreamlemon', description: '', rarity: 0.8 },
      { src: '/images/hand/Brushblue.png', alt: 'Brushblue', title: 'Brushblue', description: '', rarity: 0.8 },
      { src: '/images/hand/lolipopblue.png', alt: 'lolipopblue', title: 'lolipopblue', description: '', rarity: 0.8 },
      { src: '/images/hand/icecreamvanilla.png', alt: 'icecreamvanilla', title: 'icecreamvanilla', description: '', rarity: 0.8 },
      { src: '/images/hand/cocktailred.png', alt: 'cocktailred', title: 'cocktailred', description: '', rarity: 0.8 },
      { src: '/images/hand/drumstick.png', alt: 'drumstick', title: 'drumstick', description: '', rarity: 0.8 },
      { src: '/images/hand/pizza.png', alt: 'pizza', title: 'pizza', description: '', rarity: 0.8 },
      { src: '/images/hand/donut 2.png', alt: 'donut 2', title: 'donut 2', description: '', rarity: 0.8 },
      { src: '/images/hand/donut 5.png', alt: 'donut 5', title: 'donut 5', description: '', rarity: 0.8 },
      { src: '/images/hand/toothbrush.png', alt: 'toothbrush', title: 'toothbrush', description: '', rarity: 1.2 },
      { src: '/images/hand/donut 3.png', alt: 'donut 3', title: 'donut 3', description: '', rarity: 1.2 },
      { src: '/images/hand/lolipoporange.png', alt: 'lolipoporange', title: 'lolipoporange', description: '', rarity: 1.2 },
      { src: '/images/hand/bindlestick.png', alt: 'bindlestick', title: 'bindlestick', description: '', rarity: 1.2 },
      { src: '/images/hand/rosewhite.png', alt: 'rosewhite', title: 'rosewhite', description: '', rarity: 1.2 },
      { src: '/images/hand/book.png', alt: 'book', title: 'book', description: '', rarity: 1.2 },
      { src: '/images/hand/Brushyellow.png', alt: 'Brushyellow', title: 'Brushyellow', description: '', rarity: 1.6 },
      { src: '/images/hand/kaspa.png', alt: 'kaspa', title: 'kaspa', description: '', rarity: 1.6 },
      { src: '/images/hand/mustard.png', alt: 'mustard', title: 'mustard', description: '', rarity: 1.6 },
      { src: '/images/hand/Cookie.png', alt: 'Cookie', title: 'Cookie', description: '', rarity: 1.6 },
      { src: '/images/hand/maracas.png', alt: 'maracas', title: 'maracas', description: '', rarity: 1.6 },
      { src: '/images/hand/knife.png', alt: 'knife', title: 'knife', description: '', rarity: 1.6 },
      { src: '/images/hand/markerblue.png', alt: 'markerblue', title: 'markerblue', description: '', rarity: 1.6 },
      { src: '/images/hand/chocolate.png', alt: 'chocolate', title: 'chocolate', description: '', rarity: 2.0 },
      { src: '/images/hand/fork.png', alt: 'fork', title: 'fork', description: '', rarity: 2.0 },
      { src: '/images/hand/donut 4.png', alt: 'donut 4', title: 'donut 4', description: '', rarity: 2.0 },
      { src: '/images/hand/wine.png', alt: 'wine', title: 'wine', description: '', rarity: 2.0 },
      { src: '/images/hand/Brushred.png', alt: 'Brushred', title: 'Brushred', description: '', rarity: 2.0 },
      { src: '/images/hand/teddybear.png', alt: 'teddybear', title: 'teddybear', description: '', rarity: 2.0 },
      { src: '/images/hand/balloonpink.png', alt: 'balloonpink', title: 'balloonpink', description: '', rarity: 2.0 },
      { src: '/images/hand/rosered.png', alt: 'rosered', title: 'rosered', description: '', rarity: 2.4 },
      { src: '/images/hand/microphone.png', alt: 'microphone', title: 'microphone', description: '', rarity: 2.4 },
      { src: '/images/hand/spoon.png', alt: 'spoon', title: 'spoon', description: '', rarity: 2.4 },
      { src: '/images/hand/paintbrush.png', alt: 'paintbrush', title: 'paintbrush', description: '', rarity: 2.4 },
      { src: '/images/hand/lolipopgreen.png', alt: 'lolipopgreen', title: 'lolipopgreen', description: '', rarity: 2.8 },
      { src: '/images/hand/sodacanred.png', alt: 'sodacanred', title: 'sodacanred', description: '', rarity: 2.8 },
      { src: '/images/hand/cocktailgreen.png', alt: 'cocktailgreen', title: 'cocktailgreen', description: '', rarity: 2.8 },
      { src: '/images/hand/ax.png', alt: 'ax', title: 'ax', description: '', rarity: 2.8 },
      { src: '/images/hand/sodacanblue.png', alt: 'sodacanblue', title: 'sodacanblue', description: '', rarity: 2.8 },
      { src: '/images/hand/icecreamchoco.png', alt: 'icecreamchoco', title: 'icecreamchoco', description: '', rarity: 3.2 },
      { src: '/images/hand/none.png', alt: 'none', title: 'none', description: '', rarity: 3.2 },
      { src: '/images/hand/ketchup.png', alt: 'ketchup', title: 'ketchup', description: '', rarity: 3.2 },
      { src: '/images/hand/lolipoppurple.png', alt: 'lolipoppurple', title: 'lolipoppurple', description: '', rarity: 3.6 },
      { src: '/images/hand/markerred.png', alt: 'markerred', title: 'markerred', description: '', rarity: 3.6 },
      { src: '/images/hand/balloonblue.png', alt: 'balloonblue', title: 'balloonblue', description: '', rarity: 3.6 },
      { src: '/images/hand/markergreen.png', alt: 'markergreen', title: 'markergreen', description: '', rarity: 3.6 },
      { src: '/images/hand/cocktailblue.png', alt: 'cocktailblue', title: 'cocktailblue', description: '', rarity: 3.6 },
      { src: '/images/hand/icecreammint.png', alt: 'icecreammint', title: 'icecreammint', description: '', rarity: 4.0 },
    ],
  },

  {
    category: 'Clothing',
    icon: LuShirt,
    images: [
      { src: '/images/clothing/greensweater5-redscarf.png', alt: 'greensweater5-redscarf', title: 'greensweater5-redscarf', description: '', rarity: 0.4 },
      { src: '/images/clothing/flowertanktop2.png', alt: 'flowertanktop2', title: 'flowertanktop2', description: '', rarity: 0.4 },
      { src: '/images/clothing/kimono.png', alt: 'kimono', title: 'kimono', description: '', rarity: 0.4 },
      { src: '/images/clothing/wings.png', alt: 'wings', title: 'wings', description: '', rarity: 0.4 },
      { src: '/images/clothing/astronautsuit.png', alt: 'astronautsuit', title: 'astronautsuit', description: '', rarity: 0.4 },
      { src: '/images/clothing/blacktshirt5-stonks.png', alt: 'blacktshirt5-stonks', title: 'blacktshirt5-stonks', description: '', rarity: 0.4 },
      { src: '/images/clothing/blacksuitredtie.png', alt: 'blacksuitredtie', title: 'blacksuitredtie', description: '', rarity: 0.4 },
      { src: '/images/clothing/clown.png', alt: 'clown', title: 'clown', description: '', rarity: 0.4 },
      { src: '/images/clothing/blacktshirt5.png', alt: 'blacktshirt5', title: 'blacktshirt5', description: '', rarity: 1.2 },
      { src: '/images/clothing/brownsuit.png', alt: 'brownsuit', title: 'brownsuit', description: '', rarity: 2.0 },
      { src: '/images/clothing/yellowsweater5.png', alt: 'yellowsweater5', title: 'yellowsweater5', description: '', rarity: 2.0 },
      { src: '/images/clothing/redtiedietanktop.png', alt: 'redtiedietanktop', title: 'redtiedietanktop', description: '', rarity: 2.4 },
      { src: '/images/clothing/bluesweater2.png', alt: 'bluesweater2', title: 'bluesweater2', description: '', rarity: 2.8 },
      { src: '/images/clothing/blueoverallgreyshirt5.png', alt: 'blueoverallgreyshirt5', title: 'blueoverallgreyshirt5', description: '', rarity: 2.8 },
      { src: '/images/clothing/yellowshirtpinktie5.png', alt: 'yellowshirtpinktie5', title: 'yellowshirtpinktie5', description: '', rarity: 2.8 },
      { src: '/images/clothing/blueoverallwhiteshirt5.png', alt: 'blueoverallwhiteshirt5', title: 'blueoverallwhiteshirt5', description: '', rarity: 2.8 },
      { src: '/images/clothing/redtanktop5.png', alt: 'redtanktop5', title: 'redtanktop5', description: '', rarity: 3.2 },
      { src: '/images/clothing/none.png', alt: 'none', title: 'none', description: '', rarity: 3.2 },
      { src: '/images/clothing/blueshirt1yellowtie.png', alt: 'blueshirt1yellowtie', title: 'blueshirt1yellowtie', description: '', rarity: 3.2 },
      { src: '/images/clothing/blueshirt2yellowtie.png', alt: 'blueshirt2yellowtie', title: 'blueshirt2yellowtie', description: '', rarity: 3.6 },
      { src: '/images/clothing/lightbrownsuit5.png', alt: 'lightbrownsuit5', title: 'lightbrownsuit5', description: '', rarity: 3.6 },
      { src: '/images/clothing/redsquarestanktop.png', alt: 'redsquarestanktop', title: 'redsquarestanktop', description: '', rarity: 3.6 },
      { src: '/images/clothing/greensquarestanktop.png', alt: 'greensquarestanktop', title: 'greensquarestanktop', description: '', rarity: 3.6 },
      { src: '/images/clothing/blacksuit5.png', alt: 'blacksuit5', title: 'blacksuit5', description: '', rarity: 4.0 },
      { src: '/images/clothing/greenshirtredtie5.png', alt: 'greenshirtredtie5', title: 'greenshirtredtie5', description: '', rarity: 4.0 },
      { src: '/images/clothing/darkblueoverallwhiteshirt5.png', alt: 'darkblueoverallwhiteshirt5', title: 'darkblueoverallwhiteshirt5', description: '', rarity: 4.0 },
      { src: '/images/clothing/blacksweater5.png', alt: 'blacksweater5', title: 'blacksweater5', description: '', rarity: 4.0 },
      { src: '/images/clothing/greyoverallwhiteshirt5.png', alt: 'greyoverallwhiteshirt5', title: 'greyoverallwhiteshirt5', description: '', rarity: 4.4 },
      { src: '/images/clothing/greenshirt2greentie.png', alt: 'greenshirt2greentie', title: 'greenshirt2greentie', description: '', rarity: 4.8 },
      { src: '/images/clothing/burgundysweater.png', alt: 'burgundysweater', title: 'burgundysweater', description: '', rarity: 4.8 },
      { src: '/images/clothing/redshirtredtie.png', alt: 'redshirtredtie', title: 'redshirtredtie', description: '', rarity: 5.6 },
      { src: '/images/clothing/blueshirt2redtie5.png', alt: 'blueshirt2redtie5', title: 'blueshirt2redtie5', description: '', rarity: 5.6 },
      { src: '/images/clothing/whitetanktop5.png', alt: 'whitetanktop5', title: 'whitetanktop5', description: '', rarity: 6.4 },
      { src: '/images/clothing/pinkflowertanktop.png', alt: 'pinkflowertanktop', title: 'pinkflowertanktop', description: '', rarity: 6.4 },
    ],
  },
 
 
 
 
];
const sortedWizardCategories: WizardCategory[] = wizardCategories.map((cat) => ({
  ...cat,
  images: [...cat.images].sort((a, b) => a.rarity - b.rarity),
}));