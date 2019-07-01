const defaultOptions = {
  addFilename: false,
  addCodeLine: true,
  addCodeColumn: true,
  addContext: false,
  customContent: '',
  methods: ['debug', 'error', 'exception', 'info', 'log', 'warn'],
  exclude: ['node_modules']
};

export default function computeOptions(userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}
