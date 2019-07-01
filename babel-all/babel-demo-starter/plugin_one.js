module.exports = function(babel) {
  console.log(babel);
  return {
    visitor: {
      Identifier(path,state) {
        //console.log(state.opts);
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        //console.log(name);
        if(name==="abcd"){
          path.node.name = name
          .split("")
          .reverse()
          .join("");
        }
       
      },
    },
  };
}