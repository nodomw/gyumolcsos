export default {
  server: {
    port: 3000,
  },
  db: {
    host: "127.0.0.1",
    user: "root",
    password: "newnew",
    database: "fruit",
    connectionTimeout: 15,
    connectionLimit: 10,
    queueLimit: 15,
  },
  queryoptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
};
