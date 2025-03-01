import React from "react";
import Image from "next/image";
import { Story } from "./stories";

interface StoryItemProps {
  story: Story;
  onClick: () => void;
}

const StoryItem = ({ story, onClick }: StoryItemProps) => {
  return (
    <div 
      data-testid="story-item" 
      className="flex flex-col items-center cursor-pointer" 
      onClick={onClick}
    >
      <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${story.viewed ? 'border-gray-300' : 'border-blue-500'}`}>
        <Image 
          src={story.logo} 
          alt={story.title} 
          width={800} 
          height={800} 
          className="w-full h-full border-2 border-white rounded-full object-cover" 
        />
      </div>
      <p className="text-sm mt-2 text-nowrap text-ellipsis line-clamp-3 w-20 text-gray-700">
        {story.title}
      </p>
    </div>
  );
};

export default StoryItem;