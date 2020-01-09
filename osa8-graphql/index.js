const { ApolloServer, UserInputError, gql, PubSub } = require("apollo-server");
const uuid = require("uuid/v1");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const config = require("./utils/config");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    booksByGenre(genre: String!): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "world";
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({});
    },
    booksByGenre: (root, args) => {
      if (args.genre === "") {
        return Book.find({});
      }
      return Book.find({ genres: args.genre });
    },
    allAuthors: () => {
      return Author.find({});
    },
    allGenres: async () => {
      const books = await Book.find({});
      let allGenres = [];
      books.map(book => {
        let genres = book.genres;
        if (genres != null && genres.length != 0) {
          genres.map(genre => {
            if (!allGenres.includes(genre)) {
              allGenres.push(genre);
            }
          });
        }
      });
      return allGenres;
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },

  Book: {
    author: async root => {
      let author = await Author.findById(root.author);
      return {
        name: author.name,
        born: author.born,
        id: author._id
      };
    }
  },

  Author: {
    bookCount: async root => {
      let bookCount = await Book.countDocuments({ author: root._id });
      return bookCount;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres
      });
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author
        });

        try {
          author = await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }

      book.author = author._id;

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.name = args.name;
        author.born = args.setBornTo;
        return author.save();
      } else {
        return null;
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
