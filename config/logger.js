const winston = require('winston');
require("winston-mongodb")
const dotenv = require("dotenv");
dotenv.config()

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error', format:winston.format.combine(winston.format.timestamp(),winston.format.json()) }),
    new winston.transports.MongoDB({ filename: 'error.log', level: 'error',db:process.env.CONECT,options:{useUnifiedTopology: true}  }),

    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});
module.exports=logger