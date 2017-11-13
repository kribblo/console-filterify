# console-filterify

[Browserify transform](https://github.com/browserify/browserify-handbook#transforms) that wraps all `console.*` calls in a filtering function that can be changed live directly in the browser.

If `console.filterify` is defined, it will be called with the console method (such as `log`, `warn`, `error`, `dir`) as first argument and the original console arguments as an array as the second argument.

This function is assumed to return either an array to log - possibly with manipulated values - or undefined to ignore logging this line at all.

If `console.filterify` does not exist, the wrapper logs as usual.

## Purpose

The usual approach to filtering or coloring or decorating loggers are to have a wrapping library, which usually loses important information such as line and file name. This is not necessarily that much better, but offers a way to keep that kind of information as well as filter and/or manipulate the logging data dynamically on the way. 

## Examples

```javascript
/**
* @param {string} level The log level such as log, warn error etc
* @param {array} args   Array of original arguments
* @return  {array} of arguments, possibly modified, or undefined to silence this log line 
*/
console.filterify = function(level, args) {
    if(['warn', 'error'].indexOf(level) > -1) {
        return args;
    }
    return undefined;
}
```

```javascript
// Add red CSS color to error log
console.filterify = function(level, args) {
    if(level === 'error' && args.length > 0) {
        args[0] = '%c' + args[0];
        args.splice(1, 0, 'color:red');
    }
    return args;    
}
```

