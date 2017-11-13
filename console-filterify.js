const transformTools = require('browserify-transform-tools');

const WRAPPER =
    (
        '(function(l) {' +
        '    var a = [].slice.call(arguments, 1);' +
        '    if(console.filterify) {' +
        '        a = console.filterify(l, a)' +
        '    }' +
        '    if(a !== undefined) {' +
        '        console[l].apply(console, a)' +
        '    }' +
        '}($1, $2));'
    ).replace(/ {4}/g, '');

const options = {jsFilesOnly: true};

const consoleFilterify = transformTools.makeFalafelTransform('console-filterify', options, transform);

function transform(node, transformOptions, done) {
    if(node.type === 'CallExpression') {
        const callee = node.callee;
        if(callee.type === 'MemberExpression') {
            const object = callee.object;
            if(object.type === 'Identifier' && object.name === 'console') {
                const source = node.source();
                node.update(source.replace(/console\.(\w+)\s*\((.+)\)/, WRAPPER));
            }
        }
    }
    done();
}

module.exports = consoleFilterify;
