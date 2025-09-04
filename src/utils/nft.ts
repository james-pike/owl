// src/utils/nft.ts

export function buildNftData(
  nft: any,
  collectionName: string,
  searchId: number,
  ipfsBaseUrl: string,
  ipfsCid: string,
  fileExtension: string
) {
  const rank =
    collectionName === 'Bullz vs Bearz'
      ? nft.id // use ID as rank
      : nft.rank || 0;

  const rarity = nft.rarity || 'Unknown';

  return {
    metadata: {
      id: nft.id,
      name: nft.name || `${collectionName} #${searchId}`,
      image: `${ipfsBaseUrl}/${searchId}.${fileExtension}`,
      rank,
      rarity,
      minted: nft.minted || false,
    },
    tokenURI: `ipfs://${ipfsCid}/${searchId}.${fileExtension}`,
  };
}
