const fs = require('fs');
const path = require('path');
const test = require('tape');
const transformTools = require('browserify-transform-tools');

const consoleFilterify = require('../console-filterify');

const fixture = path.resolve(__dirname, 'fixture.js');
const content = fs.readFileSync(fixture, 'utf8');

test('Transforms has happened', t => {
    transformTools.runTransform(consoleFilterify, fixture, {content: content},
        function(err, transformed) {
            if(err) {
                throw err;
            }

            t.equals(6, countInstances(transformed, 'function'));
            t.end();
        }
    );
});

function countInstances(text, search) {
    let index = text.indexOf(search);
    let count = 0;

    while(index > -1) {
        count++;
        index = text.indexOf(search, index + search.length);
    }

    return count;
}