import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SimpleBlog from "./SimpleBlog";

describe("SimpleBlog />", () => {
  let component;

  let blog = {
    title: "Testi",
    author: "Joonas",
    likes: 10
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}></SimpleBlog>
    );
  });

  test("renders title", () => {
    expect(component.container).toHaveTextContent("Testi");
  });

  test("renders author", () => {
    expect(component.container).toHaveTextContent("Joonas");
  });

  test("renders likes", () => {
    expect(component.container).toHaveTextContent("10");
  });

  test("button triggers the function", () => {
    const button = component.container.querySelector(".button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
