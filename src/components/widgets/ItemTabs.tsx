import { $, component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';

const LuUser = $(() => import('@qwikest/icons/lucide').then((m) => m.LuUser));
const LuShirt = $(() => import('@qwikest/icons/lucide').then((m) => m.LuShirt));
const LuEye = $(() => import('@qwikest/icons/lucide').then((m) => m.LuEye));
const LuSparkles = $(() => import('@qwikest/icons/lucide').then((m) => m.LuSparkles));
const LuHand = $(() => import('@qwikest/icons/lucide').then((m) => m.LuHand));


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
    icon: LuUser,
    images: [
      { src: '/images/Oneof1/1.png', alt: 'SompoBear', title: 'Pure Gold', description: 'A unique SompoBear design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/2.jpeg', alt: 'SompoBull', title: 'Ying', description: 'A unique SompoBull design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/3.jpeg', alt: 'SuttonBear', title: 'Yang', description: 'A unique SuttonBear design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/4.jpeg', alt: 'SuttonBull', title: 'Diamond Paws', description: 'A unique SuttonBull design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/5.jpeg', alt: 'ShaiBear', title: 'Clown Mice', description: 'A unique ShaiBear design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/6.jpeg', alt: 'ShaiBull', title: 'Silent Night', description: 'A unique ShaiBull design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/7.jpeg', alt: 'DiamondBear', title: 'Florida Man', description: 'A unique DiamondBear design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/8.jpeg', alt: 'DiamondBull', title: 'Degen Kritter', description: 'A unique DiamondBull design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/9.jpeg', alt: 'KritterKingBear', title: 'Neo Mice', description: 'A unique KritterKingBear design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/10.jpeg', alt: 'KritterKingBull', title: 'Sensei Kritter', description: 'A unique KritterKingBull design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/11.jpeg', alt: 'BearBot', title: 'Blessings', description: 'A unique BearBot design.', rarity: 0.5 }, // No exact match, keeping original rarity
      { src: '/images/Oneof1/12.jpeg', alt: 'BullBot', title: 'Apollo13 Kritter', description: 'A unique BullBot design.', rarity: 0.5 }, // No exact match, keeping original rarity
    ],
  },
  {
    category: 'Body',
    icon: LuUser,
    images: [
      { src: '/images/body/blue.png', alt: 'Slim Body', title: 'Blue Body', description: 'A slender wizard physique.', rarity: 11.20 }, // Matches 'blue' (11.20%)
      { src: '/images/body/brown.png', alt: 'Slim Body', title: 'Brown Body', description: 'A slender wizard physique.', rarity: 2.80 }, // Matches 'brown' (2.80%)
      { src: '/images/body/caramel.png', alt: 'Slim Body', title: 'Caramel Body', description: 'A slender wizard physique.', rarity: 13.60 }, // Matches 'caramel' (13.60%)
      { src: '/images/body/chocolate.png', alt: 'Slim Body', title: 'Chocolate Body', description: 'A slender wizard physique.', rarity: 8.80 }, // Matches 'chocolate' (8.80%)
      { src: '/images/body/darkgrey.png', alt: 'Dark Grey Body', title: 'Brown Body', description: 'A slender wizard physique.', rarity: 4.00 }, // Matches 'darkgrey' (4.00%)
      { src: '/images/body/mint.png', alt: 'Slim Body', title: 'Mint Body', description: 'A slender wizard physique.', rarity: 8.40 }, // Matches 'mint' (8.40%)
      { src: '/images/body/orange.png', alt: 'Slim Body', title: 'Orange Body', description: 'A slender wizard physique.', rarity: 7.60 }, // Matches 'orange' (7.60%)
      { src: '/images/body/pink.png', alt: 'Slim Body', title: 'Pink Body', description: 'A slender wizard physique.', rarity: 14.00 }, // Matches 'pink' (14.00%)
      { src: '/images/body/plain2.png', alt: 'Slim Body', title: 'Plain 2 Body', description: 'A slender wizard physique.', rarity: 11.60 }, // Matches 'plain2' (11.60%)
      { src: '/images/body/red.png', alt: 'Slim Body', title: 'Red Body', description: 'A slender wizard physique.', rarity: 6.00 }, // Matches 'red' (6.00%)
      { src: '/images/body/yellow.png', alt: 'Slim Body', title: 'Yellow Body', description: 'A slender wizard physique.', rarity: 10.80 }, // Matches 'yellow' (10.80%)
    ],
  },
  {
    category: 'Backgrounds',
    icon: LuSparkles,
    images: [
      { src: '/images/background/blue.png', alt: 'Blue Background', title: 'Blue Background', description: 'A serene blue backdrop.', rarity: 3.20 }, // Matches 'blue' (3.20%)
      { src: '/images/background/green.png', alt: 'Green Background', title: 'Green Background', description: 'A vibrant green scene.', rarity: 4.00 }, // Matches 'green' (4.00%)
      { src: '/images/background/green2.png', alt: 'Green 2 Background', title: 'Green 2 Background', description: 'Another green variant.', rarity: 2.00 }, // Matches 'green2' (2.00%)
      { src: '/images/background/grey.png', alt: 'Grey Background', title: 'Grey Background', description: 'A neutral grey backdrop.', rarity: 4.40 }, // Matches 'grey' (4.40%)
      { src: '/images/background/kaspa1.png', alt: 'Kaspa 1 Background', title: 'Kaspa 1 Background', description: 'A Kaspa-themed background.', rarity: 60.00 }, // Matches 'kaspa1' (60.00%)
      { src: '/images/background/kaspa2.png', alt: 'Kaspa 2 Background', title: 'Kaspa 2 Background', description: 'Another Kaspa-themed variant.', rarity: 2.80 }, // Matches 'kaspa2' (2.80%)
      { src: '/images/background/orange.png', alt: 'Orange Background', title: 'Orange Background', description: 'A warm orange scene.', rarity: 2.80 }, // Matches 'orange' (2.80%)
      { src: '/images/background/pink.png', alt: 'Pink Background', title: 'Pink Background', description: 'A soft pink backdrop.', rarity: 4.80 }, // Matches 'pink' (4.80%)
      { src: '/images/background/purple.png', alt: 'Purple Background', title: 'Purple Background', description: 'A mystical purple scene.', rarity: 1.60 }, // Matches 'purple' (1.60%)
      { src: '/images/background/purple2.png', alt: 'Purple 2 Background', title: 'Purple 2 Background', description: 'Another purple variant.', rarity: 1.60 }, // Matches 'purple2' (1.60%)
      { src: '/images/background/red.png', alt: 'Red Background', title: 'Red Background', description: 'A bold red backdrop.', rarity: 1.60 }, // Matches 'red' (1.60%)
      { src: '/images/background/yellow.png', alt: 'Yellow Background', title: 'Yellow Background', description: 'A bright yellow scene.', rarity: 3.20 }, // Matches 'yellow' (3.20%)
      { src: '/images/background/yellow2.png', alt: 'Yellow 2 Background', title: 'Yellow 2 Background', description: 'Another yellow variant.', rarity: 1.60 }, // Matches 'yellow2' (1.60%)
    ],
  },
  {
    category: 'Head',
    icon: LuEye,
    images: [
      { src: '/images/hat/baseballcap5.png', alt: 'Baseball Cap', title: 'Baseball Cap', description: 'A sporty baseball cap.', rarity: 4.40 }, // Matches 'baseballcap5' (4.40%)
      { src: '/images/hat/beaniebrown5.png', alt: 'Brown Beanie', title: 'Brown Beanie', description: 'A warm brown beanie.', rarity: 5.20 }, // Matches 'beaniebrown5' (5.20%)
      { src: '/images/hat/beaniegreen5.png', alt: 'Green Beanie', title: 'Green Beanie', description: 'A cozy green beanie.', rarity: 2.80 }, // Matches 'beaniegreen5' (2.80%)
      { src: '/images/hat/blackhair5.png', alt: 'Black Hair', title: 'Black Hair', description: 'Flowing black hair.', rarity: 6.80 }, // Matches 'blackhair5' (6.80%)
      { src: '/images/hat/blackhat5.png', alt: 'Black Hat', title: 'Black Hat', description: 'A classic black hat.', rarity: 2.00 }, // Matches 'blackhat5' (2.00%)
      { src: '/images/hat/brownhair5.png', alt: 'Brown Hair', title: 'Brown Hair', description: 'Natural brown hair.', rarity: 2.40 }, // Matches 'brownhair5' (2.40%)
      { src: '/images/hat/capblue5.png', alt: 'Blue Cap', title: 'Blue Cap', description: 'A casual blue cap.', rarity: 4.40 }, // Matches 'capblue5' (4.40%)
      { src: '/images/hat/capgreen5.png', alt: 'Green Cap', title: 'Green Cap', description: 'A casual green cap.', rarity: 6.80 }, // Matches 'capgreen5' (6.80%)
      { src: '/images/hat/capred5.png', alt: 'Red Cap', title: 'Red Cap', description: 'A casual red cap.', rarity: 3.20 }, // Matches 'capred5' (3.20%)
      { src: '/images/hat/chefhat.png', alt: 'Chef Hat', title: 'Chef Hat', description: 'A culinary-inspired wizard hat.', rarity: 1.60 }, // Matches 'chefhat' (1.60%)
      { src: '/images/hat/constructionhelmet.png', alt: 'Construction Helmet', title: 'Construction Helmet', description: 'A sturdy helmet for safety.', rarity: 3.20 }, // Matches 'constructionhelmet' (3.20%)
      { src: '/images/hat/hat.png', alt: 'Hat', title: 'Classic Hat', description: 'A wizard\'s classic pointed hat.', rarity: 2.40 }, // Matches 'hat' (2.40%)
      { src: '/images/hat/manhat5.png', alt: 'Man Hat', title: 'Man Hat', description: 'A stylish hat for men.', rarity: 4.80 }, // Matches 'manhat5' (4.80%)
      { src: '/images/hat/navyhat.png', alt: 'Navy Hat', title: 'Navy Hat', description: 'A deep blue navy cap.', rarity: 2.40 }, // Matches 'navyhat' (2.40%)
      { src: '/images/hat/partyhatblue5.png', alt: 'Party Hat Blue', title: 'Blue Party Hat', description: 'A festive blue party hat.', rarity: 6.80 }, // Matches 'partyhatblue5' (6.80%)
      { src: '/images/hat/partyhatpink5.png', alt: 'Party Hat Pink', title: 'Pink Party Hat', description: 'A festive pink party hat.', rarity: 5.20 }, // Matches 'partyhatpink5' (5.20%)
      { src: '/images/hat/showercap.png', alt: 'Shower Cap', title: 'Shower Cap', description: 'A quirky shower cap.', rarity: 2.00 }, // Matches 'showercap' (2.00%)
      { src: '/images/hat/strawhat5.png', alt: 'Straw Hat', title: 'Straw Hat', description: 'A breezy straw hat for sunny days.', rarity: 4.40 }, // Matches 'strawhat5' (4.40%)
      { src: '/images/hat/sunvisorblue5.png', alt: 'Blue Sunvisor', title: 'Blue Sunvisor', description: 'A blue sunvisor for shade.', rarity: 5.60 }, // Matches 'sunvisorblue5' (5.60%)
      { src: '/images/hat/sunvisorred5.png', alt: 'Red Sunvisor', title: 'Red Sunvisor', description: 'A red sunvisor for sunny days.', rarity: 2.40 }, // Matches 'sunvisorred5' (2.40%)
      { src: '/images/hat/tinfoilhat.png', alt: 'Tinfoil Hat', title: 'Tinfoil Hat', description: 'Protect your thoughts with this shiny headwear.', rarity: 6.00 }, // Matches 'tinfoilhat' (6.00%)
    ],
  },
  {
    category: 'Eyes',
    icon: LuEye,
    images: [
      { src: '/images/eyes/aviatornoglass5.png', alt: 'Aviator No Glass', title: 'Aviator No Glass', description: 'Aviator-style eyes without glass.', rarity: 6.80 }, // Matches 'aviatornoglass5' (6.80%)
      { src: '/images/eyes/blackaviator5.png', alt: 'Black Aviator', title: 'Black Aviator', description: 'Black aviator-style eyes.', rarity: 2.40 }, // Matches 'blackaviator5' (2.40%)
      { src: '/images/eyes/blackbrownstarglasses.png', alt: 'Black Brown Star Glasses', title: 'Black Brown Star Glasses', description: 'Black glasses with brown star accents.', rarity: 7.20 }, // Matches 'blackbrownstarglasses' (7.20%)
      { src: '/images/eyes/blacksunglasses.png', alt: 'Black Sunglasses', title: 'Black Sunglasses', description: 'Classic black sunglasses.', rarity: 2.80 }, // Matches 'blacksunglasses' (2.80%)
      { src: '/images/eyes/blueaviator5.png', alt: 'Blue Aviator', title: 'Blue Aviator', description: 'Blue-tinted aviator eyes.', rarity: 6.80 }, // Matches 'blueaviator5' (6.80%)
      { src: '/images/eyes/clearaviator5.png', alt: 'Clear Aviator', title: 'Clear Aviator', description: 'Clear aviator-style eyes.', rarity: 8.40 }, // Matches 'clearaviator5' (8.40%)
      { src: '/images/eyes/doubtbrows.png', alt: 'Doubt Brows', title: 'Doubt Brows', description: 'Eyes with skeptical brow expression.', rarity: 6.00 }, // Matches 'doubtbrows' (6.00%)
      { src: '/images/eyes/eyebags.png', alt: 'Eyebags', title: 'Eyebags', description: 'Eyes with noticeable bags.', rarity: 2.80 }, // Matches 'eyebags' (2.80%)
      { src: '/images/eyes/goldaviator5.png', alt: 'Gold Aviator', title: 'Gold Aviator', description: 'Gold-tinted aviator eyes.', rarity: 1.60 }, // Matches 'goldaviator5' (1.60%)
      { src: '/images/eyes/goldpinkstarglasses.png', alt: 'Gold Pink Star Glasses', title: 'Gold Pink Star Glasses', description: 'Gold glasses with pink star accents.', rarity: 5.20 }, // Matches 'goldpinkstarglasses' (5.20%)
      { src: '/images/eyes/lasereyes5.png', alt: 'Laser Eyes', title: 'Laser Eyes', description: 'Eyes emitting laser beams.', rarity: 1.60 }, // Matches 'lasereyes5' (1.60%)
      { src: '/images/eyes/madbrows.png', alt: 'Mad Brows', title: 'Mad Brows', description: 'Eyes with angry brow expression.', rarity: 6.00 }, // Matches 'madbrows' (6.00%)
      { src: '/images/eyes/monocle.png', alt: 'Monocle', title: 'Monocle', description: 'Eyes with a single monocle.', rarity: 4.40 }, // Matches 'monocle' (4.40%)
      { src: '/images/eyes/none.png', alt: 'No Eyes', title: 'No Eyes', description: 'No visible eyes.', rarity: 12.40 }, // Matches 'none' (12.40%)
      { src: '/images/eyes/pinkaviator5.png', alt: 'Pink Aviator', title: 'Pink Aviator', description: 'Pink-tinted aviator eyes.', rarity: 3.60 }, // Matches 'pinkaviator5' (3.60%)
      { src: '/images/eyes/pinkhearts.png', alt: 'Pink Hearts', title: 'Pink Hearts', description: 'Eyes with pink heart shapes.', rarity: 4.40 }, // Matches 'pinkhearts' (4.40%)
      { src: '/images/eyes/reading5.png', alt: 'Reading Glasses', title: 'Reading Glasses', description: 'Eyes with reading glasses.', rarity: 2.80 }, // Matches 'reading5' (2.80%)
      { src: '/images/eyes/rectangles5.png', alt: 'Rectangles', title: 'Rectangles', description: 'Eyes with rectangular frames.', rarity: 7.60 }, // Matches 'rectangles5' (7.60%)
      { src: '/images/eyes/sadbrows.png', alt: 'Sad Brows', title: 'Sad Brows', description: 'Eyes with sad brow expression.', rarity: 3.20 }, // Matches 'sadbrows' (3.20%)
      { src: '/images/eyes/sunsetaviator5.png', alt: 'Sunset Aviator', title: 'Sunset Aviator', description: 'Aviator eyes with sunset hues.', rarity: 2.40 }, // Matches 'sunsetaviator5' (2.40%)
    ],
  },
     {
    category: 'Mouth',
    icon: LuUser,
    images: [
      { src: '/images/mouth/zipper.png', alt: 'zipper', title: 'zipper', description: '', rarity: 1.6 },
      { src: '/images/mouth/censured.png', alt: 'censured', title: 'censured', description: '', rarity: 2.8 },
      { src: '/images/mouth/bubblegum.png', alt: 'bubblegum', title: 'bubblegum', description: '', rarity: 4.0 },
    ],
  },
  {
    category: 'Hand',
    icon: LuHand,
    images: [
      { src: '/images/items/hand/ax.png', alt: 'Ax', title: 'Ax Hand', description: 'A hand holding an ax.', rarity: 2.80 }, // Matches 'ax' (2.80%)
      { src: '/images/items/hand/balloonblue.png', alt: 'Blue Balloon', title: 'Blue Balloon Hand', description: 'A hand holding a blue balloon.', rarity: 3.60 }, // Matches 'balloonblue' (3.60%)
      { src: '/images/items/hand/balloongold.png', alt: 'Gold Balloon', title: 'Gold Balloon Hand', description: 'A hand holding a gold balloon.', rarity: 0.80 }, // Matches 'balloongold' (0.80%)
      { src: '/images/items/hand/balloonpink.png', alt: 'Pink Balloon', title: 'Pink Balloon Hand', description: 'A hand holding a pink balloon.', rarity: 2.00 }, // Matches 'balloonpink' (2.00%)
      { src: '/images/items/hand/bindlestick.png', alt: 'Bindlestick', title: 'Bindlestick Hand', description: 'A hand holding a bindlestick.', rarity: 1.20 }, // Matches 'bindlestick' (1.20%)
      { src: '/images/items/hand/book.png', alt: 'Book', title: 'Book Hand', description: 'A hand holding a book.', rarity: 1.20 }, // Matches 'book' (1.20%)
      { src: '/images/items/hand/Brushblue.png', alt: 'Blue Brush', title: 'Blue Brush Hand', description: 'A hand holding a blue brush.', rarity: 0.80 }, // Matches 'Brushblue' (0.80%)
      { src: '/images/items/hand/Brushred.png', alt: 'Red Brush', title: 'Red Brush Hand', description: 'A hand holding a red brush.', rarity: 2.00 }, // Matches 'Brushred' (2.00%)
      { src: '/images/items/hand/Brushyellow.png', alt: 'Yellow Brush', title: 'Yellow Brush Hand', description: 'A hand holding a yellow brush.', rarity: 1.60 }, // Matches 'Brushyellow' (1.60%)
      { src: '/images/items/hand/chocolate.png', alt: 'Chocolate', title: 'Chocolate Hand', description: 'A hand holding chocolate.', rarity: 2.00 }, // Matches 'chocolate' (2.00%)
      { src: '/images/items/hand/cocktailblue.png', alt: 'Blue Cocktail', title: 'Blue Cocktail Hand', description: 'A hand holding a blue cocktail.', rarity: 3.60 }, // Matches 'cocktailblue' (3.60%)
      { src: '/images/items/hand/cocktailgreen.png', alt: 'Green Cocktail', title: 'Green Cocktail Hand', description: 'A hand holding a green cocktail.', rarity: 2.80 }, // Matches 'cocktailgreen' (2.80%)
      { src: '/images/items/hand/cocktailred.png', alt: 'Red Cocktail', title: 'Red Cocktail Hand', description: 'A hand holding a red cocktail.', rarity: 0.80 }, // Matches 'cocktailred' (0.80%)
      { src: '/images/items/hand/Cookie.png', alt: 'Cookie', title: 'Cookie Hand', description: 'A hand holding a cookie.', rarity: 1.60 }, // Matches 'Cookie' (1.60%)
      { src: '/images/items/hand/donut2.png', alt: 'Donut 2', title: 'Donut 2 Hand', description: 'A hand holding a second donut variant.', rarity: 0.80 }, // Matches 'donut 2' (0.80%)
      { src: '/images/items/hand/donut3.png', alt: 'Donut 3', title: 'Donut 3 Hand', description: 'A hand holding a third donut variant.', rarity: 1.20 }, // Matches 'donut 3' (1.20%)
      { src: '/images/items/hand/donut4.png', alt: 'Donut 4', title: 'Donut 4 Hand', description: 'A hand holding a fourth donut variant.', rarity: 2.00 }, // Matches 'donut 4' (2.00%)
      { src: '/images/items/hand/donut5.png', alt: 'Donut 5', title: 'Donut 5 Hand', description: 'A hand holding a fifth donut variant.', rarity: 0.80 }, // Matches 'donut 5' (0.80%)
      { src: '/images/items/hand/drumstick.png', alt: 'Drumstick', title: 'Drumstick Hand', description: 'A hand holding a drumstick.', rarity: 0.80 }, // Matches 'drumstick' (0.80%)
      { src: '/images/items/hand/fork.png', alt: 'Fork', title: 'Fork Hand', description: 'A hand holding a fork.', rarity: 2.00 }, // Matches 'fork' (2.00%)
      { src: '/images/items/hand/Hammer.png', alt: 'Hammer', title: 'Hammer Hand', description: 'A hand holding a hammer.', rarity: 0.80 }, // Matches 'Hammer' (0.80%)
      { src: '/images/items/hand/icecreamchoco.png', alt: 'Chocolate Ice Cream', title: 'Chocolate Ice Cream Hand', description: 'A hand holding chocolate ice cream.', rarity: 3.20 }, // Matches 'icecreamchoco' (3.20%)
      { src: '/images/items/hand/icecreamlemon.png', alt: 'Lemon Ice Cream', title: 'Lemon Ice Cream Hand', description: 'A hand holding lemon ice cream.', rarity: 0.80 }, // Matches 'icecreamlemon' (0.80%)
      { src: '/images/items/hand/icecreammint.png', alt: 'Mint Ice Cream', title: 'Mint Ice Cream Hand', description: 'A hand holding mint ice cream.', rarity: 4.00 }, // Matches 'icecreammint' (4.00%)
      { src: '/images/items/hand/icecreamvanilla.png', alt: 'Vanilla Ice Cream', title: 'Vanilla Ice Cream Hand', description: 'A hand holding vanilla ice cream.', rarity: 0.80 }, // Matches 'icecreamvanilla' (0.80%)
      { src: '/images/items/hand/kaspa.png', alt: 'Kaspa', title: 'Kaspa Hand', description: 'A hand holding a Kaspa item.', rarity: 1.60 }, // Matches 'kaspa' (1.60%)
      { src: '/images/items/hand/ketchup.png', alt: 'Ketchup', title: 'Ketchup Hand', description: 'A hand holding a ketchup bottle.', rarity: 3.20 }, // Matches 'ketchup' (3.20%)
      { src: '/images/items/hand/knife.png', alt: 'Knife', title: 'Knife Hand', description: 'A hand holding a knife.', rarity: 1.60 }, // Matches 'knife' (1.60%)
      { src: '/images/items/hand/lolipopblue.png', alt: 'Blue Lollipop', title: 'Blue Lollipop Hand', description: 'A hand holding a blue lollipop.', rarity: 0.80 }, // Matches 'lolipopblue' (0.80%)
      { src: '/images/items/hand/lolipopgreen.png', alt: 'Green Lollipop', title: 'Green Lollipop Hand', description: 'A hand holding a green lollipop.', rarity: 2.80 }, // Matches 'lolipopgreen' (2.80%)
      { src: '/images/items/hand/lolipoporange.png', alt: 'Orange Lollipop', title: 'Orange Lollipop Hand', description: 'A hand holding an orange lollipop.', rarity: 1.20 }, // Matches 'lolipoporange' (1.20%)
      { src: '/images/items/hand/lolipoppurple.png', alt: 'Purple Lollipop', title: 'Purple Lollipop Hand', description: 'A hand holding a purple lollipop.', rarity: 3.60 }, // Matches 'lolipoppurple' (3.60%)
      { src: '/images/items/hand/maracas.png', alt: 'Maracas', title: 'Maracas Hand', description: 'A hand holding maracas.', rarity: 1.60 }, // Matches 'maracas' (1.60%)
      { src: '/images/items/hand/markergreen.png', alt: 'Green Marker', title: 'Green Marker Hand', description: 'A hand holding a green marker.', rarity: 3.60 }, // Matches 'markergreen' (3.60%)
      { src: '/images/items/hand/markerred.png', alt: 'Red Marker', title: 'Red Marker Hand', description: 'A hand holding a red marker.', rarity: 3.60 }, // Matches 'markerred' (3.60%)
      { src: '/images/items/hand/microphone.png', alt: 'Microphone', title: 'Microphone Hand', description: 'A hand holding a microphone.', rarity: 2.40 }, // Matches 'microphone' (2.40%)
      { src: '/images/items/hand/mustard.png', alt: 'Mustard', title: 'Mustard Hand', description: 'A hand holding a mustard bottle.', rarity: 1.60 }, // Matches 'mustard' (1.60%)
      { src: '/images/items/hand/paintbrush.png', alt: 'Paintbrush', title: 'Paintbrush Hand', description: 'A hand holding a paintbrush.', rarity: 2.40 }, // Matches 'paintbrush' (2.40%)
      { src: '/images/items/hand/pizza.png', alt: 'Pizza', title: 'Pizza Hand', description: 'A hand holding a pizza slice.', rarity: 0.80 }, // Matches 'pizza' (0.80%)
      { src: '/images/items/hand/powerplug.png', alt: 'Power Plug', title: 'Power Plug Hand', description: 'A hand holding a power plug.', rarity: 0.80 }, // Matches 'powerplug' (0.80%)
      { src: '/images/items/hand/rosered.png', alt: 'Red Rose', title: 'Red Rose Hand', description: 'A hand holding a red rose.', rarity: 2.40 }, // Matches 'rosered' (2.40%)
      { src: '/images/items/hand/rosewhite.png', alt: 'White Rose', title: 'White Rose Hand', description: 'A hand holding a white rose.', rarity: 1.20 }, // Matches 'rosewhite' (1.20%)
      { src: '/images/items/hand/sodacanblue.png', alt: 'Blue Soda Can', title: 'Blue Soda Can Hand', description: 'A hand holding a blue soda can.', rarity: 2.80 }, // Matches 'sodacanblue' (2.80%)
      { src: '/images/items/hand/sodacanred.png', alt: 'Red Soda Can', title: 'Red Soda Can Hand', description: 'A hand holding a red soda can.', rarity: 2.80 }, // Matches 'sodacanred' (2.80%)
      { src: '/images/items/hand/spoon.png', alt: 'Spoon', title: 'Spoon Hand', description: 'A hand holding a spoon.', rarity: 2.40 }, // Matches 'spoon' (2.40%)
      { src: '/images/items/hand/teddybear.png', alt: 'Teddy Bear', title: 'Teddy Bear Hand', description: 'A hand holding a teddy bear.', rarity: 2.00 }, // Matches 'teddybear' (2.00%)
      { src: '/images/items/hand/toothbrush.png', alt: 'Toothbrush', title: 'Toothbrush Hand', description: 'A hand holding a toothbrush.', rarity: 1.20 }, // Matches 'toothbrush' (1.20%)
      { src: '/images/items/hand/wine.png', alt: 'Wine', title: 'Wine Hand', description: 'A hand holding a wine glass.', rarity: 2.00 }, // Matches 'wine' (2.00%)
    ],
  },
  {
    category: 'Clothing',
    icon: LuShirt,
    images: [
      { src: '/images/clothing/blacksuit5.png', alt: 'Black Suit', title: 'Black Suit', description: 'A formal black suit.', rarity: 4.00 }, // Matches 'blacksuit5' (4.00%)
      { src: '/images/clothing/blacksweater5.png', alt: 'Black Sweater', title: 'Black Sweater', description: 'A cozy black sweater.', rarity: 4.00 }, // Matches 'blacksweater5' (4.00%)
      { src: '/images/clothing/blacktshirt5.png', alt: 'Black Shirt', title: 'Black Shirt', description: 'A simple black shirt.', rarity: 1.20 }, // Matches 'blacktshirt5' (1.20%)
      { src: '/images/clothing/blueoverallgreyshirt5.png', alt: 'Blue Overall Grey Shirt', title: 'Blue Overall with Grey Shirt', description: 'Workwear with a blue overall and grey shirt.', rarity: 2.80 }, // Matches 'blueoverallgreyshirt5' (2.80%)
      { src: '/images/clothing/blueoverallwhiteshirt5.png', alt: 'Blue Overall White Shirt', title: 'Blue Overall with White Shirt', description: 'Workwear with a blue overall and white shirt.', rarity: 2.80 }, // Matches 'blueoverallwhiteshirt5' (2.80%)
      { src: '/images/clothing/blueshirt1yellowtie.png', alt: 'Blue Shirt Yellow Tie', title: 'Blue Shirt with Yellow Tie', description: 'Smart outfit with a blue shirt and yellow tie.', rarity: 3.20 }, // Matches 'blueshirt1yellowtie' (3.20%)
      { src: '/images/clothing/blueshirt2redtie5.png', alt: 'Blue Shirt Red Tie', title: 'Blue Shirt with Red Tie', description: 'Smart outfit with a blue shirt and red tie.', rarity: 5.60 }, // Matches 'blueshirt2redtie5' (5.60%)
      { src: '/images/clothing/blueshirt2yellowtie.png', alt: 'Blue Shirt Yellow Tie 2', title: 'Alternate Blue Shirt with Yellow Tie', description: 'A different variation of the blue shirt and yellow tie.', rarity: 3.60 }, // Matches 'blueshirt2yellowtie' (3.60%)
      { src: '/images/clothing/bluesweater2.png', alt: 'Blue Sweater', title: 'Blue Sweater', description: 'A warm blue sweater.', rarity: 2.80 }, // Matches 'bluesweater2' (2.80%)
      { src: '/images/clothing/brownsuit.png', alt: 'Brown Suit', title: 'Brown Suit', description: 'A classic brown suit.', rarity: 2.00 }, // Matches 'brownsuit' (2.00%)
      { src: '/images/clothing/burgundysweater.png', alt: 'Burgundy Sweater', title: 'Burgundy Sweater', description: 'A stylish burgundy sweater.', rarity: 4.80 }, // Matches 'burgundysweater' (4.80%)
      { src: '/images/clothing/darkblueoverallwhiteshirt5.png', alt: 'Dark Blue Overall White Shirt', title: 'Dark Blue Overall with White Shirt', description: 'Dark blue overall paired with a white shirt.', rarity: 4.00 }, // Matches 'darkblueoverallwhiteshirt5' (4.00%)
      { src: '/images/clothing/greenshirt2greentie.png', alt: 'Green Shirt Green Tie', title: 'Green Shirt with Green Tie', description: 'A matching green outfit.', rarity: 4.80 }, // Matches 'greenshirt2greentie' (4.80%)
      { src: '/images/clothing/greenshirtredtie5.png', alt: 'Green Shirt Red Tie', title: 'Green Shirt with Red Tie', description: 'A festive green and red combo.', rarity: 4.00 }, // Matches 'greenshirtredtie5' (4.00%)
      { src: '/images/clothing/greensquarestanktop.png', alt: 'Green Squares Tank Top', title: 'Green Squares Tank Top', description: 'Tank top with green square pattern.', rarity: 3.60 }, // Matches 'greensquarestanktop' (3.60%)
      { src: '/images/clothing/greyoverallwhiteshirt5.png', alt: 'Grey Overall White Shirt', title: 'Grey Overall with White Shirt', description: 'Grey overall combined with a white shirt.', rarity: 4.40 }, // Matches 'greyoverallwhiteshirt5' (4.40%)
      { src: '/images/clothing/lightbrownsuit5.png', alt: 'Light Brown Suit', title: 'Light Brown Suit', description: 'A refined light brown suit.', rarity: 3.60 }, // Matches 'lightbrownsuit5' (3.60%)
      { src: '/images/clothing/pinkflowertanktop.png', alt: 'Pink Flower Tank Top', title: 'Pink Flower Tank Top', description: 'Floral-patterned pink tank top.', rarity: 6.40 }, // Matches 'pinkflowertanktop' (6.40%)
      { src: '/images/clothing/redsquarestanktop.png', alt: 'Red Squares Tank Top', title: 'Red Squares Tank Top', description: 'Tank top with red square pattern.', rarity: 3.60 }, // Matches 'redsquarestanktop' (3.60%)
      { src: '/images/clothing/redtanktop5.png', alt: 'Red Tank Top', title: 'Red Tank Top', description: 'A bold red tank top.', rarity: 3.20 }, // Matches 'redtanktop5' (3.20%)
      { src: '/images/clothing/redtiedietanktop.png', alt: 'Red Tie Dye Tank Top', title: 'Red Tie-Dye Tank Top', description: 'Red tie-dye tank for a unique style.', rarity: 2.40 }, // Matches 'redtiedietanktop' (2.40%)
      { src: '/images/clothing/whitetanktop5.png', alt: 'White Tank Top', title: 'White Tank Top', description: 'Classic white tank top.', rarity: 6.40 }, // Matches 'whitetanktop5' (6.40%)
      { src: '/images/clothing/yellowshirtpinktie5.png', alt: 'Yellow Shirt Pink Tie', title: 'Yellow Shirt with Pink Tie', description: 'Bright yellow shirt with a pink tie.', rarity: 2.80 }, // Matches 'yellowshirtpinktie5' (2.80%)
      { src: '/images/clothing/yellowsweater5.png', alt: 'Yellow Sweater', title: 'Yellow Sweater', description: 'A cheerful yellow sweater.', rarity: 2.00 }, // Matches 'yellowsweater5' (2.00%)
    ],
  },
];


const sortedWizardCategories: WizardCategory[] = wizardCategories.map((cat) => ({
  ...cat,
  images: [...cat.images].sort((a, b) => a.rarity - b.rarity),
}));