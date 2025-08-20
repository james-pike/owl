import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import metadata from './metadata.json'; // Import metadata.json from the same directory

const TOTAL_NFTS = 250; // Total number of NFTs in the collection

export default component$(() => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);

  // Set default NFT (id 1) on component mount
  useVisibleTask$(() => {
    const defaultNft = metadata.find((nft: { id: number }) => nft.id === 1);
    if (defaultNft) {
      nftData.value = {
        metadata: {
          id: defaultNft.id,
          name: defaultNft.name,
          image: '/images/1.png', // Use goldie.jpg as default image
          rank: defaultNft.rank,
          rarity: defaultNft.rarity,
        },
        tokenURI: 'ipfs://placeholder_ipfs_hash/goldie.jpg', // Placeholder tokenURI
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
      const searchId = parseInt(nftSearchId.value); // Convert input to number
      if (isNaN(searchId)) {
        throw new Error('Please enter a valid NFT ID (numeric).');
      }

      const nft = metadata.find((n) => n.id === searchId);
      if (!nft) {
        throw new Error(`KasKritter ID ${nftSearchId.value} not found`);
      }

      // Use goldie.jpg as the image for all NFTs
      const imageUrl = '/images/1.png';
      const tokenURI = 'ipfs://placeholder_ipfs_hash/1.png'; // Placeholder tokenURI

      nftData.value = {
        metadata: {
          id: nft.id,
          name: nft.name,
          image: imageUrl,
          rank: nft.rank,
          rarity: nft.rarity,
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-start">
            {/* Image on the left */}
            <div class="border border-gray-200/50 p-1 bg-white/70 rounded-lg">
              <img
                src={nftData.value.metadata.image}
                alt={nftData.value.metadata.name}
                class="w-full rounded-lg object-contain "
                onError$={() => {
                  console.log(`Failed to load image: ${nftData.value.metadata.image}`);
                }}
              />
            </div>

            {/* Stats on the right with search bar */}
            <div class="bg-white/70 p-3 rounded-xl shadow-md">
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
              <h2 class="text-xl font-semibold mb-1">{nftData.value.metadata.name}</h2>
              <p class="text-md font-semibold mb-1">Rank: {nftData.value.metadata.rank} / {TOTAL_NFTS}</p>
              <p class="text-md font-semibold mb-1">Rarity: {nftData.value.metadata.rarity}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});