// Import necessary React and component dependencies
import React from "react";
import Story from "../components/Main/story";      // Story component for displaying stories
import Post from "../components/Main/box-shop";    // Post component for displaying shop items

// Home component: Main landing page of the application
export default function Home() {
  return (
    // Container div with flex layout, items start from the top
    <div className="flex justify-start flex-col">
      {/* Story component for displaying user stories/highlights */}
      <Story />
      
      {/* Post component for displaying shop items/posts */}
      <Post/>
    </div>
  );
}
