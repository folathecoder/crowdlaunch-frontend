import { create } from 'ipfs-http-client';

export async function renderIPFSImage(): Promise<string> {
  const ipfs = create({
    url: 'https://crowdlaunch.infura-ipfs.io/api/v0', // Full URL including the API path
  }); // Use an IPFS gateway or your own IPFS node

  try {
    const cid = 'QmW6rSCkA8sFAhryq2cC46xF2fcNfYyZpfzh3DQMK3b4jw';

    // Fetch the image content from IPFS
    const chunks: Uint8Array[] = [];
    for await (const chunk of ipfs.cat(`/ipfs/${cid}`)) {
      chunks.push(chunk);
    }

    // Concatenate the chunks into a single Uint8Array
    const concatenatedBuffer = Buffer.concat(chunks);

    // Convert the concatenated buffer to base64
    const base64Image = concatenatedBuffer.toString('base64');

    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error(error);
    return '';
  }
}
