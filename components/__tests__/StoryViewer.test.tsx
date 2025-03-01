import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import StoryViewer from "../Main/Stories/StoryViewer";
import { Story } from "../Main/Stories/stories";
import "@testing-library/jest-dom";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("next/image", () => (props: any) => <img {...props} />);

const mockStory: Story = {
  id: 1,
  title: "Test Story",
  images: ["image1.jpg", "image2.jpg"],
  logo: "logo.jpg",
  date: "2024-02-25T12:00:00Z",
  viewed: false,
};

describe("StoryViewer Component", () => {
  let mockOnClose: jest.Mock;
  let mockOnNextStory: jest.Mock;
  let mockOnPrevStory: jest.Mock;
  let mockOnNextSlide: jest.Mock;
  let mockOnPrevSlide: jest.Mock;
  let mockOnSlideChange: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    
    mockOnClose = jest.fn();
    mockOnNextStory = jest.fn();
    mockOnPrevStory = jest.fn();
    mockOnNextSlide = jest.fn();
    mockOnPrevSlide = jest.fn();
    mockOnSlideChange = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders StoryViewer component", () => {
    render(
      <StoryViewer
        story={mockStory}
        currentSlideIndex={0}
        onClose={mockOnClose}
        onNextStory={mockOnNextStory}
        onPrevStory={mockOnPrevStory}
        onNextSlide={mockOnNextSlide}
        onPrevSlide={mockOnPrevSlide}
        onSlideChange={mockOnSlideChange}
      />
    );

    expect(screen.getByTestId("story-viewer")).toBeInTheDocument();
    expect(screen.getAllByText("Test Story")[0]).toBeInTheDocument();
    expect(screen.getAllByAltText("Test Story logo")[0]).toBeInTheDocument();
    expect(screen.getAllByAltText("Story image 0")[0]).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <StoryViewer
        story={mockStory}
        currentSlideIndex={0}
        onClose={mockOnClose}
        onNextStory={mockOnNextStory}
        onPrevStory={mockOnPrevStory}
        onNextSlide={mockOnNextSlide}
        onPrevSlide={mockOnPrevSlide}
        onSlideChange={mockOnSlideChange}
      />
    );

    fireEvent.click(screen.getByTestId("close-story"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onNextSlide when right side is clicked", () => {
    render(
      <StoryViewer
        story={mockStory}
        currentSlideIndex={0}
        onClose={mockOnClose}
        onNextStory={mockOnNextStory}
        onPrevStory={mockOnPrevStory}
        onNextSlide={mockOnNextSlide}
        onPrevSlide={mockOnPrevSlide}
        onSlideChange={mockOnSlideChange}
      />
    );

    fireEvent.click(screen.getByTestId("next-slide"));
    expect(mockOnNextSlide).toHaveBeenCalled();
  });

  it("calls onPrevSlide when left side is clicked", () => {
    render(
      <StoryViewer
        story={mockStory}
        currentSlideIndex={1}
        onClose={mockOnClose}
        onNextStory={mockOnNextStory}
        onPrevStory={mockOnPrevStory}
        onNextSlide={mockOnNextSlide}
        onPrevSlide={mockOnPrevSlide}
        onSlideChange={mockOnSlideChange}
      />
    );

    fireEvent.click(screen.getByTestId("prev-slide"));
    expect(mockOnPrevSlide).toHaveBeenCalled();
  });

  it("automatically advances slides over time", () => {
    render(
      <StoryViewer
        story={mockStory}
        currentSlideIndex={0}
        onClose={mockOnClose}
        onNextStory={mockOnNextStory}
        onPrevStory={mockOnPrevStory}
        onNextSlide={mockOnNextSlide}
        onPrevSlide={mockOnPrevSlide}
        onSlideChange={mockOnSlideChange}
      />
    );

    act(() => {
      jest.advanceTimersByTime(11000);
    });

    expect(mockOnNextSlide).toHaveBeenCalled();
  });
});