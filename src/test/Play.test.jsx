import { describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Play from "../Components/Play";

describe("Play component", () => {
  test('Renders the Category component when gameState is "category"', () => {
    render(<Play gameState="category" />);
    expect(screen.queryByTestId("category-component")).not.toBeNull();
  });

  test('Renders the Question component when gameState is "question"', () => {
    render(<Play gameState="question" />);
    expect(screen.queryByTestId("question-component")).not.toBeNull();
  });

  test("Renders the Start component when gameState is start", () => {
    render(<Play gameState="start" />);
    expect(screen.queryByTestId("start-component")).not.toBeNull();
  });

  test("Renders the Modal component when showConfirm is true", () => {
    render(<Play showConfirm={true} />);
    expect(screen.queryByTestId("modal-component")).not.toBeNull();
  });

  test("Doesn't render the Modal component when showConfirm is false", () => {
    render(<Play showConfirm={false} />);
    expect(screen.queryByTestId("modal-component")).toBeNull();
  });

  test("Always renders Menu component with any game state", () => {
    render(<Play gameState="category" />);
    expect(screen.queryByTestId("menu-component")).not.toBeNull();
    cleanup();
    render(<Play gameState="question" />);
    expect(screen.queryByTestId("menu-component")).not.toBeNull();
    cleanup();
    render(<Play gameState="start" />);
    expect(screen.queryByTestId("menu-component")).not.toBeNull();
    cleanup();
    render(<Play gameState="any" />);
    expect(screen.queryByTestId("menu-component")).not.toBeNull();
  });
});
