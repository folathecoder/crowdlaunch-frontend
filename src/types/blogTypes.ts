export interface Post {
  node: {
    title: string;
    createdAt: string;
    excerpt: string;
    slug: string;
    id: string;
    coverImage: {
      url: string;
    };
    author: {
      name: string;
      picture: {
        url: string;
      };
    };
  };
}

export interface AuthorPostType {
  title: string;
  createdAt: string;
  excerpt: string;
  slug: string;
  id: string;
  coverImage: {
    url: string;
  };
  author: {
    name: string;
    picture: {
      url: string;
    };
    posts?: AuthorPostType[];
  };
}

export interface DataType {
  title: string;
  createdAt: string;
  excerpt: string;
  slug: string;
  id: string;
  coverImage: {
    url: string;
  };
  author: {
    name: string;
    picture: {
      url: string;
    };
    posts?: AuthorPostType[];
  };
}

export interface PostDetailDataType {
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  updatedAt: string;
  coverImage: {
    url: string;
  };
  content: {
    html: string;
  };
  author: {
    biography: string;
    name: string;
    title: string;
    picture: {
      url: string;
    };
    posts?: AuthorPostType[];
  };
}

export interface QueryResult {
  postsConnection: {
    edges: Post[];
  };
}

export interface PostQueryDetail {
  post: {
    title: string;
    excerpt: string;
    publishedAt: string;
    slug: string;
    tags: string[];
    updatedAt: string;
    coverImage: {
      url: string;
    };
    content: {
      html: string;
    };
    author: {
      biography: string;
      name: string;
      title: string;
      picture: {
        url: string;
      };
      posts: AuthorPostType[];
    };
  };
}

export interface QueryDataType {
  node: {
    title: string;
    createdAt: string;
    excerpt: string;
    slug: string;

    id: string;
    coverImage: {
      url: string;
    };
    author: {
      name: string;
      picture: {
        url: string;
      };
    };
  };
}

export interface ApiDataType {
  posts: QueryDataType[];
}
