import type { NextPage } from 'next';
import { ExplorerLayout } from '@/components/marketplace';
import MetaData from '@/seo/metaData';

const Marketplace: NextPage = () => {
  return (
    <>
      <MetaData
        title="Marketplace | Funding Startups with NFTs"
        description="Unlock a global network of investors and empower your startup to soar."
      />
      <main>
        <ExplorerLayout />
      </main>
    </>
  );
};

export default Marketplace;
