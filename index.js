const { ApolloServer , PubSub} = require('apollo-server')
const mongoose = require('mongoose')
const Post = require('./models/Post')
const User = require('./models/User')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const {mongoURI} = require('./config')


const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req} ) => ({req , pubsub})
});


mongoose.connect(mongoURI , {useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database")
    return server.listen({port: 5000}).then(res => console.log(`Server running at ${res.url}`));
})

