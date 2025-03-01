import { render, screen, waitFor } from "@testing-library/react";
import Post from "@/components/Main/box-shop";
import BlogSkeleton from "@/components/Placeholders/BlogSkeleton";
import fetchMock from "jest-fetch-mock";

describe("Post component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders BlogSkeleton while loading", () => {
    fetchMock.mockResponseOnce(() => new Promise(() => {})); // Simulating a pending request
    render(<Post />);
    expect(screen.getByTestId("skeleton")).toBeDefined(); // Verify BlogSkeleton is displayed
  });

  it("renders posts after fetching data", async () => {
    const mockPosts = [
      {
        id: 1,
        title: { rendered: "Test Post" },
        excerpt: { rendered: "This is a test excerpt" },
        slug: "test-post",
        subtitle: "Test subtitle",
        featured_image_src: "/test-image.jpg",
        post_logo: "/test-logo.jpg",
        category_name: "Tech",
        author_avatar: "/avatar.jpg",
        author_name: "John Doe",
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockPosts));
  
    render(<Post />);
    await waitFor(() =>
      expect(screen.getByText("Test Post")).toBeDefined()
    );
    expect(screen.getByText("This is a test excerpt")).toBeDefined();
    const images = screen.getAllByAltText("Test Post");
    expect(images.length).toBe(2);

  });

  it("handles fetch errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));
    
    render(<Post />);
    
    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalled());
    
    consoleErrorSpy.mockRestore();
  });  
});