import { config } from 'dotenv';
import AuthHelper from "../helpers/auth.helper";

config();

before(async function() {
    let authHelper = new AuthHelper();
    await authHelper.get(process.env.LOGIN, process.env.Password);
    process.env.TOKEN = authHelper.response.body.token;
});