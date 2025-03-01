"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import Image from "next/image";
import { Story } from "./stories";
import { formatDistanceToNow } from "date-fns";
import "swiper/css";

interface StoryViewerProps {
  story: Story;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  onClose: () => void;
  onNextStory: () => void;
  onPrevStory: () => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

const DURATION = 10000;

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  story, 
  currentSlideIndex,
  onSlideChange,
  onClose, 
  onNextStory, 
  onPrevStory, 
  onNextSlide, 
  onPrevSlide 
}) => {
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== currentSlideIndex) {
      swiperRef.current.slideTo(currentSlideIndex);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentSlideIndex < story.images.length - 1) {
            onNextSlide();
          } else {
            onNextStory();
          }
          return 0;
        }
        return prev + 100 / (DURATION / 100);
      });
    }, 100);
  
    return () => clearInterval(interval);
  }, [currentSlideIndex, story.images.length, onNextSlide, onNextStory]); 

  const handleSlideChange = useCallback((swiper: any) => {
    onSlideChange(swiper.activeIndex);
    setProgress(0);
  }, [onSlideChange]);
  
  return (
    <div data-testid="story-viewer" className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <button 
        data-testid="close-story" 
        className="absolute top-4 right-4 text-white text-3xl z-50"
        onClick={onClose}
      >
        ×
      </button>

      <div 
        className="absolute left-0 top-0 h-full w-1/2 cursor-pointer z-40"
        onClick={onPrevSlide}
        data-testid="prev-slide"
      />

      <div 
        className="absolute right-0 top-0 h-full w-1/2 cursor-pointer z-40"
        onClick={onNextSlide}
        data-testid="next-slide"
      />

      <div data-testid="current-slide-index" className="sr-only">
        {currentSlideIndex}
      </div>

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        modules={[A11y]}
        initialSlide={0}
        slidesPerView={1}
        grabCursor={true}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {story.images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-screen h-screen">
              <div className="absolute top-4 left-4 flex items-center space-x-2 z-50">
                <Image
                  src={story.logo}
                  alt={`${story.title} logo`}
                  width={40}
                  height={40}
                  className="w-auto h-auto rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-lg text-left text-nowrap text-ellipsis line-clamp-3 w-[300px]">{story.title}</span>
                  <span className="text-gray-400 text-xs text-left">
                    {formatDistanceToNow(new Date(story.date), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center w-screen h-screen">
                <Image 
                src={image} 
                alt={`Story image ${idx}`} 
                width={800} 
                height={800} 
                className="object-cover w-auto h-full" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-5 left-auto right-auto px-5 flex space-x-1 z-10 w-5/12">
        {story.images.map((_, idx) => (
          <div key={idx} className="flex-1 h-0.5 bg-gray-600">
            <div
              className="h-full bg-white"
              style={{
                width: idx === currentSlideIndex ? `${progress}%` : idx < currentSlideIndex ? '100%' : '0%',
                transition: "width 0.1s linear"
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryViewer;