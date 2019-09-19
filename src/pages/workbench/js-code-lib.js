const jsCodeLib = [];

// Java
jsCodeLib.push(
  `
  var Java = {};
  Java.type = function () {
    return {};
  };
  `
);

// console
jsCodeLib.push(
  `
  var console = {};
  console.debug = function () { };
  console.info = function () { };
  console.log = function () { };
  console.warn = function () { };
  console.error = function () { };
  `
);

// 代码模板
jsCodeLib.push(
  `

  `
);

export default jsCodeLib.join("\n\n");
