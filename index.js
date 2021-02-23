const { ApolloServer} = require('apollo-server')
const gql = require('graphql-tag');
const mongoose = require('mongoose')
const Post = require('./models/Post')
const User = require('./models/User')
const {mongoURI} = require('./config')

const typeDefs = gql`
type Post {
  id: ID!
  body: String!
  createdAt: String!
  username: String!
}
type Query{
  getPosts: [Post]
}

`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


mongoose.connect(mongoURI , {useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database")
    return server.listen({port: 5000}).then(res => console.log(`Server running at ${res.url}`));
})

