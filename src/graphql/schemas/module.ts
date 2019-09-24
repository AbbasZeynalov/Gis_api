import { makeExecutableSchema } from 'graphql-tools';

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            modules: [Module]
        }
        type Module {
            id: ID!,
            url: String!,
            name: String!
        }
    `
});
