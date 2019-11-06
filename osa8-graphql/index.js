const { ApolloServer, UserInputError, gql } = require("apollo-server");
const uuid = require("uuid/v1");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");

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

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "world3324324";
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({});
    },
    allAuthors: () => {
      return Author.find({});
    }
  },

  Book: {
    author: root => {
      return {
        name: root.name,
        born: root.born,
        id: root.id
      };
    }
  },

  Author: {
    bookCount: root => {
      return books.filter(book => book.author === root.name).length;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres
      });
      const author = await Author.findOne({ name: args.author });
      if (!author) {
        const author = new Author({
          name: args.author
        });

        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.name = args.name;
        author.setBornTo = args.setBornTo;
        return author.save();
      } else {
        return null;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
