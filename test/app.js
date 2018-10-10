const assert = require("assert");

const simpleParsed = "<p>\n  I like simple.\n</p>\n";
const simple = require("./simple.ejs");
assert.equal(simple, simpleParsed);

const minified = require("./minified.ejs");
assert.equal(minified, "<p> I like minified. </p> ");

const es6export = require("./es6export.ejs");
assert.deepEqual(es6export, { default: "<p> I like es6. </p> " });

console.log("All tests passed!");
