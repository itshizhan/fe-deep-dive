"use strict";

var parser = _interopRequireWildcard(require("@babel/parser"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// import traverse from "@babel/traverse";
// const square = n => n * n;
// function abc(){
//   console.log("cba");
// }
// const code = `function square(n) {
//   return n * n;
// }`;
var codeEs6 = "\n  const b = 1;\n  export const a = {\n    type:\"Function\"\n  }\n  var dropdown =\n  <Dropdown>\n    A dropdown list\n    <Menu>\n      <MenuItem>Do Something</MenuItem>\n      <MenuItem>Do Something Fun!</MenuItem>\n      <MenuItem>Do Something Else</MenuItem>\n    </Menu>\n  </Dropdown>;\n\n  render(dropdown);\n";
var ast = parser.parse(codeEs6, {
  sourceType: 'module',
  plugins: ['jsx']
});
console.log(ast); // function traverse(parent, opts, scope, state, parentPath)
// if (parent.type !== "Program" && parent.type !== "File") { throw }
// traverse(ast,{
//   enter(path) {
//     if (path.isIdentifier({ name: "n" })) {
//       path.node.name = "x";
//     }
//   }
// })