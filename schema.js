const { buildSchema } = require('graphql')

module.exports.schema = buildSchema(`
    type User {
        id: Int
        firstName: String
        lastName: String
        role: String
        company: String
    }

    type Query {
        users: [User]
        user(id: Int!): User
    }
`)
