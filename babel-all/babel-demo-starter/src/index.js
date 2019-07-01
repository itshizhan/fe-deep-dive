import * as parser from "@babel/parser";
// import traverse from "@babel/traverse";

// const square = n => n * n;

// function abc(){
//   console.log("cba");
// }

// const code = `function square(n) {
//   return n * n;
// }`;

const codeEs6 = `
  const b = 1;
  export const a = {
    type:"Function"
  }
  var dropdown =
  <Dropdown>
    A dropdown list
    <Menu>
      <MenuItem>Do Something</MenuItem>
      <MenuItem>Do Something Fun!</MenuItem>
      <MenuItem>Do Something Else</MenuItem>
    </Menu>
  </Dropdown>;

  render(dropdown);
`

let ast = parser.parse(codeEs6,{
  sourceType:'module',
  plugins:[
    'jsx'
  ]
});
console.log(ast);


// function traverse(parent, opts, scope, state, parentPath)
// if (parent.type !== "Program" && parent.type !== "File") { throw }
// traverse(ast,{
//   enter(path) {
//     if (path.isIdentifier({ name: "n" })) {
//       path.node.name = "x";
//     }
//   }
// })


