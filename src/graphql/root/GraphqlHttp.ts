import { Request, Response } from "express";
import { GraphQLError } from "graphql";
import * as graphqlHTTP from "express-graphql";

// Custom imports
import { IsJsonString } from "../../utils/JsonHelper";
import MergeSchema from "../schemas";
import GraphqlRoot from "./GraphqlRoot";

const GraphqlHttp = () => {

    return graphqlHTTP((request: Request, response: Response) => {

            return {
                schema: MergeSchema,
                rootValue: GraphqlRoot(),
                context: {
                    req: request,
                    res: response
                },
                formatError: formatError
            }
        }
    )
};

const formatError = (error: GraphQLError) => {

    let message = IsJsonString(error.message) ? JSON.parse(error.message) : error.message;

    return {
        error: message,
        path: error.path
    }
};

export default GraphqlHttp;
