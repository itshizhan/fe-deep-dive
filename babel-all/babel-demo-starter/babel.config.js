const presets = [
  [
    "@babel/preset-env"
  ],
];
const plugins = [
  ['./plugin_one.js',{
    op1: true
  }]
]
module.exports = { 
  presets,
  plugins
 };