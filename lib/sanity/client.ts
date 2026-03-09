import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ufptg5nb";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-05";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use public CDN for fast, edge-cached response
  token: process.env.SANITY_API_TOKEN, // Optional token if dataset is private
});
