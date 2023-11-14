import { describe, expect, test } from "vitest";
import Instructions from "../Components/Instructions";
import { render, screen } from "@testing-library/react";

describe("Instructions test", () => {
  test("Should show title", () => {
    render(<Instructions />);
    expect(screen.getByText(/Instructions/)).toBeDefined();
  });
});
