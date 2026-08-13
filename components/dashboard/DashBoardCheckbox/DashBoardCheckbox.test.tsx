import { fireEvent, render, screen } from "@testing-library/react";

import DashboardCheckbox from "./DashBoardCheckbox";

const mutate = jest.fn();

jest.mock("@/hooks/queries/todos/todos.bff.hook", () => ({
  usePatchTodo: () => ({ mutate }),
}));

jest.mock("@/components/common/CheckboxBasic", () => {
  return function MockCheckboxBasic({
    onCheckedChange,
  }: {
    onCheckedChange?: (checked: boolean) => void;
  }) {
    return (
      <button type="button" onClick={() => onCheckedChange?.(true)}>
        checkbox
      </button>
    );
  };
});

describe("DashboardCheckbox", () => {
  beforeEach(() => {
    mutate.mockReset();
    mutate.mockImplementation((_variables, options) => {
      options?.onSuccess?.();
    });
  });

  it("does not throw when checked without an external checked-change callback", () => {
    render(<DashboardCheckbox taskId={1} />);

    expect(() => fireEvent.click(screen.getByText("checkbox"))).not.toThrow();
  });
});
