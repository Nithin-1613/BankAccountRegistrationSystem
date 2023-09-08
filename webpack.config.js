const path = require('path');

module.exports = {
  // ... other Webpack configuration ...

  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/")
    },
  },
};
