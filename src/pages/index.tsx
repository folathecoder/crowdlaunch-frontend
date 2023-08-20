import type { NextPage } from 'next';
import { CldImage } from 'next-cloudinary';
import { HomePageTemplate } from '@/components/home';

const Home: NextPage = () => {
  return (
    <main>
      <div>
        <CldImage
          src="https://res.cloudinary.com/ddfjqustf/image/upload/v1692278700/crowdlaunch/bmasxubrzyhlxnbzycum.webp"
          height={150}
          width={150}
          alt=""
          crop="thumb"
        />
      </div>
      <HomePageTemplate />
    </main>
  );
};

export default Home;
