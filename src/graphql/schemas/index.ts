const users = require('./user');
const modules = require('./module');
const { mergeSchemas } = require('graphql-tools');

const MergeSchema = mergeSchemas({
    schemas: [
        users,
        modules
    ],
});

export default MergeSchema;
