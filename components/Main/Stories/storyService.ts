// services/storyService.ts
import { Story } from "./stories";

export const fetchStories = async (): Promise<Story[]> => {
  try {
    const response = await fetch('http://nextproject.local/wp-json/wp/v2/story');
    const data = await response.json();
    const formattedStories: Story[] = data.map((story: any) => ({
      id: story.id,
      title: story.title.rendered,
      images: Object.values(story.gallery_images || {}),
      logo: story.featured_image_src,
      date: story.date,
      viewed: false,
    }));
    return formattedStories;
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
};