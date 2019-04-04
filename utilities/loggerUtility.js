const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }


module.exports = {
    /* logging the errors */
    logError: ( error ) =>{
      logger.log('error', error);
    },
    logWarning: ( error ) =>{
        logger.log('warn', error);
    },
    logInfo: ( error ) =>{
        logger.log('info', error);
    },
    logMessage: ( error, level ) => {
        logger.log(level, error);
    },
    /* querying the errors */
    queryErrors: ( from = new Date, until = new Date) =>{
      return new Promise(( resolve, reject ) =>{
        logger.query({...errQueryOptions,  from, until }, function (err, results) {
          ( err ? reject(err) : resolve(results) );
        });
      })
    }
  }

