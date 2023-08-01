import { request, gql } from 'graphql-request';
import { QueryResult, PostQueryDetail } from '@/types/blogTypes';

// Define the GraphQL API endpoint to be used for requests
const graphqlAPI = process.env.GRAPHCMS_ENDPOINT || 'end point';

// Function to fetch all posts from the GraphQL API
export const getAllPosts = async () => {
  // Define the GraphQL query to get all posts
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: publishedAt_ASC) {
        edges {
          node {
            title
            createdAt
            excerpt
            slug
            id
            coverImage {
              url
            }
            author {
              name
              picture {
                url
              }
            }
          }
        }
      }
    }
  `;
  // Execute the GraphQL query and store the result
  const result = await request<QueryResult>(graphqlAPI, query);
  // Return the list of post edges
  return result.postsConnection.edges;
};

// Function to fetch a specific number of posts from the GraphQL API
export const getSomePosts = async (numberOfPosts: number) => {
  // Define the GraphQL query to get a specific number of posts
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: publishedAt_DESC, first: ${numberOfPosts}) {
        edges {
          node {
            title
            createdAt
            excerpt
            slug
            id
            coverImage {
              url
            }
            author {
              name
              picture {
                url
              }
            }
          }
        }
      }
    }
  `;
  // Execute the GraphQL query and store the result
  const result = await request<QueryResult>(graphqlAPI, query);
  // Return the list of post edges
  return result.postsConnection.edges;
};

// Function to fetch the details of a specific post using its slug from the GraphQL API
export const getPostDetails = async (slug: string) => {
  // Define the GraphQL query to get post details by slug
  const query = gql`
    query Seos($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        publishedAt
        slug
        updatedAt
        coverImage {
          url
        }
        content {
          html
        }
        author {
          biography
          name
          title
          picture {
            url
          }
          posts(first: 4, orderBy: updatedAt_DESC) {
            author {
              name
              picture {
                url
              }
            }
            coverImage {
              url
            }
            excerpt
            slug
            title
            id
            createdAt
          }
          publishedAt
        }
      }
    }
  `;
  // Execute the GraphQL query with the provided slug as a variable and store the result
  const result = await request<PostQueryDetail>(graphqlAPI, query, { slug });
  // Return the post details
  return result.post;
};
