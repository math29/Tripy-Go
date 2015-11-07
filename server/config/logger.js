var winston = require('winston');
winston.emitErrs = true;


var logger = new winston.Logger({
    transports: [
    new winston.transports.Console({
            level: 'silly',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })

    ],
    exitOnError: false
});

module.exports = logger;

module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

var logger_info_old = logger.info;
var logger_error_old = logger.error;
var logger_warn_old = logger.warn;
var logger_debug_old = logger.debug;

  logger.info = function(msg) {
    var fileAndLine = traceCaller(1);
    arguments[0] = fileAndLine+": "+arguments[0];
    return logger_info_old.apply(this, arguments);
  }

  logger.error = function(msg) {
    var fileAndLine = traceCaller(1);
    arguments[0] = fileAndLine+": "+arguments[0];
    return logger_error_old.apply(this, arguments);
  }

  logger.warn = function(msg) {
    var fileAndLine = traceCaller(1);
    arguments[0] = fileAndLine+": "+arguments[0];
    return logger_warn_old.apply(this, arguments);
  }

  logger.debug = function(msg) {
    var fileAndLine = traceCaller(1);
    arguments[0] = fileAndLine+": "+arguments[0];
    return logger_debug_old.apply(this, arguments);
  }

  /**
  * examines the call stack and returns a string indicating
  * the file and line number of the n'th previous ancestor call.
  * this works in chrome, and should work in nodejs as well.
  *
  * @param n : int (default: n=1) - the number of calls to trace up the
  *   stack from the current call.  `n=0` gives you your current file/line.
  *  `n=1` gives the file/line that called you.
  */
  function traceCaller(n) {
    if( isNaN(n) || n<0) n=1;
    n+=1;
    var s = (new Error()).stack
      , a=s.indexOf('\n',5);
    while(n--) {
      a=s.indexOf('\n',a+1);
      if( a<0 ) { a=s.lastIndexOf('\n',s.length); break;}
    }
    b=s.indexOf('\n',a+1); if( b<0 ) b=s.length;
    a=Math.max(s.lastIndexOf(' ',b), s.lastIndexOf('/',b));
    b=s.lastIndexOf(':',b);
    s=s.substring(a+1,b);
    return s;
  }
