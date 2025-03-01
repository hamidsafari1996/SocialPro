import '@testing-library/jest-dom';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Fix the Image component mock to properly handle boolean attributes
jest.mock('next/image', () => {
  const React = require('react');
  
  // Create a proper React component for the mock
  const MockNextImage = function(props) {
    // Extract the boolean props so they don't get passed to the DOM
    const { fill, priority, sizes, ...restProps } = props;
    
    // Create a new props object with only valid HTML attributes
    return React.createElement('img', {
      ...restProps,
      // Convert boolean props to data attributes for testing
      'data-testid': 'next-image',
      'data-fill': fill ? 'true' : undefined,
      'data-priority': priority ? 'true' : undefined,
      'data-sizes': sizes || undefined,
    });
  };
  
  return {
    __esModule: true,
    default: MockNextImage
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  notFound: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }))
}));

// Mock Swiper modules
jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  A11y: jest.fn(),
  EffectCube: jest.fn(),
}));

// Mock Swiper CSS imports
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));