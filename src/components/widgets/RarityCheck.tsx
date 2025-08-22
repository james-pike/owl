import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import metadata from './metadata.json'; // Import metadata.json from the same directory

const TOTAL_NFTS = 250; // Total number of NFTs in the collection
const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs/bafybeidqapglcihowufq4g2ro7pnaxyz2ekfcyvam33wmtt6vfvcxhnbdu';
const IPFS_CID = 'bafybeidqapglcihowufq4g2ro7pnaxyz2ekfcyvam33wmtt6vfvcxhnbdu';
const FILE_EXTENSION = 'jpeg'; // Confirmed working extension

const getRarityClass = (rarity: string) => {
  switch (rarity?.toLowerCase()) {
    case 'legendary':
      return 'text-orange-500';
    case 'epic':
      return 'text-yellow-500';
    case 'rare':
      return 'text-blue-500';
    case 'uncommon':
      return 'text-green-500';
    case 'common':
      return 'text-amber-700';
    default:
      return 'text-gray-700';
  }
};

export default component$(() => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);
  const isLoading = useSignal(true);

  // Set default NFT (random ID) on component mount
  useVisibleTask$(() => {
    isLoading.value = true;
    const randomId = Math.floor(Math.random() * TOTAL_NFTS) + 1;
    const randomNft = metadata.find((nft: { id: number }) => nft.id === randomId);

    if (randomNft) {
      nftData.value = {
        metadata: {
          id: randomNft.id,
          name: randomNft.name,
          image: `${IPFS_BASE_URL}/${randomId}.${FILE_EXTENSION}`,
          rank: randomNft.rank,
          rarity: randomNft.rarity,
          minted: randomNft.minted,
        },
        tokenURI: `ipfs://${IPFS_CID}/${randomId}.${FILE_EXTENSION}`,
      };
      nftSearchId.value = String(randomId);
      console.log('Initial NFT loaded:', nftData.value);
    } else {
      error.value = `Random NFT (ID ${randomId}) not found in metadata.`;
      console.error('Metadata error:', error.value);
    }
    isLoading.value = false;
  });

  const handleNFTSearch = $(async () => {
    error.value = null;
    nftData.value = null;
    isLoading.value = true;

    try {
      const searchId = parseInt(nftSearchId.value);
      if (isNaN(searchId) || searchId < 1 || searchId > TOTAL_NFTS) {
        throw new Error(`Please enter a valid NFT ID between 1 and ${TOTAL_NFTS}.`);
      }

      const nft = metadata.find((n) => n.id === searchId);
      if (!nft) {
        throw new Error(`KasKritter ID ${nftSearchId.value} not found`);
      }

      const imageUrl = `${IPFS_BASE_URL}/${searchId}.${FILE_EXTENSION}`;
      const tokenURI = `ipfs://${IPFS_CID}/${searchId}.${FILE_EXTENSION}`;

      nftData.value = {
        metadata: {
          id: nft.id,
          name: nft.name,
          image: imageUrl,
          rank: nft.rank,
          rarity: nft.rarity,
          minted: nft.minted,
        },
        tokenURI: tokenURI,
      };
      console.log('NFT search result:', nftData.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to load NFT data. Check the ID and try again.';
      console.error('Search error:', err);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <section class="p-2 max-w-5xl mx-auto">
      <div class="flex flex-col gap-4">
        {isLoading.value && <p class="text-gray-500">Loading NFT data...</p>}
        {!isLoading.value && error.value && <p class="text-red-500">{error.value}</p>}
        {!isLoading.value && !error.value && !nftData.value && (
          <p class="text-gray-500">No NFT data loaded. Please try searching for an NFT.</p>
        )}
        {!isLoading.value && nftData.value && (
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-start">
            {/* Image on the left */}
            <div class="border border-gray-200/50 p-1 bg-white/70 rounded-lg">
              <img
                src={nftData.value.metadata.image}
                alt={nftData.value.metadata.name}
                class="w-full rounded-lg object-contain"
                onError$={() => {
                  console.error(`Failed to load image: ${nftData.value.metadata.image}`);
                  error.value = 'Failed to load NFT image. Please try another ID.';
                  nftData.value.metadata.image = '/fallback-image.jpg'; // Replace with your fallback image path
                }}
                onLoad$={() => console.log(`Successfully loaded image: ${nftData.value.metadata.image}`)}
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
                  placeholder={`Enter NFT ID (1-${TOTAL_NFTS})`}
                  class="border p-2 rounded focus:ring-teal-700 bg-white border-gray-200 w-full"
                  min="1"
                  max={TOTAL_NFTS}
                />
                <button
                  onClick$={handleNFTSearch}
                  class="bg-teal-500 text-white p-2 rounded hover:bg-teal-400 transition-colors duration-200"
                  disabled={isLoading.value}
                >
                  {isLoading.value ? 'Searching...' : 'Search'}
                </button>
              </div>
              {error.value && <p class="text-red-500">{error.value}</p>}
              <h2 class="text-xl font-semibold mb-1">{nftData.value.metadata.name}</h2>
              <p class="text-md font-semibold mb-1">Rank: {nftData.value.metadata.rank} / {TOTAL_NFTS}</p>
              <p class="text-md font-semibold mb-1">
                Rarity: <span class={getRarityClass(nftData.value.metadata.rarity)}>{nftData.value.metadata.rarity}</span>
              </p>
              <p class="text-md font-semibold mb-1">Minted: {nftData.value.metadata.minted ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});