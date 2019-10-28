import { makeExecutableSchema } from 'graphql-tools';

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            modules(offset: Int, limit: Int): Modules
            synchronizeModules: Success
        }
        
        type Modules {
            items: [Module],
            totalCount: Int
        }
        
        type Mutation {
            activateModule(id: ID!): Success
        }
        
        type Module {
            id: ID!,
            name: String!
            uuid: String!,
            git_deploy_token_username: String!,
            git_deploy_token_password: String!,
            url: String!,
            total: Int!,
            version: [ModuleVersion]
        }
        
        type ModuleVersion {
            version: String!
        }
        
        type Success {
            success: Boolean!
        }
    `
});
