import { useState, useEffect } from "react";
import { Story } from "./stories";
import { fetchStories } from "./storyService";

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStories = async () => {
      const data = await fetchStories();
      setStories(data);
      setLoading(false);
    };

    getStories();
  }, []);

  return { stories, loading };
};