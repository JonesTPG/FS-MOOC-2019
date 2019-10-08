const blogs = [
  {
    author: "Joonas Ryynänen",
    title: "Hieno blogi",
    url: "https://imba.fi",
    likes: 18,
    user: {
      name: "Joonas",
      id: 1
    }
  },
  {
    author: "Mare Leppänen",
    title: "Maren blogi",
    url: "https://mare.fi",
    likes: 23,
    user: {
      name: "Markku",
      id: 2
    }
  },
  {
    author: "Aleksi Peltola",
    title: "allun blogi",
    url: "https://allu.fi",
    likes: 18,
    user: {
      name: "Allu",
      id: 3
    }
  }
];

let token;

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export default { getAll, setToken };
