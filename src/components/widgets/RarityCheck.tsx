import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import metadata from '~/data/metadata_stripped.json';
import kaslords from '~/data/kaslords.json'; // Import kaslords.json

const TOTAL_NFTS = 1500;

// Compute trait rarity percentages dynamically
const computeTraitRarities = () => {
  const traitCounts: { [traitType: string]: { [value: string]: number } } = {};

  metadata.forEach((nft: any) => {
    if (nft.attributes) {
      nft.attributes.forEach((attr: any) => {
        const type = attr.trait_type.toLowerCase();
        const value = attr.value ? attr.value.toLowerCase() : 'none';
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

// Create rank map from kaslords.json
const rankMap: { [tokenId: string]: number } = {};
kaslords.forEach((item: { tokenId: number; rarityRank: number }) => {
  rankMap[item.tokenId.toString()] = item.rarityRank;
});
console.log('Initialized rankMap:', rankMap); // Debug rankMap

const traitRarity = computeTraitRarities();

// Determine text color class based on rarity percentage
const getRarityColorClass = (rarity: number): string => {
  if (rarity < 1) {
    return 'text-orange-400';
  } else if (rarity < 2) {
    return 'text-yellow-400';
  } else if (rarity < 5) {
    return 'text-blue-400';
  } else {
    return 'text-green-400';
  }
};

// Format trait type for display
const getDisplayTraitType = (traitType: string): string => {
  return traitType.charAt(0).toUpperCase() + traitType.slice(1).toLowerCase();
};

export default component$(() => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);

  // Set default NFT (name '1') on component mount
  useVisibleTask$(() => {
    const defaultNft = metadata.find((nft) => nft.name === '1');
    if (defaultNft) {
      const defaultRank = rankMap['1'] || 0;
      console.log('Default NFT rank for ID 1:', defaultRank); // Debug default rank

      nftData.value = {
        metadata: {
          name: defaultNft.name,
          image: '/images/77.jpeg', // Set default image to /images/1.png
          attributes: defaultNft.attributes,
          rank: defaultRank,
        },
        tokenURI: '/images/1.png', // Placeholder tokenURI for default
      };
      nftSearchId.value = '1';
    } else {
      error.value = 'Default NFT (ID 1) not found in metadata.';
    }
  });

  const handleNFTSearch = $(() => {
    error.value = null;
    nftData.value = null;

    try {
      const nft = metadata.find((n) => n.name === nftSearchId.value);
      if (!nft) {
        throw new Error(`KasLord ID ${nftSearchId.value} not found`);
      }

      const ipfsBase = 'bafybeiaa6rock4x4u32yefrz5w2brl44d2sq2llpe7gbrmq3qwn5zi6yee';
      const imageFile = nft.image.split('/').pop();
      const tokenURI = `ipfs://${ipfsBase}/${imageFile}`;
      const imageUrl = `https://${ipfsBase}.ipfs.w3s.link/${imageFile}`;

      const rank = rankMap[nftSearchId.value] || 0;
      console.log(`Searching ID ${nftSearchId.value}, found rank: ${rank}`); // Debug lookup

      nftData.value = {
        metadata: {
          name: nft.name,
          image: imageUrl,
          attributes: nft.attributes,
          rank: rank,
        },
        tokenURI: tokenURI,
      };
    } catch (err: any) {
      error.value = err.message || 'Failed to load NFT data. Check the ID and try again.';
    }
  });

  return (
    <section class="p-2 max-w-5xl mx-auto">
      <div class="flex flex-col gap-4">
        {nftData.value && (
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
            {/* Image on the left */}
            <div class="bg-transparent border border-gray-200/50 p-1 rounded-lg">
              <img
                src={nftData.value.metadata.image}
                alt={nftData.value.metadata.name}
                class="w-full rounded-md object-contain"
                onError$={() => {
                  console.log(`Failed to load image: ${nftData.value.metadata.image}`);
                }}
              />
            </div>

            {/* Stats on the right with search bar */}
            <div class="bg-white/70 p-2 rounded-xl shadow-md">
              <div class="flex gap-2 mb-2 w-full max-w-xs">
                <input
                  type="number"
                  value={nftSearchId.value}
                  onInput$={(e) => (nftSearchId.value = (e.target as HTMLInputElement).value)}
                  onKeyDown$={(e) => {
                    if (e.key === 'Enter') {
                      handleNFTSearch();
                    }
                  }}
                  onWheel$={(e) => e.preventDefault()}
                  placeholder="Enter NFT ID"
                  class="border p-2 rounded focus:ring-teal-700 bg-white border-gray-200 w-full"
                />
                <button
                  onClick$={handleNFTSearch}
                  class="bg-teal-500 text-white p-2 rounded hover:bg-teal-400 transition-colors duration-200"
                >
                  Search
                </button>
              </div>
              {error.value && <p class="text-red-500">{error.value}</p>}
              <h2 class="text-xl font-semibold mb-1">#{nftData.value.metadata.name}</h2>
              <p class="text-md font-semibold mb-1">Rank: {nftData.value.metadata.rank} / {TOTAL_NFTS}</p>

              {nftData.value.metadata.attributes && (
                <ul class="!text-sm space-y-1">
                  {nftData.value.metadata.attributes.slice(0, 5).map((attr: any, i: number) => {
                    const type = attr.trait_type.toLowerCase();
                    let value = attr.value ? attr.value : 'none';
                    value = value === '' || value === 'blank' ? 'none' : value;
                    const rarity = traitRarity[type]?.[value.toLowerCase()] || null;

                    const displayTraitType = getDisplayTraitType(attr.trait_type);

                    return (
                      <li key={i}>
                        <span class="font-medium capitalize">{`${displayTraitType}: `}</span>
                        <span class="text-slate-600">{value}</span>
                        {rarity !== null && rarity !== undefined && (
                          <span class={getRarityColorClass(rarity)}>{` (${rarity.toFixed(2)}%)`}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});