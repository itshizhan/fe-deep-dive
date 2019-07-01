module.exports = {
  plugins: [
    [
      require('../lib/index'),
      {
        addFilename: true,
        addCodeLine: true,
        addCodeColumn: false,
        addContext: true,
        customContent: 'hello world',
        methods: ['info', 'log'],
        exclude: ['cool.js']
      }
    ]
  ]
};
