"use client";


import React, { useRef, useEffect, useState, useCallback } from "react";
import { Navigation, A11y, EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperClass } from 'swiper'; // Import SwiperClass
import { formatDistanceToNow } from 'date-fns';

interface Story {
  date: string | number | Date;
  id: number;
  title: string;
  images: string[];
  logo: string;
  viewed: boolean;
}

const StoryBar: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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


  const DURATION = 10000; // 10 seconds

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://nextproject.local/wp-json/wp/v2/story');
        const data = await response.json();
        const formattedStories = data.map((story: any) => ({
          id: story.id,
          title: story.title.rendered,
          images: Object.values(story.gallery_images || {}),
          logo: story.featured_image_src,
          date: story.date,  // دریافت تاریخ انتشار
          viewed: false,
        }));
        setStories(formattedStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);


  const handleNextSlide = useCallback(() => {
    if (selectedStoryIndex === null || !swiperRef.current) return;

    const story = stories[selectedStoryIndex];
    const isLastSlide = currentSlideIndex === story.images.length - 1;

    console.log("Current Story Index:", selectedStoryIndex);
    console.log("Current Slide Index:", currentSlideIndex);
    console.log("Is Last Slide:", isLastSlide);

    if (isLastSlide) {
      const isLastStory = selectedStoryIndex === stories.length - 1;
      console.log("Is Last Story:", isLastStory);

      if (isLastStory) {
        console.log("Closing story viewer");
        closeStory(); // Close the story viewer
      } else {
        console.log("Moving to next story");

        // اضافه کردن پرچم برای جلوگیری از اجرای دوباره
        if (!swiperRef.current.animating) {
          setSelectedStoryIndex(prevIndex => (prevIndex !== null ? prevIndex + 1 : null));
          setCurrentSlideIndex(0); // Move to the first slide of the next story
          swiperRef.current.slideTo(0); // Go to the first slide of the next story
        }
      }
    } else {
      console.log("Moving to next slide");
      swiperRef.current.slideNext(); // Move to the next slide
    }

    setProgress(0); // Reset the progress bar for the new slide
  }, [selectedStoryIndex, currentSlideIndex, stories]);

  // استفاده از useEffect برای نظارت بر تغییر selectedStoryIndex
  useEffect(() => {
    if (selectedStoryIndex !== null && swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [selectedStoryIndex]);


  const handlePrevSlide = useCallback(() => {
    if (selectedStoryIndex === null || !swiperRef.current) return;

    if (currentSlideIndex === 0) {
      handlePrevStory();
    } else {
      swiperRef.current.slidePrev();
      setProgress(0);
    }
  }, [selectedStoryIndex, currentSlideIndex]);

  const handlePrevStory = useCallback(() => {
    if (selectedStoryIndex === 0) {
      // If it's the first story, you can either close it or loop to the last story
      // closeStory();
      setSelectedStoryIndex(stories.length - 1);
    } else {
      setSelectedStoryIndex((prevIndex) => {
        const nextIndex = prevIndex !== null ? prevIndex - 1 : null;
        if (nextIndex !== null) {
          const prevStory = stories[nextIndex];
          setCurrentSlideIndex(prevStory.images.length - 1);
          setProgress(0);
          if (swiperRef.current) {
            setTimeout(() => {
              swiperRef.current?.slideTo(prevStory.images.length - 1);
            }, 0);
          }
        }
        return nextIndex;
      });
    }
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


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (selectedStoryIndex !== null) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextSlide();
            return 0;
          }
          return prev + (100 / (DURATION / 100));
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [selectedStoryIndex, currentSlideIndex, handleNextSlide]);

  return (

    <div className="w-full relative">
      <div className="swiper-button-storie-prev bg-white p-1.5 rounded-full absolute transform -translate-y-1/2 z-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div className="swiper-button-storie-next bg-white p-1.5 rounded-full absolute transform -translate-y-1/2 z-10 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={7}
        navigation={{
          prevEl: '.swiper-button-storie-prev',
          nextEl: '.swiper-button-storie-next',
        }}
        modules={[Navigation, A11y, EffectCube]}
        className="w-full h-full"
      >
        {stories.map((story, index) => (
          <SwiperSlide key={story.id}>
            <div className="flex flex-col items-center" onClick={() => openStory(index)}>
              <div className={`w-20 h-20 rounded-full overflow-hidden cursor-pointer border-2 ${story.viewed ? 'border-gray-300' : 'border-blue-500'}`}>
                <img src={story.logo} alt={story.title} className="w-full h-full border-2 border-white border-solid rounded-full object-cover" />
              </div>
              <p className="text-sm mt-2 text-nowrap text-ellipsis line-clamp-3 w-20 text-gray-700">
                <span className="whitespace-nowrap">{story.title}</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedStoryIndex !== null && (

        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="absolute left-0 top-0 h-full w-1/2 cursor-pointer z-40"
              onClick={handlePrevSlide}
            />
            <div
              className="absolute right-0 top-0 h-full w-1/2 cursor-pointer z-40"
              onClick={handleNextSlide}
            />

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                console.log("Swiper initialized:", swiper);
              }}
              modules={[A11y]}
              initialSlide={currentSlideIndex}
              slidesPerView={1} // فقط یک اسلاید در هر بار نمایش داده شود
              grabCursor={true}
              onSlideChange={(swiper) => {
                console.log("Slide changed to:", swiper.activeIndex);
                setCurrentSlideIndex(swiper.activeIndex);
                setProgress(0); // Reset progress when slide changes
              }}
              className="w-full h-full"
            >
              {stories[selectedStoryIndex]?.images.map((image: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-screen h-screen">
                    {/* آیکون و نام کاربر */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2 z-50">
                      <img
                        src={stories[selectedStoryIndex]?.logo} // استفاده از story.logo
                        alt={`${stories[selectedStoryIndex]?.title} logo`} // استفاده از story.title
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col justify-start">
                        <span className="text-white font-semibold text-lg text-left">
                          {stories[selectedStoryIndex]?.title}
                        </span>
                        <span className="text-gray-400 text-xs text-left">
                          {formatDistanceToNow(new Date(stories[selectedStoryIndex]?.date), { addSuffix: true })}
                        </span>
                      </div>

                    </div>
                    <div className="flex items-center justify-center w-screen h-screen">
                      <img src={image} alt={`Story ${idx}`} className="h-full object-cover" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Timeline Bars */}
            <div className="absolute top-5 left-auto right-auto px-5 flex space-x-1 z-10 w-5/12">
              {stories[selectedStoryIndex].images.map((image: string, idx: number) => (
                <div key={idx} className="flex-1 h-0.5 bg-gray-600">
                  <div
                    className="h-full bg-white"
                    style={{
                      width: idx === currentSlideIndex ? `${progress}%` : idx < currentSlideIndex ? '100%' : '0%',
                      transition: 'width 0.1s linear',
                    }}
                  />
                </div>
              ))}
            </div>
            {/* ... (rest of the JSX remains the same) */}
            <button onClick={closeStory} className="absolute top-4 right-4 text-white text-3xl z-50">&times;</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBar;