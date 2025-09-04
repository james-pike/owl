// src/components/NFTViewer.tsx
import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';

interface NFT {
  id: number;
  name: string;
  rank: number;
  rarity: string;
  minted: boolean;
}

interface NFTViewerProps {
  metadata: NFT[];
  total: number;
  ipfsBaseUrl: string;
  ipfsCid: string;
  fileExtension?: string;
  collectionName: string;
}

const getRarityClass = (rarity: string) => {
  switch (rarity?.toLowerCase()) {
    case 'legendary': return 'text-orange-500';
    case 'epic': return 'text-yellow-500';
    case 'rare': return 'text-blue-500';
    case 'uncommon': return 'text-green-500';
    case 'common': return 'text-amber-700';
    default: return 'text-gray-700';
  }
};

export default component$<NFTViewerProps>((props) => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);
  const isLoading = useSignal(true);

  useVisibleTask$(() => {
    isLoading.value = true;
    const defaultId = 1;
    const defaultNft = props.metadata.find((n) => n.id === defaultId);

    if (defaultNft) {
      nftData.value = {
        metadata: {
          ...defaultNft,
          image: `${props.ipfsBaseUrl}/${defaultId}.${props.fileExtension || 'jpeg'}`,
        },
        tokenURI: `ipfs://${props.ipfsCid}/${defaultId}.${props.fileExtension || 'jpeg'}`,
      };
      nftSearchId.value = String(defaultId);
    } else {
      error.value = `NFT (ID ${defaultId}) not found in metadata.`;
    }
    isLoading.value = false;
  });

  const handleNFTSearch = $(async () => {
    error.value = null;
    nftData.value = null;
    isLoading.value = true;

    try {
      const searchId = parseInt(nftSearchId.value);
      if (isNaN(searchId) || searchId < 1 || searchId > props.total) {
        throw new Error(`Please enter a valid NFT ID between 1 and ${props.total}.`);
      }

      const nft = props.metadata.find((n) => n.id === searchId);
      if (!nft) throw new Error(`${props.collectionName} ID ${nftSearchId.value} not found`);

      const imageUrl = `${props.ipfsBaseUrl}/${searchId}.${props.fileExtension || 'jpeg'}`;
      const tokenURI = `ipfs://${props.ipfsCid}/${searchId}.${props.fileExtension || 'jpeg'}`;

      nftData.value = { metadata: { ...nft, image: imageUrl }, tokenURI };
    } catch (err: any) {
      error.value = err.message || 'Failed to load NFT data.';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <section class="p-2 max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">{props.collectionName}</h1>
      <div class="flex flex-col gap-4">
        {isLoading.value && <p class="text-gray-500">Loading NFT data...</p>}
        {!isLoading.value && error.value && <p class="text-red-500">{error.value}</p>}
        {!isLoading.value && nftData.value && (
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 items-start">
            <div class="border border-gray-200/50 p-1 bg-white/70 rounded-lg">
              <img
                src={nftData.value.metadata.image}
                alt={nftData.value.metadata.name}
                class="w-full rounded-lg object-contain"
              />
            </div>
            <div class="bg-white/70 p-3 rounded-xl shadow-md">
              <div class="flex gap-2 mb-2 w-full max-w-xs">
                <input
                  type="number"
                  value={nftSearchId.value}
                  onInput$={(e) => (nftSearchId.value = (e.target as HTMLInputElement).value)}
                  onKeyDown$={(e) => e.key === 'Enter' && handleNFTSearch()}
                  placeholder={`Enter NFT ID (1-${props.total})`}
                  class="border p-2 rounded focus:ring-teal-700 bg-white border-gray-200 w-full"
                  min="1"
                  max={props.total}
                />
                <button
                  onClick$={handleNFTSearch}
                  class="bg-teal-500 text-white p-2 rounded hover:bg-teal-400"
                  disabled={isLoading.value}
                >
                  {isLoading.value ? 'Searching...' : 'Search'}
                </button>
              </div>
              <h2 class="text-xl font-semibold mb-1">{nftData.value.metadata.name}</h2>
              <p>
                Rank: <span class={getRarityClass(nftData.value.metadata.rarity)}>
                  {nftData.value.metadata.rank}
                </span> / {props.total}
              </p>
              <p>
                Rarity: <span class={getRarityClass(nftData.value.metadata.rarity)}>
                  {nftData.value.metadata.rarity}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
