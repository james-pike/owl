import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import metadata from '~/data/metadata_stripped.json';
import { Card } from '../ui/Card';

const TOTAL_NFTS = 1500;

// Compute trait rarity percentages dynamically
const computeTraitRarities = () => {
  const traitCounts: { [traitType: string]: { [value: string]: number } } = {};

  metadata.forEach((nft: any) => {
    if (nft.attributes) {
      nft.attributes.forEach((attr: any) => {
        const type = attr.trait_type.toLowerCase(); // Use trait_type directly
        const value = attr.value ? attr.value.toLowerCase() : 'none'; // Keep lowercase for rarity lookup

        if (!traitCounts[type]) {
          traitCounts[type] = {};
        }
        traitCounts[type][value] = (traitCounts[type][value] || 0) + 1;
      });
    }
  });

  const traitRarity: { [type: string]: { [value: string]: number } } = {};
  Object.keys(traitCounts).forEach((type) => {
    traitRarity[type] = {};
    Object.keys(traitCounts[type]).forEach((value) => {
      traitRarity[type][value] = (traitCounts[type][value] / TOTAL_NFTS) * 100;
    });
  });

  return traitRarity;
};

// Compute rarity score and rank for all NFTs
const computeNftRanks = (traitRarity: { [type: string]: { [value: string]: number } }) => {
  const nftScores = metadata.map((nft: any) => {
    let score = 0;
    if (nft.attributes) {
      nft.attributes.forEach((attr: any) => {
        const type = attr.trait_type.toLowerCase(); // Use trait_type directly
        const value = attr.value ? attr.value.toLowerCase() : 'none'; // Keep lowercase for rarity lookup
        const rarity = traitRarity[type]?.[value] || 0;
        score += rarity;
      });
    }
    return { name: nft.name, score };
  });

  nftScores.sort((a, b) => a.score - b.score);

  const ranks: { [name: string]: number } = {};
  nftScores.forEach((nft, index) => {
    ranks[nft.name] = index + 1;
  });

  return ranks;
};

const traitRarity = computeTraitRarities();
const nftRanks = computeNftRanks(traitRarity);

// Determine text color class based on rarity percentage
const getRarityColorClass = (rarity: number): string => {
  if (rarity < 1) {
    return 'text-orange-500';
  } else if (rarity < 2) {
    return 'text-yellow-500';
  } else if (rarity < 5) {
    return 'text-blue-500';
  } else {
    return 'text-green-500';
  }
};

// Format trait type for display (e.g., capitalize)
const getDisplayTraitType = (traitType: string): string => {
  return traitType.charAt(0).toUpperCase() + traitType.slice(1).toLowerCase();
};

