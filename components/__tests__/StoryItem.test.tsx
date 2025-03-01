import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryItem from "../Main/Stories/StoryItem";
import { Story } from "../Main/Stories/stories";

const mockStory: Story = {
    id: 1,
    title: "Test Story",
    logo: "/test-logo.jpg",
    images: ["/test-image1.jpg", "/test-image2.jpg"],
    viewed: false,
    date: "2024-01-01"
};

describe("StoryItem Component", () => {
  it("renders story item with correct title and image", () => {
    render(<StoryItem story={mockStory} onClick={jest.fn()} />);

    expect(screen.getByText("Test Story")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/test-logo.jpg");
  });

  it("applies correct border color when story is viewed", () => {
    const viewedStory = { ...mockStory, viewed: true };
    render(<StoryItem story={viewedStory} onClick={jest.fn()} />);

    const storyItem = screen.getByTestId("story-item").firstChild;
    expect(storyItem).toHaveClass("border-gray-300");
  });

  it("applies correct border color when story is not viewed", () => {
    render(<StoryItem story={mockStory} onClick={jest.fn()} />);

    const storyItem = screen.getByTestId("story-item").firstChild;
    expect(storyItem).toHaveClass("border-blue-500");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<StoryItem story={mockStory} onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("story-item"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});