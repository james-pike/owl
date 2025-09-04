import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import metadataKaskritterz from './metadata.json'; // KasKritterz metadata
import metadataBullzbearz from './metadata2.json'; // Bullz vs Bearz metadata

const TOTAL_NFTS_KASKRITTERZ = 250; // Total number of NFTs for KasKritterz
const TOTAL_NFTS_BULLZBEARZ = 2000; // Total number of NFTs for Bullz vs Bearz
const IPFS_BASE_URL_KASKRITTERZ = 'https://gateway.pinata.cloud/ipfs/bafybeidqapglcihowufq4g2ro7pnaxyz2ekfcyvam33wmtt6vfvcxhnbdu';
const IPFS_CID_KASKRITTERZ = 'bafybeidqapglcihowufq4g2ro7pnaxyz2ekfcyvam33wmtt6vfvcxhnbdu';
const IPFS_BASE_URL_BULLZBEARZ = 'https://gateway.lighthouse.storage/ipfs/bafybeicjqpbhl3u5gnakwcmqymsd2gdkay4mni6iuo2l6pkjet6msxarhq';
const IPFS_CID_BULLZBEARZ = 'bafybeicjqpbhl3u5gnakwcmqymsd2gdkay4mni6iuo2l6pkjet6msxarhq';
const FILE_EXTENSION_KASKRITTERZ = 'jpeg'; // File extension for KasKritterz
const FILE_EXTENSION_BULLZBEARZ = 'jpg'; // File extension for Bullz vs Bearz

// Helper function to determine rarity class and label
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

// Helper function to extract rank number from "Rank: #<number>" for Bullz vs Bearz
const extractRankNumber = (rarity: string | undefined): number => {
  if (typeof rarity === 'string' && rarity.startsWith('Rank: #')) {
    const rank = parseInt(rarity.replace('Rank: #', ''));
    return isNaN(rank) ? 0 : rank;
  }
  return 0; // Fallback to 0 if rarity is undefined or malformed
};

// Helper function to map Bullz vs Bearz rank to standardized rarity tier
const getBullzBearzRarity = (rank: number, id: number): string => {
  if (id >= 1 && id <= 34) return 'Legendary'; // Hardcode first 35 as Legendary
  if (rank <= 100) return 'Epic'; // Next 65 NFTs (3.25%)
  if (rank <= 300) return 'Rare'; // Next 200 NFTs (10%)
  if (rank <= 600) return 'Uncommon'; // Next 300 NFTs (15%)
  return 'Common'; // Remaining 1400 NFTs (70%)
};

