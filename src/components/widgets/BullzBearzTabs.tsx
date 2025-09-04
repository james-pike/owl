import { $, component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
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
  category: 'Body' | 'Head' | 'Clothing' | 'Eyes' | 'Mouth' | 'Brows' | 'Backgrounds' | 'Signature' | 'Oneof1';
  icon: any; // Temporary type, adjust based on actual icon type
  images: ImageItem[];
}


export const BullzBearzTabs = component$(() => {
  const activeTab = useSignal(0);
  const itemsPerPage = useSignal(16); // default to desktop
  const selectedImage = useSignal<ImageItem | null>(wizardCategories[0]?.images[0] || null);
  const currentPages = useSignal<number[]>(wizardCategories.map(() => 0));

  useTask$(({ track }) => {
    track(() => activeTab.value);
    const firstImg = wizardCategories[activeTab.value]?.images[0];
    if (firstImg) selectedImage.value = firstImg;
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

  // Type-safe category mapping
  const categoryToPath: Record<WizardCategory['category'], string> = {
    Body: '/images/body2/',
    Head: '/images/2/hat/',
    Clothing: '/images/2/clothing/',
    Eyes: '/images/2/eyes/',
    Mouth: '/images/2/mouth/',
    Backgrounds: '/images/2/background/',
    Brows: '/images/2/brows/',
    Signature: '/images/2/signature/',
    Oneof1: '/images/2/1of1/',
  };

  const getImagePath = (src: string, category: WizardCategory['category']) => {
    const basePath = categoryToPath[category];
    const fileName = src.split('/').pop() || '';
    if (!fileName) {
      console.error('Invalid src path:', src);
      return '';
    }
    return `${basePath}${fileName}`; // Fixed the template literal syntax
  };

  return (
    <div class="flex w-full max-w-4xl mx-auto shadow-xl space-x-0 sm:space-x-2">
      <div class="w-full m-0">
        <Tabs.Root class="w-full">
          <Tabs.List class="grid w-full grid-cols-4 shadow-md bg-white/70 rounded-md border-gray-300 z-20">
            {wizardCategories.map((wizard, index) => (
              <Tabs.Tab key={index} class="py-1" onClick$={() => (activeTab.value = index)}>
                {wizard.category}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {wizardCategories.map((wizard, index) => (
            <Tabs.Panel key={index}>
              <Card.Content class="p-0 !text-sm">
                <div class="flex flex-col sm:flex-row w-full m-0 gap-2 min-h-[28rem] md:min-h-[17rem]">
                  <div class="mx-auto sm:w-1/3 relative z-0">
                    <div class="p-2 shadow-xl rounded-lg flex flex-col bg-white/70 items-center justify-between w-full border-gray-300">
                      {selectedImage.value ? (
                        <div class="text-center flex flex-col items-center">
                          <div class="flex-1 flex items-center justify-center w-full">
                            <img
                              src={getImagePath(selectedImage.value.src, wizardCategories[activeTab.value].category)}
                              alt={selectedImage.value.alt}
                              class={`max-h-24 sm:max-h-48 object-contain mx-auto ease-in-out `}
                              onError$={(e) => console.error('Image load error:', e, selectedImage.value?.src)}
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

                  <div class="w-full flex-1 px-1.5 sm:px-0 mx-auto">
                    <div class="grid grid-cols-4 sm:grid-cols-7 gap-2 mx-auto">
                      {getPaginatedImages(wizard.images, index).map((img, imgIndex) => (
                      <button
  key={imgIndex}
  class={`p-1 flex items-center bg-white/70 shadow-md rounded-lg justify-center aspect-square transition-transform duration-150
    ${selectedImage.value?.src === img.src
      ? 'border-2 border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)] scale-105'
      : 'border border-transparent'
    }`}
  style={{ boxSizing: 'border-box' }}
  onClick$={() => (selectedImage.value = img)}
>
  <img
    src={getImagePath(img.src, wizard.category)}
    alt={img.alt}
    class="w-full h-full object-contain"
    onError$={(e) => console.error('Image load error:', e, img.src)}
  />
</button>

                      ))}
                    </div>

                    <div
                      class={`flex justify-end space-x-2 mt-2 mb-2 ${wizard.images.length <= itemsPerPage.value ? 'opacity-0' : ''
                        }`}
                    >
                      <button
                        class="px-2 py-1 text-sm bg-white/70 border rounded disabled:opacity-50"
                        onClick$={() => {
                          currentPages.value[index] = Math.max(0, currentPages.value[index] - 1);
                          currentPages.value = [...currentPages.value];
                        }}
                        disabled={currentPages.value[index] === 0 || wizard.images.length <= itemsPerPage.value}
                      >
                        ←
                      </button>
                      <button
                        class="px-2 py-1 text-sm border bg-white/70 rounded disabled:opacity-50"
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
    category: 'Body',
    icon: LuUser,
    images: [
      { src: '/images/body2/grizzly.png', alt: 'Grizzly Body', title: 'Grizzly Body', description: 'A robust grizzly bear physique.', rarity: 34.75 },
      { src: '/images/body2/brown.png', alt: 'Brown Body', title: 'Brown Body', description: 'A standard brown bear physique.', rarity: 34.5 },
      { src: '/images/body2/black.png', alt: 'Black Body', title: 'Black Body', description: 'A sleek black bear physique.', rarity: 9.4 },
      { src: '/images/body2/blackbear.png', alt: 'Blackbear Body', title: 'Blackbear Body', description: 'A distinctive black bear physique.', rarity: 9.0 },
      { src: '/images/body2/polar.png', alt: 'Polar Body', title: 'Polar Body', description: 'A white polar bear physique.', rarity: 2.9 },
      { src: '/images/body2/white.png', alt: 'White Body', title: 'White Body', description: 'A clean white physique.', rarity: 2.85 },
      { src: '/images/body2/pooh.png', alt: 'Pooh Body', title: 'Pooh Body', description: 'A Winnie the Pooh-inspired physique.', rarity: 2.5 },
      { src: '/images/body2/red.png', alt: 'Red Body', title: 'Red Body', description: 'A bold red physique.', rarity: 2.4 },
    ],
  },
  {
    category: 'Head',
    icon: LuEye,
    images: [
      { src: '/images/2/head/bandanakaspaone.png', alt: 'Kaspa Bandana One', title: 'Kaspa Bandana One', description: 'A Kaspa-themed bandana.', rarity: 5.75 },
      { src: '/images/2/head/bandanakaspa.png', alt: 'Kaspa Bandana', title: 'Kaspa Bandana', description: 'Another Kaspa-themed bandana.', rarity: 5.4 },
      { src: '/images/2/head/kaspacap.png', alt: 'Kaspa Cap', title: 'Kaspa Cap', description: 'A stylish Kaspa-branded cap.', rarity: 4.8 },
      { src: '/images/2/head/kaspabeanie.png', alt: 'Kaspa Beanie', title: 'Kaspa Beanie', description: 'A cozy Kaspa beanie.', rarity: 4.75 },
      { src: '/images/2/head/bandanablack.png', alt: 'Black Bandana', title: 'Black Bandana', description: 'A sleek black bandana.', rarity: 1.35 },
      { src: '/images/2/head/headphones.png', alt: 'Headphones', title: 'Headphones', description: 'Modern headphones for a cool vibe.', rarity: 1.15 },
      { src: '/images/2/head/strawhat.png', alt: 'Straw Hat', title: 'Straw Hat', description: 'A breezy straw hat for sunny days.', rarity: 1.0 },
      { src: '/images/2/head/capblack.png', alt: 'Black Cap', title: 'Black Cap', description: 'A casual black cap.', rarity: 0.85 },
      { src: '/images/2/head/blackhat.png', alt: 'Black Hat', title: 'Black Hat', description: 'A classic black hat.', rarity: 0.75 },
    ],
  },

  {
    category: 'Clothing',
    icon: LuShirt,
    images: [
      { src: '/images/2/clothing/trilemma.png', alt: 'Trilemma Shirt', title: 'Trilemma Shirt', description: 'A shirt with a trilemma design.', rarity: 5.5 },
      { src: '/images/2/clothing/100bps.png', alt: '100bps Shirt', title: '100bps Shirt', description: 'A shirt featuring 100bps text.', rarity: 5.2 },
      { src: '/images/2/clothing/10bps.png', alt: '10bps Shirt', title: '10bps Shirt', description: 'A shirt featuring 10bps text.', rarity: 4.85 },
      { src: '/images/2/clothing/287b.png', alt: '287b Shirt', title: '287b Shirt', description: 'A shirt with 287b design.', rarity: 4.7 },
      { src: '/images/2/clothing/pow.png', alt: 'POW Shirt', title: 'POW Shirt', description: 'A shirt with POW text.', rarity: 4.65 },
      { src: '/images/2/clothing/polo.png', alt: 'Polo Shirt', title: 'Polo Shirt', description: 'A classic polo shirt.', rarity: 4.6 },
      { src: '/images/2/clothing/denimjacket.png', alt: 'Denim Jacket', title: 'Denim Jacket', description: 'A rugged denim jacket.', rarity: 4.6 },
      { src: '/images/2/clothing/leatherjacket.png', alt: 'Leather Jacket', title: 'Leather Jacket', description: 'A sleek leather jacket.', rarity: 4.6 },
      { src: '/images/2/clothing/jersey.png', alt: 'Jersey', title: 'Jersey', description: 'A sporty jersey.', rarity: 4.5 },
      { src: '/images/2/clothing/hoodie.png', alt: 'Hoodie', title: 'Hoodie', description: 'A cozy hoodie.', rarity: 4.45 },
      { src: '/images/2/clothing/blazer.png', alt: 'Blazer', title: 'Blazer', description: 'A sharp blazer.', rarity: 4.3 },
      { src: '/images/2/clothing/windbreaker.png', alt: 'Windbreaker', title: 'Windbreaker', description: 'A lightweight windbreaker.', rarity: 4.2 },
      { src: '/images/2/clothing/pufferjacket.png', alt: 'Puffer Jacket', title: 'Puffer Jacket', description: 'A warm puffer jacket.', rarity: 3.9 },
      { src: '/images/2/clothing/suit.png', alt: 'Suit', title: 'Suit', description: 'A formal suit.', rarity: 3.85 },
      { src: '/images/2/clothing/pajama.png', alt: 'Pajama', title: 'Pajama', description: 'Comfortable pajamas.', rarity: 3.8 },
      { src: '/images/2/clothing/varsityjacket.png', alt: 'Varsity Jacket', title: 'Varsity Jacket', description: 'A sporty varsity jacket.', rarity: 3.8 },
      { src: '/images/2/clothing/tanktop.png', alt: 'Tank Top', title: 'Tank Top', description: 'A casual tank top.', rarity: 3.7 },
      { src: '/images/2/clothing/bomberjacket.png', alt: 'Bomber Jacket', title: 'Bomber Jacket', description: 'A stylish bomber jacket.', rarity: 3.65 },
      { src: '/images/2/clothing/tuxedo.png', alt: 'Tuxedo', title: 'Tuxedo', description: 'A classy tuxedo.', rarity: 3.55 },
      { src: '/images/2/clothing/whitepolo.png', alt: 'White Polo', title: 'White Polo', description: 'A crisp white polo shirt.', rarity: 3.5 },
      { src: '/images/2/clothing/shirt.png', alt: 'Shirt', title: 'Shirt', description: 'A standard shirt.', rarity: 3.45 },
      { src: '/images/2/clothing/croptop.png', alt: 'Crop Top', title: 'Crop Top', description: 'A trendy crop top.', rarity: 3.45 },
      { src: '/images/2/clothing/endgame.png', alt: 'Endgame Shirt', title: 'Endgame Shirt', description: 'A shirt with an endgame theme.', rarity: 2.1 },
      { src: '/images/2/clothing/kb.png', alt: 'KB Shirt', title: 'KB Shirt', description: 'A shirt with KB design.', rarity: 0.95 },
      { src: '/images/2/clothing/blockdag.png', alt: 'BlockDAG Shirt', title: 'BlockDAG Shirt', description: 'A shirt featuring BlockDAG.', rarity: 0.95 },
      { src: '/images/2/clothing/kdiamond.png', alt: 'K-Diamond Shirt', title: 'K-Diamond Shirt', description: 'A shirt with a K-diamond design.', rarity: 0.8 },
      { src: '/images/2/clothing/bot.png', alt: 'Bot Shirt', title: 'Bot Shirt', description: 'A shirt with a bot theme.', rarity: 0.7 },
    ],
  },
  {
    category: 'Eyes',
    icon: LuEye,
    images: [
      { src: '/images/2/eyes/closed.png', alt: 'Closed Eyes', title: 'Closed Eyes', description: 'Eyes gently closed.', rarity: 18.5 },
      { src: '/images/2/eyes/surprised.png', alt: 'Surprised Eyes', title: 'Surprised Eyes', description: 'Eyes wide with surprise.', rarity: 16.3 },
      { src: '/images/2/eyes/dizzy.png', alt: 'Dizzy Eyes', title: 'Dizzy Eyes', description: 'Eyes with a dizzy expression.', rarity: 16.05 },
      { src: '/images/2/eyes/normal.png', alt: 'Normal Eyes', title: 'Normal Eyes', description: 'Standard eye expression.', rarity: 15.4 },
      { src: '/images/2/eyes/kaspa.png', alt: 'Kaspa Eyes', title: 'Kaspa Eyes', description: 'Eyes with a Kaspa-themed design.', rarity: 6.8 },
      { src: '/images/2/eyes/sunglasses.png', alt: 'Sunglasses', title: 'Sunglasses', description: 'Cool sunglasses.', rarity: 6.2 },
      { src: '/images/2/eyes/reading.png', alt: 'Reading Glasses', title: 'Reading Glasses', description: 'Eyes with reading glasses.', rarity: 5.85 },
      { src: '/images/2/eyes/thuglife.png', alt: 'Thug Life Glasses', title: 'Thug Life Glasses', description: 'Bold thug life sunglasses.', rarity: 5.5 },
      { src: '/images/2/eyes/laserkaspatwo.png', alt: 'Laser Kaspa Two', title: 'Laser Kaspa Two', description: 'Eyes with Kaspa-themed laser beams.', rarity: 2.1 },
      { src: '/images/2/eyes/laserredtwo.png', alt: 'Laser Red Two', title: 'Laser Red Two', description: 'Eyes with red laser beams.', rarity: 2.0 },
      { src: '/images/2/eyes/laserkaspaone.png', alt: 'Laser Kaspa One', title: 'Laser Kaspa One', description: 'Eyes with another Kaspa-themed laser.', rarity: 2.0 },
      { src: '/images/2/eyes/laserredone.png', alt: 'Laser Red One', title: 'Laser Red One', description: 'Eyes with another red laser design.', rarity: 1.6 },
    ],
  },
  {
    category: 'Mouth',
    icon: LuUser,
    images: [
      { src: '/images/2/mouth/normal.png', alt: 'Normal Mouth', title: 'Normal Mouth', description: 'A standard mouth expression.', rarity: 24.25 },
      { src: '/images/2/mouth/tongue.png', alt: 'Tongue Mouth', title: 'Tongue Mouth', description: 'A playful tongue sticking out.', rarity: 22.35 },
      { src: '/images/2/mouth/upset.png', alt: 'Upset Mouth', title: 'Upset Mouth', description: 'An upset mouth expression.', rarity: 21.75 },
      { src: '/images/2/mouth/gum.png', alt: 'Gum Mouth', title: 'Gum Mouth', description: 'Chewing gum with a cool vibe.', rarity: 11.65 },
      { src: '/images/2/mouth/ooh.png', alt: 'Ooh Mouth', title: 'Ooh Mouth', description: 'An expressive ooh mouth.', rarity: 10.35 },
      { src: '/images/2/mouth/teeth.png', alt: 'Teeth Mouth', title: 'Teeth Mouth', description: 'A toothy grin.', rarity: 4.45 },
      { src: '/images/2/mouth/censored.png', alt: 'Censored Mouth', title: 'Censored Mouth', description: 'A censored mouth for mystery.', rarity: 3.5 },
    ],
  },
  {
    category: 'Backgrounds',
    icon: LuSparkles,
    images: [
      { src: '/images/2/background/kaspasolid.png', alt: 'Kaspa Solid Background', title: 'Kaspa Solid Background', description: 'A solid Kaspa-themed backdrop.', rarity: 13.1 },
      { src: '/images/2/background/grey.png', alt: 'Grey Background', title: 'Grey Background', description: 'A neutral grey backdrop.', rarity: 12.3 },
      { src: '/images/2/background/green.png', alt: 'Green Background', title: 'Green Background', description: 'A vibrant green scene.', rarity: 12.05 },
      { src: '/images/2/background/blue.png', alt: 'Blue Background', title: 'Blue Background', description: 'A serene blue backdrop.', rarity: 11.9 },
      { src: '/images/2/background/red.png', alt: 'Red Background', title: 'Red Background', description: 'A bold red backdrop.', rarity: 10.65 },
      { src: '/images/2/background/yellow.png', alt: 'Yellow Background', title: 'Yellow Background', description: 'A bright yellow scene.', rarity: 9.75 },
      { src: '/images/2/background/beach.png', alt: 'Beach Background', title: 'Beach Background', description: 'A sunny beach scene.', rarity: 6.15 },
      { src: '/images/2/background/desert.png', alt: 'Desert Background', title: 'Desert Background', description: 'A dry desert backdrop.', rarity: 5.7 },
      { src: '/images/2/background/oasis.png', alt: 'Oasis Background', title: 'Oasis Background', description: 'A lush oasis scene.', rarity: 5.6 },
      { src: '/images/2/background/park.png', alt: 'Park Background', title: 'Park Background', description: 'A peaceful park setting.', rarity: 5.25 },
      { src: '/images/2/background/kaspaone.png', alt: 'Kaspa One Background', title: 'Kaspa One Background', description: 'A Kaspa-themed background.', rarity: 2.2 },
      { src: '/images/2/background/kaspathree.png', alt: 'Kaspa Three Background', title: 'Kaspa Three Background', description: 'Another Kaspa-themed variant.', rarity: 2.05 },
      { src: '/images/2/background/kaspatwo.png', alt: 'Kaspa Two Background', title: 'Kaspa Two Background', description: 'A second Kaspa-themed variant.', rarity: 0.95 },
      { src: '/images/2/background/kaspafour.png', alt: 'Kaspa Four Background', title: 'Kaspa Four Background', description: 'A fourth Kaspa-themed variant.', rarity: 0.65 },
    ],
  },
  {
    category: 'Brows',
    icon: LuEye, // Using LuEye as a placeholder since no specific icon provided
    images: [
      { src: '/images/2/brows/sad.png', alt: 'Sad Brows', title: 'Sad Brows', description: 'Eyebrows with a sad expression.', rarity: 20.8 },
      { src: '/images/2/brows/suspicious.png', alt: 'Suspicious Brows', title: 'Suspicious Brows', description: 'Eyebrows with a suspicious look.', rarity: 20.55 },
      { src: '/images/2/brows/normal.png', alt: 'Normal Brows', title: 'Normal Brows', description: 'Standard eyebrow expression.', rarity: 19.75 },
      { src: '/images/2/brows/surprised.png', alt: 'Surprised Brows', title: 'Surprised Brows', description: 'Eyebrows raised in surprise.', rarity: 19.55 },
      { src: '/images/2/brows/mad.png', alt: 'Mad Brows', title: 'Mad Brows', description: 'Eyebrows with an angry expression.', rarity: 17.65 },
    ],
  },
  // {
  //   category: 'Signature',
  //   icon: LuUser, // Using LuUser as a placeholder since no specific icon provided
  //   images: [
  //     { src: '/images/2/signature/no.png', alt: 'No Signature', title: 'No Signature', description: 'No signature present.', rarity: 98.05 },
  //     { src: '/images/2/signature/yes.png', alt: 'Signature', title: 'Signature', description: 'A unique signature.', rarity: 0.25 },
  //   ],
  // },
  // {
  //   category: 'Oneof1',
  //   icon: LuUser, // Using LuUser as a placeholder since no specific icon provided
  //   images: [
  //     { src: '/images/2/1of1/SompoBear.png', alt: 'SompoBear', title: 'SompoBear', description: 'A unique SompoBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/SompoBull.png', alt: 'SompoBull', title: 'SompoBull', description: 'A unique SompoBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/SuttonBear.png', alt: 'SuttonBear', title: 'SuttonBear', description: 'A unique SuttonBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/SuttonBull.png', alt: 'SuttonBull', title: 'SuttonBull', description: 'A unique SuttonBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/ShaiBear.png', alt: 'ShaiBear', title: 'ShaiBear', description: 'A unique ShaiBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/ShaiBull.png', alt: 'ShaiBull', title: 'ShaiBull', description: 'A unique ShaiBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/DiamondBear.png', alt: 'DiamondBear', title: 'DiamondBear', description: 'A unique DiamondBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/DiamondBull.png', alt: 'DiamondBull', title: 'DiamondBull', description: 'A unique DiamondBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/KritterKingBear.png', alt: 'KritterKingBear', title: 'KritterKingBear', description: 'A unique KritterKingBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/KritterKingBull.png', alt: 'KritterKingBull', title: 'KritterKingBull', description: 'A unique KritterKingBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BearBot.png', alt: 'BearBot', title: 'BearBot', description: 'A unique BearBot design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BullBot.png', alt: 'BullBot', title: 'BullBot', description: 'A unique BullBot design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BearMonk.png', alt: 'BearMonk', title: 'BearMonk', description: 'A unique BearMonk design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BullMonk.png', alt: 'BullMonk', title: 'BullMonk', description: 'A unique BullMonk design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/Panda.png', alt: 'Panda', title: 'Panda', description: 'A unique Panda design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/Cow.png', alt: 'Cow', title: 'Cow', description: 'A unique Cow design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/PixelBear.png', alt: 'PixelBear', title: 'PixelBear', description: 'A unique PixelBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/PixelBull.png', alt: 'PixelBull', title: 'PixelBull', description: 'A unique PixelBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/FlippedBear.png', alt: 'FlippedBear', title: 'FlippedBear', description: 'A unique FlippedBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/FlippedBull.png', alt: 'FlippedBull', title: 'FlippedBull', description: 'A unique FlippedBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BearGhost.png', alt: 'BearGhost', title: 'BearGhost', description: 'A unique BearGhost design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BullGhost.png', alt: 'BullGhost', title: 'BullGhost', description: 'A unique BullGhost design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BitcoinBear.png', alt: 'BitcoinBear', title: 'BitcoinBear', description: 'A unique BitcoinBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BitcoinBull.png', alt: 'BitcoinBull', title: 'BitcoinBull', description: 'A unique BitcoinBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/BearRug.png', alt: 'BearRug', title: 'BearRug', description: 'A unique BearRug design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/KaspaChargingBull.png', alt: 'KaspaChargingBull', title: 'KaspaChargingBull', description: 'A unique KaspaChargingBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/KasPoohBear.png', alt: 'KasPoohBear', title: 'KasPoohBear', description: 'A unique KasPoohBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/KasPoohBull.png', alt: 'KasPoohBull', title: 'KasPoohBull', description: 'A unique KasPoohBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/MinerBear.png', alt: 'MinerBear', title: 'MinerBear', description: 'A unique MinerBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/MinerBull.png', alt: 'MinerBull', title: 'MinerBull', description: 'A unique MinerBull design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/PolarAmbassador.png', alt: 'PolarAmbassador', title: 'PolarAmbassador', description: 'A unique PolarAmbassador design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/RedBullAmbassador.png', alt: 'RedBullAmbassador', title: 'RedBullAmbassador', description: 'A unique RedBullAmbassador design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/NotBear.png', alt: 'NotBear', title: 'NotBear', description: 'A unique NotBear design.', rarity: 0.05 },
  //     { src: '/images/2/1of1/NotBull.png', alt: 'NotBull', title: 'NotBull', description: 'A unique NotBull design.', rarity: 0.05 },
  //   ],
  // },
];