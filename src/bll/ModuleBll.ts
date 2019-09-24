import Axios from "axios";

export default class ModuleBll {

    public async getModules(): Promise<any> {
        let query = ` query {
              modules {
                  id,
                  url,
                  name
              }
            }`;

        return await Axios.get('http://localhost:3300/graphql', {params: {query}})
    };
};
