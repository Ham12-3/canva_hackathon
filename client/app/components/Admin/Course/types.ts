// types.ts

export type Link = {
  title: string;
  url: string;
};

export type ContentItem = {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  links: Link[];
  videoLength?: string; // Optional field
  suggestions?: string[]; // Add any other fields here
};
