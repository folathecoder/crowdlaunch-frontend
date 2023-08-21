import React from 'react';
import Head from 'next/head';

interface PropTypes {
  title: string;
  description: string;
}

const MetaData = ({ title, description }: PropTypes) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default MetaData;
