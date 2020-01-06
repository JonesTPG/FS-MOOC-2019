/* eslint-disable indent */
import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_NEW":
      return state.concat(action.data);
    case "LIKE": {
      const id = action.data;
      const likedBlog = state.find(blog => blog.id === id);
      const changedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      };

      return state.map(note => (note.id !== id ? note : changedBlog));
    }
    case "DELETE":
      return state.filter(blog => blog.id !== action.data);
    default:
      return state;
  }
};

export const addBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: "ADD_NEW",
      data: newBlog
    });
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch({
      type: "DELETE",
      data: id
    });
  };
};

export const likeBlog = id => {
  return async dispatch => {
    await blogService.like(id);
    dispatch({
      type: "LIKE",
      data: id
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export default reducer;
