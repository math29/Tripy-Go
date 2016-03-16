'use strict'
/**
 * Check if object is of type number
 *
 * @param Object: object to Check
 *
 * @return true if object is number, false otherwise
 */
exports.isNumber = function(object){
  if(typeof object == "number"){
    return true;
  }
  return false;
}
