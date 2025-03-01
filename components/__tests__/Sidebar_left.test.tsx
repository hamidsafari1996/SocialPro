import { render, screen } from "@testing-library/react";
import Sidebar_left from "../../components/Main/sidebar-left";

describe("Sidebar_left Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sidebar and checks if menu items exist when open", () => {
    const { container } = render(<Sidebar_left isOpen={true} />);
    
    expect(container.querySelector('[role="navigation"]')).toBeInTheDocument();

    const menuItems = ["Feed", "Connections", "Latest News", "Events", "Groups", "Notifications", "Settings", "Video"];

    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("sidebar should not display menu text when closed", () => {
    render(<Sidebar_left isOpen={false} />);

    const menuItems = ["Feed", "Connections", "Latest News", "Events", "Groups", "Notifications", "Settings", "Video"];

    menuItems.forEach((item) => {
        const element = screen.getByText(item);
        expect(element).toHaveClass("opacity-0");
    });
  });
});