const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            me: Me
        }
        type Mutation {
        
            register(
                username: String!,
                firstname: String!, 
                lastname: String!, 
                email: String!, 
                password: String!, 
                password_repeat: String!,
                userPermissions: [PermissionInput!]!
            ): Me!
            
            login (username: String!, password: String!): Me!
        }
        type Me {
            id: ID!,
            username: String!
            firstname: String!, 
            lastname: String!, 
            patronymic: String!, 
            email: String!, 
            access_token: String!,
        }
        input PermissionInput {
            entity_id: Int!,
            entity_operations: [Int!]
        }
    `
});
