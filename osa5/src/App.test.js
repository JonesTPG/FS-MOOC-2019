import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user logged, only login page is showed", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login to the application"));
    // expectations here
    expect(component.container).toHaveTextContent("username");
  });

  test("renders all blogs it gets from backend", async () => {
    const user = {
      username: "joonas",
      token: "abcdefg",
      name: "Joonas Ryynänen"
    };

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector(".blog-list"));
    component.debug();
    const blogs = component.container.querySelectorAll(".single-blog");
    expect(blogs.length).toBe(3);

    expect(component.container).toHaveTextContent("Hieno blogi");
    expect(component.container).toHaveTextContent("Joonas Ryynänen");
    expect(component.container).toHaveTextContent("Maren blogi");
    expect(component.container).toHaveTextContent("Mare Leppänen");
    expect(component.container).toHaveTextContent("allun blogi");
    expect(component.container).toHaveTextContent("Aleksi Peltola");
  });
});
