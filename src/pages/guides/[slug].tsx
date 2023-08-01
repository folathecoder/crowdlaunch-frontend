import { GetStaticProps } from 'next';
import { getPostDetails, getAllPosts } from '@/cms/blogCms';
import React from 'react';
import GuideTemplate from '@/components/guide/guideTemplate/guideTemplate';
import { PostDetailDataType } from '@/types/blogTypes';

type Props = {
  post: PostDetailDataType | null;
};

interface PostType {
  post: PostDetailDataType;
}

const Guide = ({ post }: PostType) => {
  return <GuideTemplate {...post} />;
};

// Function that fetches the static props for the Guide component using Next.js static generation
export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
};

// Function that generates static paths for the Guide component during Next.js static generation
export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
};

export default Guide;
