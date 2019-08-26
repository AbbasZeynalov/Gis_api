const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            me: Me
        }
        type Mutation {
        
            register(
                user_name: String!,
                first_name: String!, 
                last_name: String!, 
                email: String!, 
                password: String!, 
                password_repeat: String!,
                userPermissions: [PermissionInput!]
            ): Me!
            
            login (user_name: String!, password: String!): Me!
        }
        type Me {
            id: ID!,
            first_name: String!, 
            last_name: String!, 
            email: String!, 
            access_token: String!
        }
        input PermissionInput {
            entity_id: Int!,
            entity_operations: [Int!]
        }
    `
});
