/**
 * Created by du on 2017/8/12.
 */
var esprima = require('esprima')
var fs = require("fs")

function isKeep(node) {
    return (node.type === 'CallExpression')
        && (node.callee.name === 'KEEP')
        && (node.callee.type === 'Identifier')
}
function keep(source,env) {
    env=env.trim()
    if(!env){
        console.error("keep-loader error: env required!")
        return;
    }
    const entries = [];
    let haveKeep=false;
    esprima.parseModule(source, {}, function (node, meta) {
        if (isKeep(node)) {
            haveKeep=true;
            var arg=node.arguments[0].value.trim();
            var predicate=arg.replace(/([_a-zA-Z][_a-zA-Z0-9\-]*)/g,"=='$1'").replace(/([!=]=)/g,`'${env}'$1`)
            if(!eval(predicate)){
                entries.push({
                    start: meta.start.offset,
                    end: meta.end.offset
                });
            }
        }
    });
    entries.sort((a, b) => {
            return b.end - a.end
        }
    ).forEach(n => {
        source = source.slice(0, n.start) + source.slice(n.end);
    });
    return (haveKeep?"function KEEP(_,cb){cb();}\n":"") + source;
}

module.exports = keep;

