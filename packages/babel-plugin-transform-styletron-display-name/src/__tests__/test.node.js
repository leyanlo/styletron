/* global require __dirname */

const fs = require("fs");
const path = require("path");

const babel = require("@babel/core");
const test = require("tape");

const plugin = require("../");

const FIXTURES_PATH = path.resolve(__dirname, "./fixtures");

function readFixtureFile(fixture, name) {
  return fs.readFileSync(path.resolve(FIXTURES_PATH, fixture, name), "utf8");
}

function compare(fixture) {
  const input = readFixtureFile(fixture, "input");
  const output = readFixtureFile(fixture, "output");
  const {code} = babel.transformSync(input, {
    plugins: [plugin],
    retainLines: true,
  });
  test(fixture, t => {
    t.equal(code.trim(), output.trim());
    t.end();
  });
}

const fixtures = fs.readdirSync(FIXTURES_PATH);
fixtures.forEach(compare);
