import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SinglePost from '@/app/post/[slug]/page';
import { useParams, notFound } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  notFound: jest.fn()
}));

// Mock Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props}/>
}));

describe('SinglePost', () => {
  const mockPost = {
    title: { rendered: 'Test Post' },
    content: { rendered: '<p>Test content</p>' },
    excerpt: { rendered: 'Test excerpt' },
    featured_image_src: '/test-image.jpg',
    category_name: 'Test Category',
    date: '2024-01-01',
    author: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ slug: 'test-post' });
    global.fetch = jest.fn();
  });

  it('renders loading skeleton initially', async () => {
    // Mock fetch to return a pending promise
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(() => {})
    );

    await act(async () => {
      render(<SinglePost />);
    });
    expect(screen.getByTestId('post-skeleton')).toBeInTheDocument();
  });

  it('renders post content when data is loaded', async () => {
    // Setup fetch mocks with proper response structure
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{
            ...mockPost,
            author: 1
          }])
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 1,
            full_name: 'Test Author'
          })
        })
      );

    await act(async () => {
      render(<SinglePost />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText(/by.*Test Author/)).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows 404 when post is not found', async () => {
    const mockNotFound = jest.fn();
    (notFound as unknown as jest.Mock).mockImplementation(mockNotFound as unknown as () => never);

    // Mock fetch to return empty array
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    await act(async () => {
      render(<SinglePost />);
    });

    await waitFor(() => {
      expect(mockNotFound).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});