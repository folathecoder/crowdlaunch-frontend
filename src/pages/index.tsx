import type { NextPage } from 'next';
import { HomePageTemplate } from '@/components/home';
import MetaData from '@/seo/metaData';

const Home: NextPage = () => {
  return (
    <>
      <MetaData
        title="Crowdlaunch | Funding Startups with NFTs"
        description="Unlock a global network of investors and empower your startup to soar."
      />
      <main>
        <HomePageTemplate />
      </main>
    </>
  );
};

export default Home;
