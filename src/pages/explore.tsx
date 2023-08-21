import type { NextPage } from 'next';
import { ExplorerLayout } from '@/components/explore';
import MetaData from '@/seo/metaData';

const Explore: NextPage = () => {
  return (
    <>
      <MetaData
        title="Explore | Funding Startups with NFTs"
        description="Unlock a global network of investors and empower your startup to soar."
      />
      <main>
        <ExplorerLayout />
      </main>
    </>
  );
};

export default Explore;
