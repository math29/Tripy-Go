// requiert Winston pour logger
var winston = require('winston');

// On emet les erreurs
winston.emitErrs = true;

// instanciation du logger
var logger = new winston.Logger({
    // modes de transports du logger
    transports: [
    // log dans la console tous les niveaux
    new winston.transports.Console({
            level: 'silly',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        /* enregistrement des logs dans un fichier, uniquement à partir du niveau info.
         * logs dans 5 fichiers de 5 MB maximum au format JSON
         */
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
    write: function(message){
        logger.info(message);
    }
};

function replaceAllQuotes(message){
  var find = '"';
  var re = new RegExp(find,'g');
  if(message instanceof Object || message instanceof Array){
    return message;
  }
  return message.replace(re, "'");
}

var logger_info_old = logger.info;
var logger_error_old = logger.error;
var logger_warn_old = logger.warn;
var logger_debug_old = logger.debug;

  logger.info = function(msg) {
    var fileAndLine = traceCaller(1);
    var newArgs = arguments
    newArgs[0] = fileAndLine+": "+replaceAllQuotes(arguments[0]);
    return logger_info_old.apply(this, newArgs);
  };

  logger.error = function(msg) {
    var fileAndLine = traceCaller(1);
    var newArgs = arguments
    newArgs[0] = fileAndLine+": "+replaceAllQuotes(arguments[0]);
    return logger_error_old.apply(this, newArgs);
  };

  logger.warn = function(msg) {
    var fileAndLine = traceCaller(1);
    var newArgs = arguments
    newArgs[0] = fileAndLine+": "+replaceAllQuotes(arguments[0]);
    return logger_warn_old.apply(this, newArgs);
  };

  logger.debug = function(msg) {
    var fileAndLine = traceCaller(1);
    var newArgs = arguments
    newArgs[0] = fileAndLine+": "+replaceAllQuotes(arguments[0]);
    return logger_debug_old.apply(this, newArgs);
  };

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
    var s = (new Error()).stack;
    var a = s.indexOf('\n',5);
    while(n--) {
      a=s.indexOf('\n',a+1);
      if( a<0 ) { a=s.lastIndexOf('\n',s.length); break;}
    }
    var b=s.indexOf('\n',a+1); if( b<0 ) b=s.length;
    a=Math.max(s.lastIndexOf(' ',b), s.lastIndexOf('/',b));
    b=s.lastIndexOf(':',b);
    s=s.substring(a+1,b);
    return s;
  }
