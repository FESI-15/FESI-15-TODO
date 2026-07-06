import { render } from "@/test/test-utils";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the page shell", () => {
    const { container } = render(<Home />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
