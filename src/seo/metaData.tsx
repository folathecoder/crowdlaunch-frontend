import React from 'react';
import Head from 'next/head';
import { OG_URL } from '@/data/appInfo';

interface PropTypes {
  title: string;
  description: string;
  ogImageUrl?: string;
}

const MetaData = ({ title, description, ogImageUrl }: PropTypes) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={ogImageUrl || OG_URL} />
      <meta property="og:image:type" content={ogImageUrl || OG_URL} />
      <meta property="og:image:width" content={ogImageUrl || OG_URL} />
      <meta property="og:image:height" content={ogImageUrl || OG_URL} />
      <meta name="twitter:image" content={ogImageUrl || OG_URL} />
      <meta name="twitter:image:type" content={ogImageUrl || OG_URL} />
      <meta name="twitter:image:width" content={ogImageUrl || OG_URL} />
      <meta name="twitter:image:height" content={ogImageUrl || OG_URL} />
      <meta property="og:image:alt" content="Crowdlaunch" />
      <meta property="twitter:image:alt" content="Crowdlaunch" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="540" />
    </Head>
  );
};

export default MetaData;
