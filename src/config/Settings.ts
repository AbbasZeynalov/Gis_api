import Logger from "../utils/logger";
import CoreSettings from "../core-settings/CoreSettings";

let logger = new Logger();

export const coreSettings =  new CoreSettings(logger);