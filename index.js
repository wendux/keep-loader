/**
 * Created by du on 2017/8/12.
 */
var keep=require('./helper')
var loaderUtils = require("loader-utils");

module.exports = function(source) {
    var options=loaderUtils.getOptions(this)||{}
    return keep(source,options.keep||"");
};

