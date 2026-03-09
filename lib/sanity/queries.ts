import { PortableTextBlock } from "next-sanity";

export interface ProjectType {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    publishedAt: string;
    orderRank: string | null;
    image: any;
    images?: any[];
    description: string;
    body?: PortableTextBlock[];
    tags?: string[];
    url?: string;
    cta?: string;
    award?: string;
    videoId?: string;
}

export const PROJECTS_QUERY = `
  *[_type == "project"] | order(orderRank asc, publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    orderRank,
    image,
    images,
    description,
    body,
    tags,
    url,
    cta,
    award,
    videoId
  }
`;
