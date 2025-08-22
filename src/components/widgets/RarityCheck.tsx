import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import metadata from './metadata.json'; // Import metadata.json from the same directory

const TOTAL_NFTS = 250; // Total number of NFTs in the collection

const getRarityClass = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return 'text-orange-500';
    case 'epic':
      return 'text-yellow-500';
    case 'rare':
      return 'text-blue-500';
    case 'uncommon':
      return 'text-green-500';
    case 'common':
      return 'text-amber-700'; // amber-900 or brown substitute
    default:
      return 'text-gray-700';
  }
};

export default component$(() => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);

  // Set default NFT (random ID) on component mount
  useVisibleTask$(() => {
    const randomId = Math.floor(Math.random() * TOTAL_NFTS) + 1; // Random number between 1 and 250
    const randomNft = metadata.find((nft: { id: number }) => nft.id === randomId);

    if (randomNft) {
      nftData.value = {
        metadata: {
          id: randomNft.id,
          name: randomNft.name,
          image: `https://bafybeibkhqxpl7xdfo7ccaxyculajq3mdw726u4ztw5lme6ntn7223dzg4.ipfs.w3s.link/${randomId}.png`, // Updated to w3s.link
          rank: randomNft.rank,
          rarity: randomNft.rarity,
        },
        tokenURI: `ipfs://bafybeibkhqxpl7xdfo7ccaxyculajq3mdw726u4ztw5lme6ntn7223dzg4/${randomId}.png`, // IPFS tokenURI
      };
      nftSearchId.value = String(randomId);
    } else {
      error.value = `Random NFT (ID ${randomId}) not found in metadata.`;
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

      // Use w3s.link for image, keep ipfs:// for tokenURI
      const imageUrl = `https://bafybeibkhqxpl7xdfo7ccaxyculajq3mdw726u4ztw5lme6ntn7223dzg4.ipfs.w3s.link/${searchId}.png`;
      const tokenURI = `ipfs://bafybeibkhqxpl7xdfo7ccaxyculajq3mdw726u4ztw5lme6ntn7223dzg4/${searchId}.png`;

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
                class="w-full rounded-lg object-contain"
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
              <p class="text-md font-semibold mb-1">
                Rarity: <span class={getRarityClass(nftData.value.metadata.rarity)}>{nftData.value.metadata.rarity}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});