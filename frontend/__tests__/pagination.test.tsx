import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "@/components/ui/Pagination";

describe("Pagination", () => {
  it("calls onChange with next page", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Pagination page={1} totalPages={3} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
