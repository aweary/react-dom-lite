const fs = require('fs');
const babel = require('babel-core');

module.exports = {
  process(src) {
    return babel.transform(
      src,
      JSON.parse(fs.readFileSync('./examples/.babelrc')),
    );
  },
};
