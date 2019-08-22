const users = require('./user');
const { mergeSchemas } = require('graphql-tools');

const MergeSchema = mergeSchemas({
    schemas: [
        users
    ],
});

export default MergeSchema;
