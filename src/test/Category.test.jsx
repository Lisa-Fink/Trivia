import { describe, test, expect, vi } from "vitest";
import Category from "../Components/Category";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Category buttons test", () => {
  test("Should render 6 category buttons", () => {
    render(<Category />);
    const categoryButtons = screen.getAllByRole("button");
    expect(categoryButtons.length).toEqual(7); // 6 category buttons plus submit
  });

  test("Should highlight selected category button", () => {
    render(<Category category="Movies" />);
    const selectedButton = screen.getByText("Movies");
    const classList = Array.from(selectedButton.classList);
    expect(classList).toContain("selected-btn");
  });

  test("Should call setCategory with correct category when a category button is clicked", () => {
    const setCategoryMock = vi.fn();
    render(<Category setCategory={setCategoryMock} />);
    const geographyButton = screen.getByText("Geography");

    fireEvent.click(geographyButton);

    // Check that setCategoryMock was called with the argument corresponding to the button text
    expect(setCategoryMock).toHaveBeenCalledTimes(1);
    expect(setCategoryMock).toHaveBeenCalledWith("Geography");
  });
});

describe("Category submit test", () => {
  test("Should have submit button", () => {
    render(<Category />);
    const submitButton = screen.queryByTestId("submit-btn");
    expect(submitButton).not.toBeNull();
  });
  test("Clicking submit button with a category selected should call submit fn", () => {
    const submitCategoryMock = vi.fn();
    render(
      <Category category={"Geography"} submitCategory={submitCategoryMock} />
    );
    const submitButton = screen.getByTestId("submit-btn");
    fireEvent.click(submitButton);
    // Verify that the submitCategory function was called
    expect(submitCategoryMock).toHaveBeenCalledTimes(1);
  });
  test("Clicking submit button with no category selected should call submit fn", () => {
    const submitCategoryMock = vi.fn();
    render(<Category category={null} submitCategory={submitCategoryMock} />);
    const submitButton = screen.getByTestId("submit-btn");
    fireEvent.click(submitButton);
    // Verify that the submitCategory function was not called
    expect(submitCategoryMock).toHaveBeenCalledTimes(0);
  });
});
