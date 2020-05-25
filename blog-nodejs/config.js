const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
    throw new Error(' Couldn\'t find .env file!');
}

module.exports = {
    port: parseInt(process.env.PORT, 10),
    api: {
        prefix: '/',
    },
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    get dbUri() { return `mongodb+srv://${this.dbUser}:${this.dbPassword}@${this.dbName}-b2bls.mongodb.net/test?retryWrites=true&w=majority`; }
};