export default component$(() => {
  const activeTab = useSignal<'kaskritterz' | 'bullzbearz'>('bullzbearz'); // Default to Bullz vs Bearz
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);
  const isLoading = useSignal(true);

  // Load default NFT (ID #1) on component mount for the active tab
  useVisibleTask$(() => {
    isLoading.value = true;
    const defaultId = 1;
    const metadata = activeTab.value === 'kaskritterz' ? metadataKaskritterz : metadataBullzbearz;
    const ipfsBaseUrl = activeTab.value === 'kaskritterz' ? IPFS_BASE_URL_KASKRITTERZ : IPFS_BASE_URL_BULLZBEARZ;
    const ipfsCid = activeTab.value === 'kaskritterz' ? IPFS_CID_KASKRITTERZ : IPFS_CID_BULLZBEARZ;
    const fileExtension = activeTab.value === 'kaskritterz' ? FILE_EXTENSION_KASKRITTERZ : FILE_EXTENSION_BULLZBEARZ;
    const collectionName = activeTab.value === 'kaskritterz' ? 'KasKritterz' : 'Bullz vs Bearz';

    const defaultNft = metadata.find((nft: { id: number }) => nft.id === defaultId);

    if (defaultNft) {
      const rankNumber = activeTab.value === 'bullzbearz' ? extractRankNumber(defaultNft.rarity) : defaultNft.rank || 0;
      const rarityLabel = activeTab.value === 'bullzbearz' ? getBullzBearzRarity(rankNumber, defaultId) : defaultNft.rarity || 'Unknown';
      const validatedRank = defaultId >= 1 && defaultId <= 35 && activeTab.value === 'bullzbearz' ? '1' : (rankNumber > 0 ? rankNumber : 'Unknown');

      nftData.value = {
        metadata: {
          id: defaultNft.id,
          name: defaultNft.name || `${collectionName} #${defaultId}`,
          image: `${ipfsBaseUrl}/${defaultId}.${fileExtension}`,
          rank: validatedRank,
          rarity: rarityLabel,
          minted: defaultNft.minted || false,
        },
        tokenURI: `ipfs://${ipfsCid}/${defaultId}.${fileExtension}`,
      };
      nftSearchId.value = String(defaultId);
      console.log(`Initial NFT loaded (ID #1 for ${collectionName}, extension: ${fileExtension}):`, nftData.value);
    } else {
      error.value = `NFT (ID ${defaultId}) not found in ${collectionName} metadata.`;
      console.error('Metadata error:', error.value);
    }
    isLoading.value = false;
  }, { strategy: 'document-ready' });

  // Update NFT data when tab changes
  useVisibleTask$(({ track }) => {
    track(() => activeTab.value);
    isLoading.value = true;
    const defaultId = 1;
    const metadata = activeTab.value === 'kaskritterz' ? metadataKaskritterz : metadataBullzbearz;
    const ipfsBaseUrl = activeTab.value === 'kaskritterz' ? IPFS_BASE_URL_KASKRITTERZ : IPFS_BASE_URL_BULLZBEARZ;
    const ipfsCid = activeTab.value === 'kaskritterz' ? IPFS_CID_KASKRITTERZ : IPFS_CID_BULLZBEARZ;
    const fileExtension = activeTab.value === 'kaskritterz' ? FILE_EXTENSION_KASKRITTERZ : FILE_EXTENSION_BULLZBEARZ;
    const collectionName = activeTab.value === 'kaskritterz' ? 'KasKritterz' : 'Bullz vs Bearz';

    const defaultNft = metadata.find((nft: { id: number }) => nft.id === defaultId);

    if (defaultNft) {
      const rankNumber = activeTab.value === 'bullzbearz' ? extractRankNumber(defaultNft.rarity) : defaultNft.rank || 0;
      const rarityLabel = activeTab.value === 'bullzbearz' ? getBullzBearzRarity(rankNumber, defaultId) : defaultNft.rarity || 'Unknown';
      const validatedRank = defaultId >= 1 && defaultId <= 35 && activeTab.value === 'bullzbearz' ? '1' : (rankNumber > 0 ? rankNumber : 'Unknown');

      nftData.value = {
        metadata: {
          id: defaultNft.id,
          name: defaultNft.name || `${collectionName} #${defaultId}`,
          image: `${ipfsBaseUrl}/${defaultId}.${fileExtension}`,
          rank: validatedRank,
          rarity: rarityLabel,
          minted: defaultNft.minted || false,
        },
        tokenURI: `ipfs://${ipfsCid}/${defaultId}.${fileExtension}`,
      };
      nftSearchId.value = String(defaultId);
      console.log(`Tab switched to ${collectionName}, loaded NFT ID #1 (extension: ${fileExtension}):`, nftData.value);
    } else {
      error.value = `NFT (ID ${defaultId}) not found in ${collectionName} metadata.`;
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
      const totalNfts = activeTab.value === 'kaskritterz' ? TOTAL_NFTS_KASKRITTERZ : TOTAL_NFTS_BULLZBEARZ;
      const metadata = activeTab.value === 'kaskritterz' ? metadataKaskritterz : metadataBullzbearz;
      const ipfsBaseUrl = activeTab.value === 'kaskritterz' ? IPFS_BASE_URL_KASKRITTERZ : IPFS_BASE_URL_BULLZBEARZ;
      const ipfsCid = activeTab.value === 'kaskritterz' ? IPFS_CID_KASKRITTERZ : IPFS_CID_BULLZBEARZ;
      const fileExtension = activeTab.value === 'kaskritterz' ? FILE_EXTENSION_KASKRITTERZ : FILE_EXTENSION_BULLZBEARZ;
      const collectionName = activeTab.value === 'kaskritterz' ? 'KasKritterz' : 'Bullz vs Bearz';

      if (isNaN(searchId) || searchId < 1 || searchId > totalNfts) {
        throw new Error(`Please enter a valid NFT ID between 1 and ${totalNfts}.`);
      }

      const nft = metadata.find((n) => n.id === searchId);
      if (!nft) {
        throw new Error(`${collectionName} ID ${nftSearchId.value} not found`);
      }

      const imageUrl = `${ipfsBaseUrl}/${searchId}.${fileExtension}`;
      const tokenURI = `ipfs://${ipfsCid}/${searchId}.${fileExtension}`;
      const rankNumber = activeTab.value === 'bullzbearz' ? extractRankNumber(nft.rarity) : nft.rank || 0;
      const rarityLabel = activeTab.value === 'bullzbearz' ? getBullzBearzRarity(rankNumber, searchId) : nft.rarity || 'Unknown';
      const validatedRank = searchId >= 1 && searchId <= 35 && activeTab.value === 'bullzbearz' ? '1' : (rankNumber > 0 ? rankNumber : 'Unknown');

      nftData.value = {
        metadata: {
          id: nft.id,
          name: nft.name || `${collectionName} #${searchId}`,
          image: imageUrl,
          rank: validatedRank,
          rarity: rarityLabel,
          minted: nft.minted || false,
        },
        tokenURI: tokenURI,
      };
      console.log(`NFT search result for ${collectionName} (extension: ${fileExtension}):`, nftData.value);
    } catch (err: any) {
      error.value = err.message || 'Failed to load NFT data. Check the ID and try again.';
      console.error('Search error:', err);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <section class="p-2 max-w-5xl mx-auto">
      {/* Tab Navigation */}
      <div class="flex border-b border-gray-200 mb-4">
        <button
          class={`px-2 py-2 font-semibold ${activeTab.value === 'bullzbearz' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'}`}
          onClick$={() => (activeTab.value = 'bullzbearz')}
        >
          Bullz vs Bearz
        </button>
        <button
          class={`px-2 py-2 font-semibold ${activeTab.value === 'kaskritterz' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'}`}
          onClick$={() => (activeTab.value = 'kaskritterz')}
        >
          KasKritterz
        </button>
      </div>

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
                  placeholder={`Enter NFT ID (1-${activeTab.value === 'kaskritterz' ? TOTAL_NFTS_KASKRITTERZ : TOTAL_NFTS_BULLZBEARZ})`}
                  class="border p-2 rounded focus:ring-teal-700 bg-white border-gray-200 w-full"
                  min="1"
                  max={activeTab.value === 'kaskritterz' ? TOTAL_NFTS_KASKRITTERZ : TOTAL_NFTS_BULLZBEARZ}
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
              <p class="text-md font-semibold mb-1">
                Rank: <span class={getRarityClass(nftData.value.metadata.rarity)}>{nftData.value.metadata.rank}</span> / {activeTab.value === 'kaskritterz' ? TOTAL_NFTS_KASKRITTERZ : TOTAL_NFTS_BULLZBEARZ}
              </p>
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