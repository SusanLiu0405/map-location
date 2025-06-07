const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/us-options', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
const stateSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
});
const State = mongoose.model('State', stateSchema);

// GraphQL type definitions
const typeDefs = `
  type State {
    name: String
    lat: Float
    lng: Float
  }

  type Query {
    states(filter: String): [State!]!
  }
`;

// Resolver
const resolvers = {
  Query: {
    states: async (_, { filter }) => {
      const query = filter
        ? { name: { $regex: filter, $options: 'i' } }
        : {};
      return State.find(query).select('name lat lng');
    },
  },
};



// Start Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();

  // Enable CORS
  app.use(cors());
  app.use(express.json());


  // Visit localhost:4000/ to test CORS
  app.get('/', (req, res) => {
    res.send('Welcome to the GraphQL API. Please use /graphql endpoint to make queries.');
  });

  app.use('/graphql', expressMiddleware(server));

  app.listen(4000, () => {
    console.log(' Server started on http://localhost:4000/graphql');
  });
}

startServer();