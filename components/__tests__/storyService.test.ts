import { fetchStories } from "../Main/Stories/storyService";

global.fetch = jest.fn();

describe("fetchStories", () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        jest.clearAllMocks();
    });

  it("fetches and formats stories correctly", async () => {
    const mockApiResponse = [
      {
        id: "1",
        title: { rendered: "Story 1" },
        gallery_images: { 0: "/image1.jpg", 1: "/image2.jpg" },
        featured_image_src: "/logo1.jpg",
        date: "2024-02-25T12:00:00",
      },
      {
        id: "2",
        title: { rendered: "Story 2" },
        gallery_images: { 0: "/image3.jpg" },
        featured_image_src: "/logo2.jpg",
        date: "2024-02-25T14:00:00",
      },
    ];

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockApiResponse),
    } as unknown as Response);

    const stories = await fetchStories();

    expect(fetch).toHaveBeenCalledWith(
      "http://nextproject.local/wp-json/wp/v2/story"
    );
    expect(stories).toEqual([
      {
        id: "1",
        title: "Story 1",
        images: ["/image1.jpg", "/image2.jpg"],
        logo: "/logo1.jpg",
        date: "2024-02-25T12:00:00",
        viewed: false,
      },
      {
        id: "2",
        title: "Story 2",
        images: ["/image3.jpg"],
        logo: "/logo2.jpg",
        date: "2024-02-25T14:00:00",
        viewed: false,
      },
    ]);
  });

  it("returns an empty array if fetch fails", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(
      new Error("Network error")
    );

    const stories = await fetchStories();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(stories).toEqual([]);
  });
});