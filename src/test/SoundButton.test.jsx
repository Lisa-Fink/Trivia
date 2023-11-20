import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SoundButton from "../Components/SoundButton";

describe("Button with children is rendered", () => {
  test("Should be rendered", () => {
    render(<SoundButton />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeNull();
  });
  test("Should render children", () => {
    render(
      <SoundButton>
        <span>Test Content</span>
      </SoundButton>
    );
    const child = screen.getByText("Test Content");
    expect(child).not.toBeNull();
  });
});

describe("Button gets all props", () => {
  beforeEach(() => {
    const mockClassName = "class";
    const mockDisabled = true;
    const mockTestID = "testID";
    render(
      <SoundButton
        className={mockClassName}
        disabled={mockDisabled}
        testID={mockTestID}
      />
    );
  });
  test("Applies className prop", () => {
    const button = screen.queryByRole("button");
    expect(button.className).toBe("class");
  });
  test("Applies disabled prop", () => {
    const button = screen.queryByRole("button");
    expect(button.disabled).toBeTruthy();
  });
  test("Applies data-testid prop", () => {
    const button = screen.queryByTestId("testID");
    expect(button).not.toBeNull();
  });
});
