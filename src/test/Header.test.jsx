import { describe, expect, test } from "vitest";
import Header from "../Components/Header";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Header test", () => {
  test("Should show title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Trivia App/)).toBeDefined();
  });

  test("Should render 'Play' and 'Instructions' links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Play/)).toBeDefined();
    expect(screen.getByText(/Instructions/)).toBeDefined();
  });
});

describe("Header Navigation test", () => {
  test("Should navigate to 'Play' page when 'Play' link is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Find the 'Play' link using the link text
    const playLink = screen.getByText(/Play/);
    // Check the link address
    expect(playLink.getAttribute("href")).toBe("/play");
  });
  test("Should navigate to 'Instructions' page when 'Instructions' link is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Find the 'Instructions' link using the link text
    const instructionsLink = screen.getByText(/Instructions/);
    // Check the link address
    expect(instructionsLink.getAttribute("href")).toBe("/instructions");
  });
});
