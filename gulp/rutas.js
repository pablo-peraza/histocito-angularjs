"use strict";

module.exports = {
  less: {
    principal: "./src/less/main.less",
    watch: [ "src/less/*.less", "src/less/*.css", "src/app/*.less",
      "src/app/**/*.less", "src/app/**/less/*.less", "src/less/comps/*.less"
    ]
  },
  scripts: {
    base: "src/app/",
    principal: "./src/app/index.js",
    watch: [ "src/app/*.js", "src/app/**/*.js", "src/app/**/**/*.js" ]
  },
  plantillas: {
    watch: [ "src/app/*.html", "src/app/**/*.html",
      "src/app/**/htmls/*.html", "src/app/**/vistas/*.html"
    ]
  },
  recursos: {
    principal: [ "!src/index-mantenimiento.html", "!src/index.html", "src/recursos",
    "src/recursos/*", "src/recursos/**/*" ]
  },
  config: {
    principal: "./recursos/config.js"
  },
  tests: {
    base: [ "src/app/**/**/tests/*.test.js" ]
  }
};
