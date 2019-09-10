import app from "./app";
import {coreSettings} from "./config/settings";
let PORT: string | null = null;

async function runServer() {

    PORT = await coreSettings.getAppPort();

    app.listen(PORT);
}

runServer().then(() => {

    console.log('🚀 Server listening on port ' + PORT);
})