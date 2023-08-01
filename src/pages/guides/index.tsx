import { NextPage, GetStaticProps } from 'next';
import React from 'react';
import { GuideArchive } from '@/components/guide';
import { getAllPosts } from '@/cms/blogCms';
import { ApiDataType } from '@/types/blogTypes';

const Guides: NextPage<ApiDataType> = ({ posts }) => {
  return <GuideArchive posts={posts} />;
};

export const getStaticProps: GetStaticProps<ApiDataType> = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts },
  };
};

export default Guides;
