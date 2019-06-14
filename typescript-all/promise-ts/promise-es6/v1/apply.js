console.log("call and apply");

function A(a,b,c,d){
  let p = this;
  console.log(p);
  console.log(arguments);
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
}
let p = {
  a:1
}
A.apply(p,[1,2,[1,2]]);