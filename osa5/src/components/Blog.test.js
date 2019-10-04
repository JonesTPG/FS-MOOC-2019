import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

describe("SimpleBlog />", () => {
  let component;

  const blog = {
    author: "Joonas Ryynänen",
    title: "Hieno blogi",
    url: "https://imba.fi",
    likes: 18,
    user: {
      name: "Joonas",
      id: 1
    }
  };

  const user = {
    id: 1
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} loggedInUser={user.id}></Blog>);
  });

  test("renders title and author", () => {
    expect(component.container).toHaveTextContent("Hieno blogi");
    expect(component.container).toHaveTextContent("Joonas Ryynänen");
  });

  test("button triggers the function", () => {
    const button = component.container.querySelector(".toggle");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("https://imba.fi");
    expect(component.container).toHaveTextContent("18");
    expect(component.container).toHaveTextContent("Joonas");
  });
});
