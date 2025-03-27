import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import jeetsMetadata from '~/data/jeetsMetadata.json';
import { Card } from '../ui/Card';

export default component$(() => {
  const nftSearchId = useSignal('');
  const nftData = useSignal<any>(null);
  const error = useSignal<string | null>(null);

  // Set default NFT (edition #1) on component mount
  useVisibleTask$(() => {
    const defaultNft = jeetsMetadata.nfts.find((nft: { edition: number }) => nft.edition === 1);
    if (defaultNft) {
      const ipfsBase = 'bafybeif6ba2mj6utneenc6dob7jnvxc2oexplrwsxjwmxm3fgy7e36smqu';
      const imageFile = defaultNft.image.split('/').pop(); // "1.png"
      const tokenURI = `ipfs://${ipfsBase}/${imageFile}`;
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsBase}/${imageFile}`;

      nftData.value = {
        metadata: {
          name: defaultNft.name,
          description: defaultNft.description,
          image: imageUrl,
          attributes: defaultNft.attributes,
        },
        tokenURI: tokenURI,
      };
      nftSearchId.value = '1'; // Set input to reflect default
    }
  });

  const handleNFTSearch = $(() => {
    error.value = null;
    nftData.value = null;
    try {
      const nft = jeetsMetadata.nfts.find((nft: { edition: number }) => nft.edition === parseInt(nftSearchId.value));
      if (!nft) {
        throw new Error(`NFT with Edition ${nftSearchId.value} not found`);
      }
      const ipfsBase = 'bafybeif6ba2mj6utneenc6dob7jnvxc2oexplrwsxjwmxm3fgy7e36smqu';
      const imageFile = nft.image.split('/').pop(); // "1.png", "4.png", etc.
      const tokenURI = `ipfs://${ipfsBase}/${imageFile}`;
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsBase}/${imageFile}`;

      console.log('Image URL:', imageUrl); // Debug log
      console.log('Token URI:', tokenURI); // Debug log

      nftData.value = {
        metadata: {
          name: nft.name,
          description: nft.description,
          image: imageUrl,
          attributes: nft.attributes,
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
                placeholder="Enter NFT Edition (e.g., 1)"
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

                <h2 class="text-xl font-semibold mb-2">{nftData.value.metadata.name}</h2>
                {/* <p class="text-gray-600 mb-4">{nftData.value.metadata.description}</p> */}

                <h3 class="text-lg font-semibold mb-2">Attributes</h3>
                <ul class="list-disc pl-5 text-sm">
                  {nftData.value.metadata.attributes?.map((attr: any, index: number) => (
                    <li key={index}>
                      {attr.trait_type}: {attr.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </Card.Content>
  );
});