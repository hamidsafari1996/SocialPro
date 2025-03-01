import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryBar from '../Main/story';
import { useStories } from '../Main/Stories/useStories';

// Mock the Swiper components and modules
jest.mock('swiper/react', () => ({
  Swiper: ({ children, onSwiper }: any) => {
    // Simulate the swiper initialization
    if (onSwiper) {
      onSwiper({ slideTo: jest.fn() });
    }
    return <div data-testid="swiper">{children}</div>;
  },
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock the useStories hook
jest.mock('../Main/Stories/useStories', () => ({
  useStories: jest.fn(),
}));

// Update mock stories data with valid dates and all required fields
const mockStories = [
  {
    id: '1',
    username: 'user1',
    profileImage: '/profile1.jpg',
    images: ['/image1.jpg', '/image2.jpg'],
    timestamp: new Date().toISOString(),
    title: 'Story 1',
    logo: '/logo1.jpg',
    date: new Date().toISOString(), // Add valid date
  },
  {
    id: '2',
    username: 'user2',
    profileImage: '/profile2.jpg',
    images: ['/image3.jpg'],
    timestamp: new Date().toISOString(),
    title: 'Story 2',
    logo: '/logo2.jpg',
    date: new Date().toISOString(), // Add valid date
  },
];

// Mock date-fns to avoid time-related issues in tests
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => '5 minutes ago'),
}));

describe('StoryBar Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementation for useStories
    (useStories as jest.Mock).mockReturnValue({
      stories: mockStories,
      loading: false,
    });
  });

  it('renders loading skeleton when loading', () => {
    (useStories as jest.Mock).mockReturnValue({
      stories: [],
      loading: true,
    });

    render(<StoryBar />);
    expect(screen.getByTestId('story-skeleton')).toBeInTheDocument();
  });

  it('renders stories when loaded', () => {
    render(<StoryBar />);
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(mockStories.length);
  });

  it('opens story viewer when clicking on a story', () => {
    render(<StoryBar />);
    const storyItems = screen.getAllByTestId('story-item');
    fireEvent.click(storyItems[0]);
    
    expect(screen.getByTestId('story-viewer')).toBeInTheDocument();
  });

  it('closes story viewer when calling close function', () => {
    render(<StoryBar />);
    
    // Open story viewer
    const storyItems = screen.getAllByTestId('story-item');
    fireEvent.click(storyItems[0]);
    
    // Close story viewer
    const closeButton = screen.getByTestId('close-story');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('story-viewer')).not.toBeInTheDocument();
  });

  it('navigates to next slide within the same story', async () => {
    render(<StoryBar />);
    
    // Open first story
    const storyItems = screen.getAllByTestId('story-item');
    fireEvent.click(storyItems[0]);
    
    // Click next
    const nextButton = screen.getByTestId('next-slide');
    fireEvent.click(nextButton);
    
    // Check if we're on the second slide of the first story
    const currentSlide = screen.getByTestId('current-slide-index');
    expect(currentSlide).toHaveTextContent('1');
  });

  it('navigates to next story when reaching the end of current story', async () => {
    render(<StoryBar />);
    
    // Open first story
    const storyItems = screen.getAllByTestId('story-item');
    fireEvent.click(storyItems[0]);
    
    // Navigate through all slides of first story
    const nextButton = screen.getByTestId('next-slide');
    mockStories[0].images.forEach(() => {
      fireEvent.click(nextButton);
    });
    
  });
}); 