export default component$(() => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);

  // Set default NFT (name '1') on component mount
  useVisibleTask$(() => {
    const defaultNft = metadata.find((nft) => nft.name === '1500');
    if (defaultNft) {
      const ipfsBase = 'bafybeiaa6rock4x4u32yefrz5w2brl44d2sq2llpe7gbrmq3qwn5zi6yee';
      const imageFile = defaultNft.image.split('/').pop(); // e.g., "1.png"
      const tokenURI = `ipfs://${ipfsBase}/${imageFile}`;
      const imageUrl = `https://${ipfsBase}.ipfs.w3s.link/${imageFile}`; // Use w3s.link Trustless Gateway

      nftData.value = {
        metadata: {
          name: defaultNft.name,
          image: imageUrl,
          attributes: defaultNft.attributes,
          rank: nftRanks[defaultNft.name],
        },
        tokenURI: tokenURI,
      };
      nftSearchId.value = '1500'; // Set input to reflect default
    }
  });

  const handleNFTSearch = $(() => {
    error.value = null;
    nftData.value = null;

    try {
      const nft = metadata.find((n) => n.name === nftSearchId.value);
      if (!nft) {
        throw new Error(`NFT with ID ${nftSearchId.value} not found`);
      }

      const ipfsBase = 'bafybeiaa6rock4x4u32yefrz5w2brl44d2sq2llpe7gbrmq3qwn5zi6yee';
      const imageFile = nft.image.split('/').pop(); // e.g., "1.png"
      const tokenURI = `ipfs://${ipfsBase}/${imageFile}`;
      const imageUrl = `https://${ipfsBase}.ipfs.w3s.link/${imageFile}`; // Use w3s.link Trustless Gateway

      console.log('Image URL:', imageUrl); // Debug log
      console.log('Token URI:', tokenURI); // Debug log

      nftData.value = {
        metadata: {
          name: nft.name,
          image: imageUrl,
          attributes: nft.attributes,
          rank: nftRanks[nft.name],
        },
        tokenURI: tokenURI,
      };
    } catch (err: any) {
      error.value = err.message || 'Failed to load NFT data. Check the ID and try again.';
    }
  });

  return (
    <Card.Content>
      <section class="p-2 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column (Image on md and up) */}
          <div class="md:order-1 order-2 hidden md:flex justify-center">
            {nftData.value ? (
              <img
                src={nftData.value.metadata.image}
                alt={nftData.value.metadata.name}
                class="w-full max-w-[400px] md:max-w-[500px] max-h-[400px] md:max-h-[500px] rounded-md object-contain shadow-lg"
                onError$={() => {
                  console.log(`Failed to load image: ${nftData.value.metadata.image}`);
                }}
              />
            ) : (
              <div class="w-full max-w-[400px] md:max-w-[500px] max-h-[400px] md:max-h-[500px] rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                Loading...
              </div>
            )}
          </div>

          {/* Right Column (Search + Stats + Image on mobile) */}
          <div class="md:order-2 order-1 flex flex-col gap-4">
            <div class="flex gap-2">
              <input
                type="number"
                value={nftSearchId.value}
                onInput$={(e) => (nftSearchId.value = (e.target as HTMLInputElement).value)}
                onWheel$={(e) => e.preventDefault()} // Prevent scroll increment/decrement
                placeholder="Enter NFT ID"
                class="border p-2 rounded bg-gray-900 border-gray-700 w-full max-w-xs"
              />
              <button
                onClick$={handleNFTSearch}
                class="bg-secondary-800 text-white p-2 rounded hover:bg-secondary-700"
              >
                Search
              </button>
            </div>

            {error.value && <p class="text-red-500">{error.value}</p>}

            {nftData.value && (
              <div class="bg-gray-900 p-4 rounded-xl shadow-md">
                {/* Image on mobile only */}
                <div class="md:hidden flex justify-center mb-4">
                  <img
                    width={300}
                    height={300}
                    src={nftData.value.metadata.image}
                    alt={nftData.value.metadata.name}
                    class="w-full max-w-[300px] max-h-[300px] rounded-md object-contain"
                    onError$={() => {
                      console.log(`Failed to load image: ${nftData.value.metadata.image}`);
                    }}
                  />
                </div>

                <h2 class="text-xl font-semibold mb-2">#{nftData.value.metadata.name}</h2>
                <p class="text-md font-semibold mb-2">Rank: {nftData.value.metadata.rank} / {TOTAL_NFTS}</p>

                {nftData.value.metadata.attributes && (
                  <ul class="text-sm space-y-1">
                    {nftData.value.metadata.attributes.slice(0, 5).map((attr: any, i: number) => {
                      const type = attr.trait_type.toLowerCase(); // Use trait_type directly
                      let value = attr.value ? attr.value : 'none'; // Preserve original capitalization
                      value = value === '' || value === 'blank' ? 'none' : value;
                      const rarity = traitRarity[type]?.[value.toLowerCase()] || null; // Use lowercase for rarity lookup

                      const displayTraitType = getDisplayTraitType(attr.trait_type);

                      return (
                        <li key={i}>
                          <span class="font-medium capitalize">{`${displayTraitType}: `}</span>
                          <span class="text-slate-400">{value}</span>
                          {rarity !== null && rarity !== undefined && (
                            <span class={getRarityColorClass(rarity)}>{` (${rarity.toFixed(2)}%)`}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}

            {/* Rarity Legend - Desktop Only */}
            <div class="hidden md:block mt-0 text-center">
              <div class="flex text-sm flex-wrap justify-start gap-4 px-2">
              <span class="text-green-500 font-medium">Common (≥5%)</span>
      <span class="text-blue-500 font-medium">Uncommon (&lt;5%)</span>
      <span class="text-yellow-500 font-medium">Rare (&lt;2%)</span>
      <span class="text-orange-500 font-medium">Legendary (&lt;1%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rarity Legend - Mobile Only */}
        <div class="md:hidden mt-6 text-center">
          <div class="flex text-xs flex-wrap justify-center gap-2">
          <span class="text-green-500 font-medium">Common (≥5%)</span>
      <span class="text-blue-500 font-medium">Uncommon (&lt;5%)</span>
      <span class="text-yellow-500 font-medium">Rare (&lt;2%)</span>
      <span class="text-orange-500 font-medium">Legendary (&lt;1%)</span>
          </div>
        </div>
      </section>
    </Card.Content>
  );
});