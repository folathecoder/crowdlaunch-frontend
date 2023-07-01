import type { NextPage } from 'next';
import useWallet from '@/wallet/useWallet';

const Home: NextPage = () => {
  const { wallet } = useWallet();

  return (
    <main>
      <ul>
        <li>wallet address: {wallet.walletAddress}</li>
      </ul>
    </main>
  );
};

export default Home;
