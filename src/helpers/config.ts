import * as configReq from '../../config/config.json';
const env = process.env.NODE_ENV || 'development';
const config = configReq[env];
const { todosDB, secretKey, username, password, port } = config;
export { env, todosDB, secretKey, username, password, port };
