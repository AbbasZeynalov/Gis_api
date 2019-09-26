import Axios from "axios";

export default class ModuleBll {

    public async getModules(pagination: any): Promise<any> {
        let query = ` query {
              modules(offset: ${pagination.offset}, limit: ${pagination.limit}) {
                items {
                    name, 
                    url,
                    version {
                        version
                    }
                },
                totalCount
              }
            }`;

        return await Axios.get('http://localhost:3300/graphql', {params: {query}})
    };
};
