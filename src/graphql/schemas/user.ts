const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            me: Me
        }
        type Mutation {
        
            register(
                first_name: String!, 
                last_name: String!, 
                email: String!, 
                password: String!, 
                password_repeat: String!,
                role: [Int!]
            ): Me!
            
            login (email: String!, password: String!): Me!
        }
        type Me {
            id: ID!,
            first_name: String!, 
            last_name: String!, 
            email: String!, 
            access_token: String!
        }
    `
});
