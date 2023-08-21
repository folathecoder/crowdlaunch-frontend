import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
  const fontData = await fetch(
    new URL('/public/fonts/Poppins-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          fontFamily: '"Poppins"',
          color: 'white',
          paddingLeft: '6.2rem',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'hsla(0, 0%, 0%, 1)',
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '4rem',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#C2177E',
          }}
        >
          CrowdLaunch
        </p>
        <h3
          style={{
            fontSize: '6rem',
            lineHeightStep: '6rem',
            fontWeight: 700,
            lineHeight: '5rem',
            mixBlendMode: 'luminosity',
            maxWidth: '59rem',
            color: 'white',
          }}
        >
          Unleash The Power Of Crowdfunding With NFTs
        </h3>
      </div>
    ),
    {
      width: 1200,
      height: 540,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
