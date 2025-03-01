// components/StoryBar.tsx
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, A11y, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useStories } from "./Stories/useStories";
import StoryItem from "./Stories/StoryItem";
import StoryViewer from "./Stories/StoryViewer";
import StoriesSkeleton from "../Placeholders/StorySkeleton";
import { Story } from "./Stories/stories";

const StoryBar: React.FC = () => {
  const { stories, loading } = useStories();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const openStory = (index: number) => {
    setSelectedStoryIndex(index);
    setCurrentSlideIndex(0);
    setProgress(0);
  };

  const closeStory = () => {
    setSelectedStoryIndex(null);
    setCurrentSlideIndex(0);
    setProgress(0);
  };
  

  const handleNextSlide = useCallback(() => {
    if (selectedStoryIndex === null) return;

    const currentStory = stories[selectedStoryIndex];
    const isLastSlide = currentSlideIndex === currentStory.images.length - 1;

    if (isLastSlide) {
      if (selectedStoryIndex < stories.length - 1) {
        setSelectedStoryIndex(selectedStoryIndex + 1);
        setCurrentSlideIndex(0);
      } else {
        closeStory();
      }
    } else {
      setCurrentSlideIndex(prev => prev + 1);
    }
    setProgress(0);
  }, [selectedStoryIndex, currentSlideIndex, stories, closeStory]);

  useEffect(() => {
    if (selectedStoryIndex !== null && swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [selectedStoryIndex]);

  const handlePrevSlide = useCallback(() => {
    if (selectedStoryIndex === null) return;

    if (currentSlideIndex === 0) {
      if (selectedStoryIndex > 0) {
        const prevStory = stories[selectedStoryIndex - 1];
        setSelectedStoryIndex(selectedStoryIndex - 1);
        setCurrentSlideIndex(prevStory.images.length - 1);
      } else {
        // If we're at the first story, go to the last story's last slide
        const lastStory = stories[stories.length - 1];
        setSelectedStoryIndex(stories.length - 1);
        setCurrentSlideIndex(lastStory.images.length - 1);
      }
    } else {
      setCurrentSlideIndex(prev => prev - 1);
    }
    setProgress(0);
  }, [selectedStoryIndex, currentSlideIndex, stories]);
  
  const handlePrevStory = useCallback(() => {
    if (selectedStoryIndex === 0) {
      setSelectedStoryIndex(stories.length - 1);
      const lastStory = stories[stories.length - 1];
      setCurrentSlideIndex(lastStory.images.length - 1);
    } else {
      setSelectedStoryIndex(prev => {
        const nextIndex = prev !== null ? prev - 1 : null;
        if (nextIndex !== null) {
          const prevStory = stories[nextIndex];
          setCurrentSlideIndex(prevStory.images.length - 1);
        }
        return nextIndex;
      });
    }
    setProgress(0);
  }, [selectedStoryIndex, stories]);

  const handleNextStory = useCallback(() => {
    setSelectedStoryIndex((prevIndex) => {
      if (prevIndex === null || prevIndex === stories.length - 1) {
        return null; // Close story if it's the last one
      }
      return prevIndex + 1;
    });
    setCurrentSlideIndex(0);
    setProgress(0);
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(0); // Go to the first slide of the next story
      }
    }, 100); // Add a slight delay
  }, [stories.length]);
  


  if (loading) {
    return <StoriesSkeleton />;
  }

  return (
    <div className="w-full relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={7}
        navigation={{
          prevEl: '.swiper-button-storie-prev',
          nextEl: '.swiper-button-storie-next',
        }}
        breakpoints={{
          320: { slidesPerView: 4, spaceBetween: 0 },
          480: { slidesPerView: 4, spaceBetween: 0 },
          768: { slidesPerView: 5, spaceBetween: 0 },
          1024: { slidesPerView: 7, spaceBetween: 0 },
        }}
        modules={[Navigation, A11y, EffectCube]}
        className="w-full h-full"
      >
        {stories.map((story, index) => (
          <SwiperSlide key={story.id}>
            <StoryItem story={story} onClick={() => setSelectedStoryIndex(index)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-storie-prev bg-white p-1.5 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div className="swiper-button-storie-next bg-white p-1.5 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      {selectedStoryIndex !== null && (
        <StoryViewer 
          story={stories[selectedStoryIndex]} 
          currentSlideIndex={currentSlideIndex}
          onSlideChange={(index) => {
            setCurrentSlideIndex(index);
            setProgress(0);
          }}
          onClose={closeStory}
          onNextStory={handleNextStory}
          onPrevStory={handlePrevStory}
          onNextSlide={handleNextSlide}
          onPrevSlide={handlePrevSlide}
        />
      )}
    </div>
  );
};

export default StoryBar;