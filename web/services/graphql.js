import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

export { client }
