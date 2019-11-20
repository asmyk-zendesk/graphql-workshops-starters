const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
  }
  
  type User{
    name: String
  }
`;

module.exports = typeDefs;
