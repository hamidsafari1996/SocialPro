import { renderHook, act, waitFor } from "@testing-library/react";
import { useStories } from "../Main/Stories/useStories";
import { fetchStories } from "../Main/Stories/storyService";

jest.mock("../Main/Stories/storyService", () => ({
  fetchStories: jest.fn(),
}));

describe("useStories hook", () => {
  it("should fetch and update stories", async () => {
    const mockStories = [
      { 
        id: '1',
        title: "Story 1",
        images: ["/image1.jpg"],
        logo: "/logo1.jpg",
        date: new Date().toISOString()
      },
      { 
        id: '2',
        title: "Story 2",
        images: ["/image2.jpg"],
        logo: "/logo2.jpg",
        date: new Date().toISOString()
      }
    ];

    (fetchStories as jest.Mock).mockResolvedValueOnce(mockStories);

    const { result } = renderHook(() => useStories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.stories).toEqual(mockStories);
      expect(result.current.loading).toBe(false);
    });
  });
});